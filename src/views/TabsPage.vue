<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tarefas" href="/tabs/tarefas">
          <ion-icon icon="imageOutline" />
          <ion-label>Álbum</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="perfil" href="/tabs/perfil">
          <ion-icon icon="personCircleOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue';
import { imageOutline, personCircleOutline } from 'ionicons/icons';
</script>

<style scoped>
</style>
