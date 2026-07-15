<template>
  <ion-page>
    <AppHeader titulo="Estatísticas e Ranking" />

    <ion-content class="ion-padding">
      <!-- Seção de Ranking -->
      <ion-card class="ranking-card">
        <ion-card-header>
          <ion-card-title>Ranking de Colecionador</ion-card-title>
          <ion-badge :color="getBadgeColor(ranking.nivel)">{{ ranking.nivel }}</ion-badge>
        </ion-card-header>
        <ion-card-content>
          <div class="ranking-info">
            <h2>{{ ranking.pontos }} Pontos</h2>
            <p>Próximo Nível: {{ ranking.proximoNivel }}</p>
          </div>
          <ion-progress-bar :value="ranking.progressoNivel" color="warning"></ion-progress-bar>
          <p class="ion-text-right ion-margin-top">{{ ranking.pontos }} / {{ ranking.metaPontos }}</p>
        </ion-card-content>
      </ion-card>

      <!-- Seção de Estatísticas -->
      <div class="stats-grid">
        <ion-card class="stat-item">
          <ion-card-content>
            <h3>{{ stats.total }}</h3>
            <p>Cadastradas</p>
          </ion-card-content>
        </ion-card>

        <ion-card class="stat-item">
          <ion-card-content>
            <h3 class="text-success">{{ stats.coletadas }}</h3>
            <p>Coletadas</p>
          </ion-card-content>
        </ion-card>

        <ion-card class="stat-item">
          <ion-card-content>
            <h3 class="text-danger">{{ stats.faltantes }}</h3>
            <p>Faltantes</p>
          </ion-card-content>
        </ion-card>
      </div>

      <ion-card>
        <ion-card-content>
          <div class="flex-between ion-margin-bottom">
            <span>Conclusão do Álbum</span>
            <ion-badge color="primary">{{ Math.round(stats.percentual) }}%</ion-badge>
          </div>
          <ion-progress-bar :value="stats.percentual / 100"></ion-progress-bar>
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-item>
          <ion-label>Figurinhas Raras</ion-label>
          <ion-badge slot="end" color="warning">{{ stats.raras }}</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>Figurinhas Brilhantes</ion-label>
          <ion-badge slot="end" color="tertiary">{{ stats.brilhantes }}</ion-badge>
        </ion-item>
      </ion-list>

      <!-- Histórico de Coletas -->
      <h3 class="ion-margin-top ion-padding-start">Últimas Coletas</h3>
      <ion-list>
        <ion-item v-for="(item, index) in historico" :key="index">
          <ion-label>
            <h2>{{ item.nome }}</h2>
            <p>{{ item.selecao }}</p>
          </ion-label>
          <ion-note slot="end">{{ formatDate(item.collected_at) }}</ion-note>
        </ion-item>
        <ion-item v-if="historico.length === 0">
          <ion-label class="ion-text-center">Nenhuma figurinha coletada ainda.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonBadge, IonProgressBar, IonList, IonItem,
  IonLabel, IonNote
} from '@ionic/vue';
import AppHeader from '@/components/AppHeader.vue';
import { getEstatisticas, getRanking, getHistoricoColetas } from '@/services/database';
import { usuarioLogado } from '@/composables/useAuth';

const stats = ref<any>({});
const ranking = ref<any>({});
const historico = ref<any[]>([]);

async function carregarDados() {
  if (!usuarioLogado.value) return;
  const id = usuarioLogado.value.id;
  
  stats.value = await getEstatisticas(id);
  ranking.value = await getRanking(id);
  historico.value = await getHistoricoColetas(id);
}

function getBadgeColor(nivel: string) {
  switch (nivel) {
    case 'Diamante': return 'tertiary';
    case 'Ouro': return 'warning';
    case 'Prata': return 'medium';
    default: return 'warning';
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

onMounted(() => {
  carregarDados();
});
</script>

<style scoped>
.ranking-card {
  background: linear-gradient(135deg, #fbc02d 0%, #f57f17 100%);
  color: white;
}

.ranking-card ion-card-title {
  color: white;
}

.ranking-info h2 {
  font-size: 2.5em;
  margin: 10px 0;
  font-weight: bold;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.stat-item {
  text-align: center;
  margin: 0;
}

.stat-item h3 {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-item p {
  font-size: 0.8em;
  color: var(--ion-color-medium);
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-success { color: var(--ion-color-success); }
.text-danger { color: var(--ion-color-danger); }
</style>
