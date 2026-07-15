<template>
  <ion-card class="sticker-card">

    <ion-img
      :src="sticker.foto"
      alt="Jogador"
    />

    <ion-card-header>
      <ion-card-title>{{ sticker.nome }}</ion-card-title>
      <ion-card-subtitle>{{ sticker.selecao }}</ion-card-subtitle>
      <ion-card-subtitle>{{ sticker.raridade }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>

      <div class="flex-between">
        <ion-badge
          :color="sticker.coletada ? 'success' : 'danger'"
          :class="sticker.coletada ? 'sticker-status collected' : 'sticker-status pending'"
        >
          {{ sticker.coletada ? 'Coletada' : 'Pendente' }}
        </ion-badge>

        <ion-button fill="clear" @click.stop="toggleFav">
          <ion-icon :icon="sticker.favorite ? heart : heartOutline" :color="sticker.favorite ? 'danger' : 'medium'"></ion-icon>
        </ion-button>
      </div>

      <p v-if="sticker.coletada && sticker.collected_at" class="collect-date">
        Coletada em: {{ new Date(sticker.collected_at).toLocaleDateString() }}
      </p>

      <ion-button
        expand="block"
        class="ion-margin-top"
        @click="toggleColetada"
      >
        {{
          sticker.coletada
            ? 'Remover da coleção'
            : 'Coletar figurinha'
        }}
      </ion-button>

    </ion-card-content>

  </ion-card>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon
} from "@ionic/vue"
import { heart, heartOutline } from 'ionicons/icons'
import { toggleFavorite } from '@/services/database'
import { usuarioLogado } from '@/composables/useAuth'

const props = defineProps<{
  sticker: {
    id: number
    nome: string
    selecao: string
    foto: string
    coletada: boolean
    raridade: string
  }
}>()

const emit = defineEmits<{
  toggle: [id: number],
  refresh: []
}>()

function toggleColetada() {
  emit("toggle", props.sticker.id)
}

async function toggleFav() {
  if (!usuarioLogado.value) return;
  await toggleFavorite(usuarioLogado.value.id, props.sticker.id);
  emit("refresh");
}
</script>