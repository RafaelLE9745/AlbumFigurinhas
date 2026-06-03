<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/Home"></ion-back-button>
                </ion-buttons>
                <ion-title>Criar Conta</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content color="light" class="ion-padding">
            <div class="cadastro-container">
                
                <div class="boas-vindas-cadastro">
                    <h2>Cadastre-se</h2>
                    <p>Preencha os dados abaixo para começar.</p>
                </div>

                <form class="formulario" @submit.prevent>
                    <ion-item lines="none" class="input-item">
                        <ion-input 
                            label="Nome" 
                            label-placement="floating" 
                            type="text" 
                            placeholder="Digite seu nome completo"
                            v-model="CampoNome"
                            class="custom-input"
                        ></ion-input>
                    </ion-item>

                    <ion-item lines="none" class="input-item">
                        <ion-input 
                            label="E-mail" 
                            label-placement="floating" 
                            type="email" 
                            placeholder="Digite seu e-mail"
                            v-model="CampoEmail"
                            class="custom-input"
                        ></ion-input>
                    </ion-item>

                    <ion-item lines="none" class="input-item">
                        <ion-input 
                            label="Senha" 
                            label-placement="floating" 
                            type="password" 
                            placeholder="Digite sua senha"
                            v-model="CampoSenha"
                            class="custom-input"
                        ></ion-input>
                    </ion-item>

                    <div v-if="mensagemErro" class="mensagem-erro">
                        {{ mensagemErro }}
                    </div>

                    <div v-if="mensagemSucesso" class="mensagem-sucesso">
                        {{ mensagemSucesso }}
                    </div>

                    <ion-button expand="block" shape="round" class="botao-cadastro" @click="CadastrarClick">
                        Cadastrar
                    </ion-button>

                    <ion-button expand="block" fill="clear" class="botao-login" router-link="/Login">
                        Já tem uma conta? Faça Login
                    </ion-button>
                </form>

            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { Cadastrar } from '@/composables/useUsers';
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton,
    IonButtons,
    IonBackButton
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const CampoNome = ref('')
const CampoEmail = ref('')
const CampoSenha = ref('')
const mensagemErro = ref('')
const mensagemSucesso = ref('')

function CadastrarClick(){
    mensagemErro.value = ''
    mensagemSucesso.value = ''
    
    const resultado = Cadastrar(CampoNome.value, CampoEmail.value, CampoSenha.value)
    
    if (resultado.sucesso) {
        mensagemSucesso.value = resultado.mensagem
        CampoNome.value = ''
        CampoEmail.value = ''
        CampoSenha.value = ''
        setTimeout(() => {
            router.push('/Login')
        }, 1500)
    } else {
        mensagemErro.value = resultado.mensagem
    }
}
</script>

<style scoped>
/* Garantir que os textos do cabeçalho sejam visíveis */
.cadastro-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 24px 8px;
}

.boas-vindas-cadastro h2 {
    font-size: 2rem;
    font-weight: 700;
    /* Cor forçada para escuro para dar contraste com o fundo light */
    color: #000000; 
    margin-bottom: 6px;
}

.boas-vindas-cadastro p {
    font-size: 1rem;
    /* Cinza escuro para legibilidade */
    color: #444444;
    margin-bottom: 32px;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.input-item {
    --background: #ffffff;
    --color: #000000; /* Cor do texto digitado */
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --padding-start: 16px;
    --padding-end: 16px;
}

/* Forçar a cor das labels e do texto do input */
.custom-input {
    color: #000000 !important;
    --color: #000000 !important;
    --placeholder-color: #666666;
}

.botao-cadastro {
    margin-top: 16px;
    font-weight: 600;
    height: 52px;
}

.botao-login {
    margin-top: 8px;
    text-transform: none; /* Evita que o texto fique todo em maiúsculo */
    --color: var(--ion-color-primary); /* Usa a cor azul padrão do tema */
}

.mensagem-erro {
    background-color: #ffebee;
    border: 1px solid #f44336;
    color: #c62828;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 12px;
}

.mensagem-sucesso {
    background-color: #e8f5e9;
    border: 1px solid #4caf50;
    color: #2e7d32;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 12px;
}
</style>