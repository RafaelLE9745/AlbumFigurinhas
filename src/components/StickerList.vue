<template>
  <div class="sticker-list">
    <div v-if="figurinhas.length === 0" class="empty-state">
      <p>Nenhuma figurinha encontrada</p>
    </div>
    <div v-else class="grid">
      <StickerCard
        v-for="figurinha in figurinhas"
        :key="figurinha.id"
        :figurinha="figurinha"
        @toggle="$emit('toggle', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Figurinha } from '@/composables/useAlbum';
import StickerCard from './StickerCard.vue';

defineProps<{
  figurinhas: Figurinha[];
}>();

defineEmits<{
  toggle: [id: number];
}>();
</script>

<style scoped>
.sticker-list {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  padding: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
    padding: 8px;
  }
}
</style>
