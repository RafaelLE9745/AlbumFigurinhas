<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="primary">
                <ion-title>Meu Álbum</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content color="light">
            <!-- Resumo do Álbum -->
            <div class="resumo-container">
                <div class="resumo-card">
                    <div class="resumo-item">
                        <span class="label">Total</span>
                        <span class="valor">{{ resumoAlbum.total }}</span>
                    </div>
                    <div class="resumo-item">
                        <span class="label">Coletadas</span>
                        <span class="valor coletadas">{{ resumoAlbum.coletadas }}</span>
                    </div>
                    <div class="resumo-item">
                        <span class="label">Pendentes</span>
                        <span class="valor pendentes">{{ resumoAlbum.pendentes }}</span>
                    </div>
                    <div class="resumo-item">
                        <span class="label">Progresso</span>
                        <span class="valor">{{ resumoAlbum.percentual }}%</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: resumoAlbum.percentual + '%' }"></div>
                </div>
            </div>

            <!-- Filtros -->
            <div class="filtros-container">
                <ion-searchbar
                    v-model="pesquisa"
                    placeholder="Pesquisar jogador ou seleção"
                    @ion-input="atualizarPesquisa"
                    class="searchbar"
                ></ion-searchbar>
                
                <div class="botoes-filtro">
                    <ion-button
                        :fill="filtroAtivo === 'todas' ? 'solid' : 'outline'"
                        size="small"
                        @click="definirFiltro('todas')"
                    >
                        Todas
                    </ion-button>
                    <ion-button
                        :fill="filtroAtivo === 'coletadas' ? 'solid' : 'outline'"
                        size="small"
                        color="success"
                        @click="definirFiltro('coletadas')"
                    >
                        Coletadas
                    </ion-button>
                    <ion-button
                        :fill="filtroAtivo === 'pendentes' ? 'solid' : 'outline'"
                        size="small"
                        color="warning"
                        @click="definirFiltro('pendentes')"
                    >
                        Pendentes
                    </ion-button>
                </div>
            </div>

            <!-- Lista de Figurinhas -->
            <StickerList
                :figurinhas="figurinhasFiltradas"
                @toggle="alternarColetada"
            />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonSearchbar,
    IonButton
} from '@ionic/vue';
import { ref } from 'vue';
import { 
    figurinhasFiltradas, 
    resumoAlbum, 
    filtroAtivo, 
    pesquisa,
    definirFiltro,
    definirPesquisa,
    alternarColetada
} from '@/composables/useAlbum';
import StickerList from '@/components/StickerList.vue';

const atualizarPesquisa = (event: any) => {
    definirPesquisa(event.detail.value);
};
</script>

<style scoped>
.resumo-container {
    padding: 16px;
}

.resumo-card {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
}

.resumo-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.resumo-item .label {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
    font-weight: 500;
}

.resumo-item .valor {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.resumo-item .valor.coletadas {
    color: #4caf50;
}

.resumo-item .valor.pendentes {
    color: #ff9800;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #45a049);
    transition: width 0.3s ease;
}

.filtros-container {
    padding: 16px;
}

.searchbar {
    margin-bottom: 12px;
}

.botoes-filtro {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 600px) {
    .resumo-card {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
