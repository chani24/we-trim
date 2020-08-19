<template>
    <div>
  <b-jumbotron>
    <template v-slot:header> <span class ="capture-green">Shorter URLs, easily shareable.</span></template>

    <template  v-slot:lead>
        <div >
          Optimize your brand's online presence by trimming urls and share with a wider audience.
        </div>
      
    </template>
    <br>

  <div>
      <b-form @submit="trimUrl">
          <b-row>
              <b-col m="10">
      <b-form-input id="input-1" size="lg" placeholder="Enter URL" v-model="url" required></b-form-input>
    </b-col> 

    <b-col m="2">
        <b-button variant="success" size="lg" type="submit"><b-spinner variant="success" label="Spinning" v-if="isLoading"></b-spinner><span v-if="!isLoading">Trim</span></b-button>
    </b-col>
          </b-row>
      </b-form>
  </div>
  <br>
  <div class="result" v-if="isReady">
    <b-row>
        <b-col m="10">
             <b-form-input  id="input-2" size="lg" readonly v-model="parsedUrl"></b-form-input>
        </b-col> 

        <b-col m="2">
            <b-button variant="success" size="lg" type="button" v-clipboard:copy="parsedUrl" v-clipboard:success="onCopy"><b-spinner variant="success" label="Spinning" v-if="isLoading"></b-spinner><span v-if="!isLoading && !copied">Copy</span><span v-if="copied">Copied !</span></b-button>
        </b-col>
    </b-row>
  </div>
    <br>
    <div id="links">
        <span class="list-span">My links</span>
        <b-list-group>
  <b-list-group-item v-for="link in links" :key="link" >{{ link }}</b-list-group-item>
</b-list-group>

    </div>
  </b-jumbotron>
 
</div>

</template>


<script>
export default {
    data(){
        return{
            url: '',
            isLoading: false,
            isReady: false,
            parsedUrl: '',
            error: false,
            errorMessage: '',
            copied: '',
            links: []
        }
    },
    methods: {
        trimUrl(){
            this.isLoading = true;
            this.isReady = false;
            this.$http.post('https://rel.ink/api/links/', {"url": this.url})
            .then(res=> {
                this.isLoading = false;
                this.parsedUrl = `https://rel.ink/${res.body.hashid}`;
                this.isReady = true;
                this.links.push(this.parsedUrl);
                localStorage.setItem("links", JSON.stringify(this.links));
            })
            .catch(err => {
                this.errorMessage = err;
                this.error = true;
                console.log(err)
            })

        },
        onCopy(){
            this.copied = true;
            setTimeout(()=>{
                this.copied = false;
            }, 3000)
        },
        getLinks(){       
            if (localStorage.getItem('links')) this.links = JSON.parse(localStorage.getItem('links'));
        }
    },
    mounted() {
        this.getLinks();
},

}
</script>

<style scoped>
.jumbotron {
    background-color: #ffffff;
    border-radius: 0;
    text-align: left;
}
.capture-green{
        color: #63c069 !important;
        font-weight: 900;
        font-size: 0.9em;
}
.btn-success{
    color: #333333;
    background-color: #ffffff;
    border-color: #63c069;
    border-width: 2px;
}

.btn-success:hover{
    color: #333333;
    background-color: rgb(255, 255, 255);
    border-color: rgb(255, 204, 0);
}
.form-control:disabled, .form-control[readonly] {
    background-color: #ffffff;
    opacity: 1;
}
.list-span{
    font-weight: 800;
    font-size: 2rem;
    color: #333333de;
}
</style>