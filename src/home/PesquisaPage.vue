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
                    <template v-if="rowSelected">
                        <span aria-hidden="true">&check;</span>
                        <span class="sr-only">Selected</span>
                    </template>
                    <template v-else>
                        <span aria-hidden="true">&nbsp;</span>
                        <span class="sr-only">Not selected</span>
                    </template>
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
        campos: ['Banco de Dados', 'Tabela', 'Domínio Negócio', 'Definição', 'Assunto' ,'Nome','Domínio Dados', 'Sub Domínio Dados'],
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

            if( this.stringpesquisa != undefined && this.stringpesquisa.length > 3 ){    

                this.listaCatalogoDados = []

                let strPesquisa = {
                    "stringPesquisa": this.stringpesquisa
                }

                let self = this
                this.$http.post(endPoint,
                    strPesquisa
                ).then(function(response) {
                    self.listaCatalogoDados = response.data;
                }).catch(e => {
                    
                    let alerta = {
                        message : 'Falha na solicitação',
                        type : 'alert-danger'
                    }
                    this.$store.state.alert = alerta;
                })
            }else{

                let alerta = {
                    message : 'Favor, usar mais de 3 caracteres de pesquisa',
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