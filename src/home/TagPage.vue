<template>
    <div>
        <div class="row">
            <div class="col-12 col-md-12 col-lg-3 card-body row no-gutters">
                <div class="col">
                    <select v-model="selected">
                        <option disabled value="tags">Selecione a tag</option>
                        <option value="assunto">Assunto</option>
                        <option value="dominioDados">Domínio Dados</option>
                        <option value="dominioNegocio">Domínio Negócio</option>
                        <option value="grupoDominioDados">Grupo Domínio Dados</option>
                        <option value="subdominioDados">Subdomínio Dados</option>
                    </select>
                </div>
                <div class="col-auto">
                   &nbsp;&nbsp;<a href="#" @click="tag();"><img src="/src/_img/lupa.png" width="25px" height="25px" alt="Buscar"></a>
                </div>
                <div class="col">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/home">Voltar</router-link>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-12 col-lg-3 card-body row no-gutters">
          
                <div class="col-auto">
                    <b-table   
                        ref="selectableTable"
                        selectable
                        :select-mode="selectMode" 
                        striped hover 
                        @row-selected="onRowSelected"
                        :items="listaTag" 
                        :fields="campos">
                    </b-table>
                    
                </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'tag',
    data() {
        return {
            selected: 'tags',
            listaTag: [],
            campos: [ 'Campo Tag'],
            selectMode: 'single',
            rowSelected:false,
        };
    },
    computed: {

    },
    methods:{
 
        onRowSelected(items) {
            this.selected = items
        },
        recuperaEndPoint(){

            if(this.selected == 'assunto'){
                return '/tag/findByAssunto';
            }else if(this.selected == 'dominioDados'){
                return '/tag/findByDominioDados';
            }else if(this.selected == 'dominioNegocio'){
                return '/tag/findByDominioNegocio';
            }else if(this.selected == 'grupoDominioDados'){   
                return '/tag/findByGrupoDominioDados';  
            }else if(this.selected == 'subdominioDados'){   
                return '/tag/findBySubDominioDados';
            }
            return null;

        },
        tag(){

            let endPoint = this.recuperaEndPoint()

            this.$store.state.alert = null;
            this.listaTag = []

            let self = this

            if( endPoint != null) {   

                this.$http.post(
                    endPoint
                ).then(function(response) {
                    console.log("resultado " + response.data.codigo)
                    if( response.data.codigo === 0){
                            self.listaTag = response.data.listaCatalogoDado;  
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
                    message : 'Favor selecionar uma tag',
                    type : 'alert-info'
                }
                self.$store.state.alert = alerta;
            }
        }
    }
    
};
</script>

<style>

</style>