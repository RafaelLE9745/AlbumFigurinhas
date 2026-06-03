import { ref, computed } from 'vue';

export interface Figurinha {
  id: number;
  nome: string;
  numero: number;
  selecao: string;
  foto: string;
  coletada: boolean;
}

// Dados de figurinhas da Copa (exemplo com 32 seleções)
const figurinhasIniciais: Figurinha[] = [
  // Argentina
  { id: 1, nome: 'Lionel Messi', numero: 10, selecao: 'Argentina', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_201806101.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 2, nome: 'Ángel Di María', numero: 11, selecao: 'Argentina', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/1/1a/Ángel_Di_María_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 3, nome: 'Sergio Agüero', numero: 9, selecao: 'Argentina', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/0e/Sergio_Agüero_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Brasil
  { id: 4, nome: 'Neymar Jr', numero: 10, selecao: 'Brasil', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/8/83/Bra-Cos_%281%29_%28cropped%29.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 5, nome: 'Vinícius Júnior', numero: 7, selecao: 'Brasil', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/f/f3/Vinicius_Jr_2021.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 6, nome: 'Rodrygo', numero: 12, selecao: 'Brasil', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/e/e0/Rodrygo_Goes_2019.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // França
  { id: 7, nome: 'Kylian Mbappé', numero: 10, selecao: 'França', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/5/57/Kylian_Mbappé_2022.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 8, nome: 'Karim Benzema', numero: 9, selecao: 'França', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/e/ec/Karim_Benzema_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 9, nome: 'Antoine Griezmann', numero: 7, selecao: 'França', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/1/11/Antoine_Griezmann_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Alemanha
  { id: 10, nome: 'Manuel Neuer', numero: 1, selecao: 'Alemanha', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/1/10/Manuel_Neuer_2020.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 11, nome: 'Serge Gnabry', numero: 7, selecao: 'Alemanha', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/af/Serge_Gnabry_2019.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 12, nome: 'Thomas Müller', numero: 13, selecao: 'Alemanha', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/da/Thomas_Müller_2019.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Espanha
  { id: 13, nome: 'Sergio Busquets', numero: 5, selecao: 'Espanha', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b2/Sergio_Busquets_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 14, nome: 'Pedri', numero: 8, selecao: 'Espanha', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/07/Pedri_2021_%28cropped%29.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 15, nome: 'Gavi', numero: 6, selecao: 'Espanha', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/5/5b/Gavi_2022.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Inglaterra
  { id: 16, nome: 'Harry Kane', numero: 9, selecao: 'Inglaterra', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/6/6d/Harry_Kane_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 17, nome: 'Raheem Sterling', numero: 10, selecao: 'Inglaterra', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b5/Raheem_Sterling_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 18, nome: 'Bukayo Saka', numero: 7, selecao: 'Inglaterra', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/36/Bukayo_Saka_2021.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Itália
  { id: 19, nome: 'Giorgio Chiellini', numero: 3, selecao: 'Itália', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/ad/Giorgio_Chiellini_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 20, nome: 'Jorginho', numero: 8, selecao: 'Itália', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/f/f7/Jorginho_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 21, nome: 'Ciro Immobile', numero: 17, selecao: 'Itália', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/1/14/Ciro_Immobile_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Holanda
  { id: 22, nome: 'Memphis Depay', numero: 7, selecao: 'Holanda', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b3/Memphis_Depay_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 23, nome: 'Frenkie de Jong', numero: 21, selecao: 'Holanda', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/da/Frenkie_de_Jong_2019.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 24, nome: 'Daley Blind', numero: 17, selecao: 'Holanda', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/c8/Daley_Blind_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Bélgica
  { id: 25, nome: 'Eden Hazard', numero: 7, selecao: 'Bélgica', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/df/Eden_Hazard_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 26, nome: 'Kevin De Bruyne', numero: 17, selecao: 'Bélgica', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/4/40/Kevin_De_Bruyne_2018.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 27, nome: 'Romelu Lukaku', numero: 9, selecao: 'Bélgica', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/c5/Romelu_Lukaku_2017.jpg&w=300&h=300&fit=cover', coletada: false },
  
  // Portugal
  { id: 28, nome: 'Cristiano Ronaldo', numero: 7, selecao: 'Portugal', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/d7/Cristiano_Ronaldo_playing_for_Portugal_against_Morocco_at_the_2018_FIFA_World_Cup.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 29, nome: 'Bruno Fernandes', numero: 8, selecao: 'Portugal', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b8/Bruno_Fernandes_2022.jpg&w=300&h=300&fit=cover', coletada: false },
  { id: 30, nome: 'Diogo Jota', numero: 20, selecao: 'Portugal', foto: 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/3b/Diogo_Jota_2021.jpg&w=300&h=300&fit=cover', coletada: false },
];

export const figurinhas = ref<Figurinha[]>(figurinhasIniciais);
export const filtroAtivo = ref<'todas' | 'coletadas' | 'pendentes'>('todas');
export const pesquisa = ref('');

// Computada para figurinhas filtradas
export const figurinhasFiltradas = computed(() => {
  let resultado = figurinhas.value;

  // Aplicar filtro de status
  if (filtroAtivo.value === 'coletadas') {
    resultado = resultado.filter(f => f.coletada);
  } else if (filtroAtivo.value === 'pendentes') {
    resultado = resultado.filter(f => !f.coletada);
  }

  // Aplicar pesquisa
  if (pesquisa.value.trim()) {
    const termo = pesquisa.value.toLowerCase();
    resultado = resultado.filter(f =>
      f.nome.toLowerCase().includes(termo) ||
      f.selecao.toLowerCase().includes(termo)
    );
  }

  return resultado;
});

// Computada para resumo do álbum
export const resumoAlbum = computed(() => {
  const total = figurinhas.value.length;
  const coletadas = figurinhas.value.filter(f => f.coletada).length;
  const percentual = Math.round((coletadas / total) * 100);

  return {
    total,
    coletadas,
    pendentes: total - coletadas,
    percentual
  };
});

// Computada para seleções únicas
export const selecoes = computed(() => {
  const selecoesUnicas = new Set(figurinhas.value.map(f => f.selecao));
  return Array.from(selecoesUnicas).sort();
});

// Funções de ação
export const marcarColetada = (id: number) => {
  const figurinha = figurinhas.value.find(f => f.id === id);
  if (figurinha) {
    figurinha.coletada = true;
  }
};

export const marcarPendente = (id: number) => {
  const figurinha = figurinhas.value.find(f => f.id === id);
  if (figurinha) {
    figurinha.coletada = false;
  }
};

export const alternarColetada = (id: number) => {
  const figurinha = figurinhas.value.find(f => f.id === id);
  if (figurinha) {
    figurinha.coletada = !figurinha.coletada;
  }
};

export const definirFiltro = (filtro: 'todas' | 'coletadas' | 'pendentes') => {
  filtroAtivo.value = filtro;
};

export const definirPesquisa = (termo: string) => {
  pesquisa.value = termo;
};

export const limparPesquisa = () => {
  pesquisa.value = '';
};

export const obterFigurinhasPorSelecao = (selecao: string) => {
  return figurinhas.value.filter(f => f.selecao === selecao);
};

export const obterFigurinhaColetadaPorSelecao = (selecao: string) => {
  const figurinhasDaSelecao = obterFigurinhasPorSelecao(selecao);
  return figurinhasDaSelecao.filter(f => f.coletada).length;
};
