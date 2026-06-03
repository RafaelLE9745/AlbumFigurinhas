<template>
  <div class="sticker-card" :class="{ coletada: props.figurinha.coletada }">
    <div class="sticker-image">
      <img :src="props.figurinha.foto" :alt="props.figurinha.nome" />
      <div v-if="props.figurinha.coletada" class="badge-coletada">
        ✓
      </div>
    </div>
    <div class="sticker-info">
      <h3>{{ props.figurinha.nome }}</h3>
      <p class="selecao">{{ props.figurinha.selecao }}</p>
      <p class="numero">Nº {{ props.figurinha.numero }}</p>
    </div>
    <ion-button
      expand="block"
      :color="props.figurinha.coletada ? 'success' : 'medium'"
      size="small"
      @click="alternarColetada"
    >
      {{ props.figurinha.coletada ? 'Coletada' : 'Coletar' }}
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { defineProps, defineEmits } from 'vue';
import type { Figurinha } from '@/composables/useAlbum';

const props = defineProps<{
  figurinha: Figurinha;
}>();

const emit = defineEmits<{
  toggle: [id: number];
}>();

const alternarColetada = () => {
  emit('toggle', props.figurinha.id);
};
</script>

<style scoped>
.sticker-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sticker-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.sticker-card.coletada {
  border: 2px solid #4caf50;
}

.sticker-image {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.sticker-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-coletada {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #4caf50;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.sticker-info {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sticker-info h3 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 1.2;
}

.sticker-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.selecao {
  font-weight: 500;
  color: #667eea;
  margin-bottom: 4px;
}

.numero {
  font-size: 11px;
  color: #999;
}

ion-button {
  margin: 8px 8px 8px 8px;
}
</style>
