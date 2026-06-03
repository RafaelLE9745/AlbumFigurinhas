<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/Home" />
                </ion-buttons>
                <ion-title>Acessar Conta</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content color="light" class="ion-padding">
            <div class="login-container">
                
                <div class="header-sessao">
                    <h2>Bem-vindo de volta!</h2>
                    <p>Entre com seus dados para continuar.</p>
                </div>

                <form class="formulario" @submit.prevent>
                    <ion-item lines="none" class="input-item">
                        <ion-input 
                            label="E-mail" 
                            label-placement="floating" 
                            type="email"
                            placeholder="seu@email.com"
                            v-model="CampoEmail"
                            class="custom-input"
                        ></ion-input>
                    </ion-item>

                    <ion-item lines="none" class="input-item">
                        <ion-input 
                            label="Senha" 
                            label-placement="floating"  
                            type="password"
                            placeholder="Sua senha secreta"
                            v-model="CampoSenha"
                            class="custom-input"
                        ></ion-input>
                    </ion-item>

                    <div v-if="mensagemErro" class="mensagem-erro">
                        {{ mensagemErro }}
                    </div>

                    <ion-button expand="block" shape="round" class="botao-entrar" @click="ClickLogar">
                        Entrar
                    </ion-button>

                    <ion-button 
                        expand="block" 
                        fill="clear" 
                        router-link="/ResetPassword"
                        class="botao-recuperar"
                    >
                        Esqueceu a senha?
                    </ion-button>

                    <div class="divider">
                        <span>ou</span>
                    </div>

                    <ion-button 
                        router-link="/Cadastro" 
                        expand="block" 
                        fill="outline" 
                        shape="round" 
                        class="botao-criar-conta"
                    >
                        Criar nova conta
                    </ion-button>
                </form>

            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { Logar } from '@/composables/useUsers';
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

const CampoEmail = ref('')
const CampoSenha = ref('')
const mensagemErro = ref('')

function ClickLogar(){
    mensagemErro.value = ''
    
    const resultado = Logar(CampoEmail.value, CampoSenha.value)
    
    if (resultado.sucesso) {
        CampoEmail.value = ''
        CampoSenha.value = ''
        router.push('/tabs/tarefas')
    } else {
        mensagemErro.value = resultado.mensagem
    }
}
</script>

<style scoped>
.login-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 32px 8px;
}

.header-sessao h2 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #000000; /* Força cor preta visível */
    margin-bottom: 8px;
}

.header-sessao p {
    font-size: 1.1rem;
    color: #444444; /* Cinza escuro legível */
    margin-bottom: 40px;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.input-item {
    --background: #ffffff;
    --color: #000000; /* Cor do texto digitado */
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 4px;
}

/* Força o contraste nas labels e placeholders */
.custom-input {
    color: #000000 !important;
    --color: #000000 !important;
    --placeholder-color: #666666;
}

.botao-entrar {
    height: 56px;
    font-weight: 700;
    --box-shadow: 0 8px 16px rgba(var(--ion-color-primary-rgb), 0.2);
}

.divider {
    text-align: center;
    margin: 16px 0;
    position: relative;
}

.divider::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
    z-index: 1;
}

.divider span {
    background: #f4f5f8; /* Cor idêntica ao fundo "light" padrão do Ionic */
    padding: 0 16px;
    color: #666666;
    position: relative;
    z-index: 2;
    font-size: 0.9rem;
}

.botao-criar-conta {
    height: 56px;
    font-weight: 600;
}

.botao-recuperar {
    margin-top: 8px;
    --color: var(--ion-color-primary);
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
</style>