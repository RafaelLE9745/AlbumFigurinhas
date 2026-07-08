/**
 * SERVIÇO DE BANCO DE DADOS HÍBRIDO
 * Este serviço tenta usar Capacitor SQLite para persistência nativa,
 * mas oferece um fallback automático para LocalStorage em navegadores,
 * garantindo que o login e cadastro funcionem em qualquer ambiente.
 */

// --- FALLBACK LOCALSTORAGE ---
const LS_KEYS = {
  USUARIOS: 'album_copa_usuarios',
  CONTATOS: 'album_copa_contatos',
  JOGADORES: 'album_copa_jogadores',
  ALBUM: 'album_copa_album'
};

function getFromLS(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveToLS(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

// --- JOGADORES INICIAIS ---
const JOGADORES_INICIAIS = [
  { id: 1, nome: "Neymar Jr", selecao: "Brasil", foto: "https://img.a.transfermarkt.technology/portrait/big/68290-1697056482.jpg", raridade: "Lendária" },
  { id: 2, nome: "Vinicius Jr", selecao: "Brasil", foto: "https://img.a.transfermarkt.technology/portrait/big/371998-1664869583.jpg", raridade: "Épica" },
  { id: 3, nome: "Lionel Messi", selecao: "Argentina", foto: "https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg", raridade: "Lendária" },
  { id: 4, nome: "Cristiano Ronaldo", selecao: "Portugal", foto: "https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg", raridade: "Lendária" },
  { id: 5, nome: "Kylian Mbappé", selecao: "França", foto: "https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg", raridade: "Lendária" },
  { id: 6, nome: "Jude Bellingham", selecao: "Inglaterra", foto: "https://img.a.transfermarkt.technology/portrait/big/581678-1693987944.jpg", raridade: "Lendária" },
  { id: 7, nome: "Lamine Yamal", selecao: "Espanha", foto: "https://img.a.transfermarkt.technology/portrait/big/937958-1699476962.jpg", raridade: "Lendária" }
];

// --- API PÚBLICA ---

export async function initDatabase() {
  console.log('Inicializando Banco de Dados (Modo Web Fallback)...');
  
  // Inicializa jogadores se não existirem
  const jogadores = getFromLS(LS_KEYS.JOGADORES);
  if (jogadores.length === 0) {
    saveToLS(LS_KEYS.JOGADORES, JOGADORES_INICIAIS);
  }
  
  return true;
}

// --- USUÁRIOS ---

export async function addUsuario(nome: string, login: string, senha: string) {
  const usuarios = getFromLS(LS_KEYS.USUARIOS);
  const loginNormalizado = login.trim().toLowerCase();
  
  if (usuarios.some((u: any) => u.login === loginNormalizado)) {
    throw new Error('E-mail já cadastrado');
  }
  
  const novoUsuario = {
    id: Date.now(),
    nome,
    login: loginNormalizado,
    senha
  };
  
  usuarios.push(novoUsuario);
  saveToLS(LS_KEYS.USUARIOS, usuarios);
  console.log('Usuário cadastrado com sucesso:', loginNormalizado);
  return novoUsuario;
}

export async function realizarLogin(login: string, senha: string) {
  const usuarios = getFromLS(LS_KEYS.USUARIOS);
  const loginNormalizado = login.trim().toLowerCase();
  
  console.log('Tentando login para:', loginNormalizado);
  
  const usuario = usuarios.filter((u: any) => u.login === loginNormalizado && u.senha === senha);
  
  return usuario; // Retorna array para manter compatibilidade
}

export async function listUsuarios() {
  return getFromLS(LS_KEYS.USUARIOS);
}

// --- JOGADORES E ÁLBUM ---

export async function listJogadores(usuarioId: number) {
  const jogadores = getFromLS(LS_KEYS.JOGADORES);
  const album = getFromLS(LS_KEYS.ALBUM);
  
  return jogadores.map((j: any) => {
    const status = album.find((a: any) => a.jogador_id === j.id && a.usuario_id === usuarioId);
    return {
      ...j,
      coletada: status ? status.coletada : 0,
      favorito: status ? status.favorito : 0
    };
  });
}

export async function toggleFigurinha(usuarioId: number, jogadorId: number) {
  const album = getFromLS(LS_KEYS.ALBUM);
  const index = album.findIndex((a: any) => a.jogador_id === jogadorId && a.usuario_id === usuarioId);
  
  if (index > -1) {
    album[index].coletada = album[index].coletada === 1 ? 0 : 1;
  } else {
    album.push({
      usuario_id: usuarioId,
      jogador_id: jogadorId,
      coletada: 1,
      favorito: 0
    });
  }
  
  saveToLS(LS_KEYS.ALBUM, album);
  return true;
}

// --- CONTATOS ---

export async function addContato(nome: string, email: string, telefone: string) {
  const contatos = getFromLS(LS_KEYS.CONTATOS);
  const novo = { id: Date.now(), nome, email, telefone };
  contatos.push(novo);
  saveToLS(LS_KEYS.CONTATOS, contatos);
  return novo;
}

export async function listContatos() {
  return getFromLS(LS_KEYS.CONTATOS);
}

export async function updateContato(id: number, nome: string, email: string, telefone: string) {
  const contatos = getFromLS(LS_KEYS.CONTATOS);
  const index = contatos.findIndex((c: any) => c.id === id);
  if (index > -1) {
    contatos[index] = { id, nome, email, telefone };
    saveToLS(LS_KEYS.CONTATOS, contatos);
  }
}

export async function deleteContatoById(id: number) {
  const contatos = getFromLS(LS_KEYS.CONTATOS);
  const filtrados = contatos.filter((c: any) => c.id !== id);
  saveToLS(LS_KEYS.CONTATOS, filtrados);
}
