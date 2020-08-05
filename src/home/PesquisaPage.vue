<template>
    <div>
        <div class="row">   
            <div class="col-11 col-md-11 col-lg-6 card-body row no-gutters">
                <div class="col">
                    <input class="form-control form-control-lg form-control-borderless"
                        v-model="stringpesquisa" 
                        name="stringpesquisa" 
                        type="search" 
                        v-on:keyup.enter="buscar"
                        v-on:keyup="limpandoPesquisa"
                        placeholder="O que procura?">
                </div>
                <div class="col-auto">
                    &nbsp;&nbsp;<a href="#" @click="buscar();"><img src="/src/_img/lupa.png"  width="38px" height="38px"  alt="Buscar"></a>
                </div>
                <div class="col-auto">
                    <br>
                    <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" v-on:click="limpandoPesquisa" name="options" value="optTudo" id="optTudo" autocomplete="off"> Tudo
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" v-on:click="limpandoPesquisa" name="options" value="optDominioNegocio" id="optDominioNegocio" autocomplete="off"> Domínio Negócio
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" v-on:click="limpandoPesquisa" name="options" value="optDominioDados" id="optDominioDados" autocomplete="off"> Domínio Dados
                    </label>
                     <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" v-on:click="limpandoPesquisa" name="options" value="optSubDominioDados" id="optSubDominioDados" autocomplete="off"> Sub Domínio Dados
                    </label>
                     <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" v-on:click="limpandoPesquisa" name="options" value="optAssunto" id="optAssunto" autocomplete="off"> Assunto
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" v-model="optEndPoint" v-on:click="limpandoPesquisa" name="options" value="optGrupoDominioDados" id="optGrupoDominioDados" autocomplete="off"> Grupo Domínio Dados
                    </label>
                    <label>   
                        <radial-menu
                            v-on:click="limpandoPesquisa"
                            style="background-color: white; width: 0%;"
                            :itemSize="45"
                            :radius="60"
                            :angle-restriction="180">
                                <radial-menu-item 
                                    v-for="(item, index) in items"
                                    :key="index" 
                                    style="background-color: #dc3545!important" 
                                    @click="() => handleClick(item)">
                                    <span>{{item}}</span>
                                </radial-menu-item>
                        </radial-menu>
                    </label> 
                </div>
            </div>
        </div>
        <div class="row">
             <div v-if="listaCatalogoDadosTabela.length > 0" class="col-md-12"> 
                 <b-table 
                    ref="tabela_entity"
                    small
                    striped hover 
                    @row-clicked="abrirModal" 
                    :items="listaCatalogoDadosTabela" 
                    :fields="camposTabelas">

                    <template v-slot:cell(Definição)="data">
                        <small> {{ data.item['Definição'] }} </small>
                    </template>
                    <template v-slot:cell(Assunto)="data">
                        <small> {{ data.item['Assunto'] }}</small>
                    </template>
                    
                </b-table>
             </div>
             <div class="col-md-12">
                 <p v-if="nadaEncontrado" align='center'><small>{{nadaEncontrado}} <b>{{stringpesquisa}}</b></small></p>
             </div>    
        </div>
        <div>
            <b-modal ref="model_tag_tabela"  scrollable title="Tags"  ok-only no-stacking>

                <p><b>Valores do campo :</b> <small>{{nomeTag}}</small></p> 
                <b-table   
                    ref="tabela_tag"
                    small
                    striped hover
                    @row-clicked="selecionaTag" 
                    :items="listaTag" 
                    :fields="campos">
                </b-table>    
            
            </b-modal>    
        </div>    
        <div>
            <b-modal ref="model_tabela" size="tamanho" scrollable title="Dados da Tabela"  ok-only no-stacking>
                
                <b>Nome da tabela:</b> <small>{{tabela['Nome Tabela']}}</small><br>
                <b>Assunto:</b> <small>{{tabela['Assunto']}}</small><br>
                <b>Domínio Negócio:</b> <small>{{tabela['Domínio Negócio']}}</small> <b>Domínio Dados:</b> <small>{{tabela['Domínio Dados']}}</small> <b>Sub Domínio Dados:</b> <small>{{tabela['Sub Domínio Dados']}}</small><br>

                <b>Definição da tabela:</b> <small>{{tabela['Definição']}}</small><br><br> 
                
                <b-table   
                    ref="tabela_atributo"
                    small
                    striped hover
                    :items="listaCatalogoDadosAtributoTabela" 
                    :fields="camposAtributoTabelas">
                </b-table>

            </b-modal>
        </div>
        <div>
            <b-modal ref="model_mapa" size="tamanho" scrollable title="Mapa"  ok-only no-stacking>
                
                <mindmap
                    :nodes="nodes"
                    :connections="connections"
                    :editable="false"
                />

            </b-modal>
        </div>    

    </div>
</template>

<script>
import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'

export default {
    name: 'pesquisa',
    components: {
        RadialMenu,
        RadialMenuItem
    },
    data() {
      return {
        listaCatalogoDadosTabela: [],
        listaCatalogoDadosAtributoTabela:[],
        tabela: {},
        camposTabelas: ['Nome Tabela', 'Definição', 'Assunto' ,'Domínio Negócio','Domínio Dados', 'Sub Domínio Dados'],
        camposAtributoTabelas: [ 'Nome Atributo', 'Definição', 'Assunto' ,'Domínio Negócio','Domínio Dados', 'Sub Domínio Dados'],
        stringpesquisa:'',
        optEndPoint:null,
        nadaEncontrado: null,
        selected: 'tags',
        listaTag: [],
        campos: [ 'Campo Tag'],
        nomeTag: '',
        nodes: [],
        connections: [],
        items: ['Mapa']
      };
    },
    created(){
        this.$store.state.alert = null
        this.limpandoPesquisa()
        this.stringpesquisa = this.$store.state.str
        this.optEndPoint = this.$store.state.optEndPoint
     
        this.buscar();
    },
    computed: {

    },
    methods:{
        handleClick (item) {

            if(item === 'Mapa'){
                this.mapa()    
            }    
        },
        abrirTagModal() {
            this.$refs['model_tag_tabela'].show()
        },
        abrirMapaModal() {
            this.$refs['model_mapa'].show()
        },
        abrirModal(row) {
            this.buscarTabela(row['id'])
            this.buscarAtributosTabela(row['Nome Tabela'] )
            this.$refs['model_tabela'].show()
        },
        selecionaTag(row){
            this.stringpesquisa = row['Campo Tag'] 
            this.$refs['model_tag_tabela'].hide()
            this.buscar()
        },
        limpandoPesquisa(){
            this.nadaEncontrado = null;
            this.$store.state.alert = null;
        },
        recuperaTagEndPoint(){

            if(this.optEndPoint == 'optDominioNegocio'){
                return '/tag/findByDominioNegocio';
            }else if(this.optEndPoint == 'optDominioDados'){
                return '/tag/findByDominioDados';
            }else if(this.optEndPoint == 'optSubDominioDados'){
                return '/tag/findBySubDominioDados';
            }else if(this.optEndPoint == 'optAssunto'){   
                return '/tag/findByAssunto';
            }else if(this.optEndPoint == 'optGrupoDominioDados'){   
                return '/tag/findByGrupoDominioDados';   
            }else{
                return null;
            }

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
            }else if(this.optEndPoint == 'optGrupoDominioDados'){   
                return '/catalogoDados/findByGrupoDominioDados';  
            }else{
                this.optEndPoint = 'optTudo'
                return '/catalogoDados/find';
            }

        },
        buscarTabela(id){

            this.$store.state.alert = null;
            this.tabela = {}

            let self = this
            this.$http.post('/catalogoDadosTabela/findByTabela',
                {"id": id}   
            ).then(function(response) {
                if( response.data.codigo === 0){
                    self.tabela = response.data.catalogoDado;  
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

        },
        buscarAtributosTabela(nomeTabela){

            this.$store.state.alert = null;
            this.listaCatalogoDadosAtributoTabela = []    

            let self = this
            this.$http.post('/catalogoDadosAtributoTabela/findByNameTabela',
                {"nomeTabela": nomeTabela }    
            ).then(function(response) {
                if( response.data.codigo === 0){
                    self.listaCatalogoDadosAtributoTabela = response.data.listaCatalogoDado; 
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

        },
        buscar(){

            let endPoint = this.recuperaEndPoint()

            this.$store.state.alert = null;
            this.listaCatalogoDadosTabela = []
            this.limpandoPesquisa()

            if( this.stringpesquisa != undefined && this.stringpesquisa.trim().length > 0 ){    

                let strPesquisa = {
                    "stringPesquisa": this.stringpesquisa,
                    "type":"Entity"
                }

                let self = this
                this.$http.post(endPoint,
                    strPesquisa
                ).then(function(response) {

                    if( response.data.codigo === 0){
                           self.listaCatalogoDadosTabela = response.data.listaCatalogoDado;  
                           if( self.listaCatalogoDadosTabela.length === 0 ){
                               self.nadaEncontrado = 'Lamentamos, mas nenhum informação foi encontrado para a sua pesquisa,'    
                           }
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
                this.tag();
            }
        },
        tag(){

            let endPoint = this.recuperaTagEndPoint()

            this.$store.state.alert = null;
            this.listaTag = []
            this.nomeTag = null


            if( endPoint != null) { 

                let self = this    

                this.$http.post(
                    endPoint
                ).then(function(response) {
                    if( response.data.codigo === 0){
                        self.listaTag = response.data.listaCatalogoDado;  
                        self.nomeTag = response.data.nomeTag;
                        self.abrirTagModal();
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
                    message : 'Se não tiver um string de pesquisa, por favor selecione uma tag Domínio Negócio, Domínio Dados, Sub Domínio Dados, Assunto ou Grupo Domínio Dados',
                    type : 'alert-info'
                }
                this.$store.state.alert = alerta;
            }
        },
        mapa(){

            this.nodes = []
            this.connections = []   

            if( this.stringpesquisa != undefined && this.stringpesquisa.trim().length > 0 ){   

                let self = this    

                let strPesquisa = {
                    "stringPesquisa": this.stringpesquisa
                }    

                this.$http.post('/mapa/find',strPesquisa
                ).then(function(response) {
                    if( response.data.codigo === 0){
                        self.nodes = response.data.nodes;  
                        self.connections = response.data.conectados;
                        self.abrirMapaModal();
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
                    message : 'Por favor, dígite uma string de pesquisa para essa função',
                    type : 'alert-info'
                }
                this.$store.state.alert = alerta;
            }
        }
    }
    
};
</script>

<style>

.modal .modal-tamanho {
  max-width: 99%;
  width: 99%;
}

.form-control-borderless {
    border: none;
}

.form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
    border: none;
    outline: none;
    box-shadow: none;
}

</style>
