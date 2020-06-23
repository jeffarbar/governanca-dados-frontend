<template>
    
    <div class="container">
        <div class="row" style="text-align:center">
            <div class="col-md-12">
                <br><br><br>
                <h1><p class="text-danger">Olá, em que posso ajudar?</p></h1>
            </div>
        </div>
        <div class="row" style="text-align:center">
             <div class="col-md-12">
                
                <div class="row justify-content-center">
                    <div class="col-12 col-md-12 col-lg-8">
                        <div class="card-body row no-gutters align-items-center">
                            <div class="col-auto">
                                <i class="fas fa-search h1 text-body"></i>
                            </div>
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
                            <div class="col-auto" style="text-align:center">
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
                                <label class="btn">
                                    <button class="btn btn-danger" v-on:click="tag">Tags</button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
      return {
        stringpesquisa:'',
        optEndPoint:'optTudo'
      };
    },
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
    },
    methods: {
        tag(){
            console.log('testes tag')
            this.$router.push('/tag') 
        },
        buscar() {
            if( this.stringpesquisa != undefined && this.stringpesquisa.length > 2 ){  
                this.$store.state.str = this.stringpesquisa;
                this.$store.state.optEndPoint = this.optEndPoint;
                this.$router.push('/pesquisa') 
            }else{
                let alerta = {
                    message : 'Favor, usar mais de 2 caracteres de pesquisa ',
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