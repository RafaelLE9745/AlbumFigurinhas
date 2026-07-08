<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de contato</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Lista de contato</ion-title>
        </ion-toolbar>
      </ion-header>
      <ContatoList />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ContatoList from '@/components/contatoList.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>