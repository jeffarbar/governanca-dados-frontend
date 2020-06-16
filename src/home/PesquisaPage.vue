<template>
    <div>
        <div class="row">
            <div class="col-12 col-md-12 col-lg-3 card-body row no-gutters">
                <div class="col">
                    <input class="form-control form-control-lg form-control-borderless"
                        v-model="stringpesquisa" 
                        name="stringpesquisa" 
                        type="search" 
                        v-on:keyup.enter="buscar"
                        placeholder="O que procura?">
                </div>
                <div class="col-auto">
                    &nbsp;&nbsp;<a href="#" @click="buscar();"><img src="/src/_img/lupa.png" alt="Buscar"></a>
                </div>
                <div class="col-auto">
                    <br>
                    <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" name="options" value="optTudo" id="optTudo" autocomplete="off"> Tudo
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" name="options" value="optDominioNegocio" id="optDominioNegocio" autocomplete="off"> Domínio Negócio
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" name="options" value="optDominioDados" id="optDominioDados" autocomplete="off"> Domínio Dados
                    </label>
                     <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" name="options" value="optSubDominioDados" id="optSubDominioDados" autocomplete="off"> Sub Domínio Dados
                    </label>
                     <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" name="options" value="optAssunto" id="optAssunto" autocomplete="off"> Assunto
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
             <div class="col-md-12">
                 <b-table   
                    ref="selectableTable"
                    selectable
                    :select-mode="selectMode" 
                    striped hover 
                    @row-selected="onRowSelected"
                    :items="listaCatalogoDados" 
                    :fields="campos">
                </b-table>
                   
             </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pesquisa',
    data() {
      return {
        listaCatalogoDados: [],
        campos: [ 'Domínio Negócio', 'Definição', 'Assunto' ,'Nome','Domínio Dados', 'Sub Domínio Dados'],
        selectMode: 'single',
        selected: [],
        rowSelected:false,
        stringpesquisa:'',
        optEndPoint:null
      };
    },
    created(){
        this.stringpesquisa = this.$store.state.str
        this.optEndPoint = this.$store.state.optEndPoint
        this.buscar()
    },
    computed: {

    },
    methods:{
        onRowSelected(items) {
            this.selected = items
        },

        recuperaEndPoint(){

            if(this.optEndPoint == 'optDominioNegocio'){
                return '/catalogoDados/findByDominioNegocio';
            }else if(this.optEndPoint == 'optDominioDados'){
                return '/catalogoDados/findByDominioDados';
            }else if(this.optEndPoint == 'optSubDominioDados'){
                return '/catalogoDados/findBySubDominioDados';
            }else if(this.optEndPoint == 'optAssunto'){   
                return '/catalogoDados/findByAssunto';  
            }else{
                return '/catalogoDados/find';
            }

        },
        buscar(){

            let endPoint = this.recuperaEndPoint()

            this.$store.state.alert = null;
            this.listaCatalogoDados = []

            if( this.stringpesquisa != undefined && this.stringpesquisa.length > 2 ){    

                let strPesquisa = {
                    "stringPesquisa": this.stringpesquisa
                }

                let self = this
                this.$http.post(endPoint,
                    strPesquisa
                ).then(function(response) {
                    console.log("resultado " + response.data.codigo)
                    if( response.data.codigo === 0){
                           self.listaCatalogoDados = response.data.listaCatalogoDado;  
                    }else{

                        let alerta = {
                            message : response.data.message,
                            type : 'alert-info'
                        }
                        self.$store.state.alert = alerta;
                    }
                   
                }).catch(e => {
                    
                    let alerta = {
                        message : 'Falha na solicitação',
                        type : 'alert-danger'
                    }
                    self.$store.state.alert = alerta;
                })
            }else{

                let alerta = {
                    message : 'Favor, usar mais de 2 caracteres de pesquisa',
                    type : 'alert-info'
                }
                this.$store.state.alert = alerta;
            }
        }
    }
    
};
</script>

<style>

  .form-control-borderless {
    border: none;
}

.form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
    border: none;
    outline: none;
    box-shadow: none;
}

</style>