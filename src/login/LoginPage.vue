<template>
      
    <div class="container">
   
        <div class="row">
            
            <div class="col-sm-5 offset-sm-1">
                <br>
                <h2>Bem-vindo a Ferramenta de</h2>
                <h1>Catalogo de Dados</h1> 
            </div>

            <div class="col-sm-3 offset-sm-2">
                <br>
                <h3>Acesse sua conta</h3>
                <small>Por favor entre com seu Usuário e Senha</small>
                <form @submit.prevent="handleSubmit">   
                    <div class="form-group">
                        <input type="text" placeholder="Usuário" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                        <div v-show="submitted && !username" class="invalid-feedback">Campo obrigatório</div>
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Senha" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                        <div v-show="submitted && !password" class="invalid-feedback">Campo obrigatório</div>
                    </div>
                    <div class="form-group" >
                        <button class="btn btn-danger" :disabled="loggingIn">Acessar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        loggingIn () {
            return this.$store.state.authentication.status.loggingIn;
        }
    },
    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            const { dispatch } = this.$store;
            if (username && password) {
                dispatch('authentication/login', { username, password });
            }
        }
    }
};
</script>