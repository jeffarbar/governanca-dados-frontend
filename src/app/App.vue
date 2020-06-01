<template>
    <div>
        <div>
            <b-navbar toggleable="xs" variant="danger" type="light">
                <b-navbar-brand href="#">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src="/src/_img/claro-logo.png" alt="Claro">
                </b-navbar-brand>
                <b-navbar-nav>
                    <b-nav-text v-if="user"> 
                        <small> Olá </small> <b>{{user.username}} </b>
                        &nbsp;&nbsp;&nbsp;
                        <router-link to="/login">Sair</router-link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </b-nav-text>
                    
                </b-navbar-nav>
               
            </b-navbar>
        </div>
        <div class="jumbotron">
            <div v-if="alert && alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
            <router-view></router-view>
        </div>
        <div class="rodape">
            <small>
            <b>© 2020 Claro. Todos os direitos reservados.</b>
            Política de Privacidade Claro
            </small>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
        alert () {
            return this.$store.state.alert
        },
        user () {
            return this.$store.state.authentication.user;
        }
    },
    watch:{
        $route (to, from){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    } 
};
</script>

<style>

.jumbotron {
    position: absolute;
    width: 100%;
    height: 80%;
}

.rodape{
    text-align: center;
    position: fixed; bottom: 0px; left: 0px; right: 0px;
    background-color: #dc3545
}

</style>