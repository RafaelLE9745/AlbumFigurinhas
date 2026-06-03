<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/Home" />
                </ion-buttons>
                <ion-title>Meu Perfil</ion-title>
            </ion-toolbar>
        </ion-header>

    <ion-content color="light" class="ion-padding">
      <div class="perfil-container">
        <div class="perfil-info">
          <ion-icon icon="personCircleOutline" class="perfil-icon" />
          <h2>{{ usuarioLogado?.nome }}</h2>
          <p class="email">{{ usuarioLogado?.email }}</p>
          <p class="status">Usuário logado</p>
        </div>

        <ion-button 
          expand="block" 
          color="danger" 
          @click="fazerLogout"
          class="logout-btn"
        >
          Sair
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/vue';
import { personCircleOutline } from 'ionicons/icons';
import { usuarioLogado, Logout } from '@/composables/useUsers';
import { useRouter } from 'vue-router';

const router = useRouter();

const fazerLogout = () => {
  Logout();
  router.replace('/Home');
};
</script>

<style scoped>
.perfil-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.perfil-info {
  text-align: center;
  margin-bottom: 40px;
}

.perfil-icon {
  font-size: 80px;
  color: var(--ion-color-primary);
  margin-bottom: 20px;
}

.perfil-info h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--ion-color-dark);
  margin-bottom: 8px;
}

.email {
  font-size: 0.9rem;
  color: var(--ion-color-step-600);
  margin-bottom: 4px;
}

.status {
  font-size: 0.95rem;
  color: var(--ion-color-step-600);
}

.logout-btn {
  width: 100%;
  max-width: 300px;
}
</style>
