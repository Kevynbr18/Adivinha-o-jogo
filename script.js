const perguntas = {
    facil: [
    {
        pergunta: "Qual console é da Sony?",
        opcoes: ["Xbox", "PlayStation", "Nintendo Wii", "Atari"],
        resposta: 1
    },
    {
        pergunta: "Qual gênero é comum em jogos como FIFA?",
        opcoes: ["Corrida", "Esporte", "Terror", "Puzzle"],
        resposta: 1
    },
    {
        pergunta: "Qual é o nome do personagem que é encanador, italiano e salva a princesa Peach?",
        opcoes: ["Mario", "Luigi", "Bowser", "Toad"],
        resposta: 0
    }
],
    medio: [
    {
        pergunta: "Em qual plataforma o jogo Halo ficou famoso?",
        opcoes: ["Nintendo", "Xbox", "PlayStation", "PC"],
        resposta: 1
    },
    {
        pergunta: "Qual jogo popularizou o gênero Battle Royale?",
        opcoes: ["GTA V", "PUBG", "Minecraft", "FIFA"],
        resposta: 1
    },
    {
        pergunta: "Qual desses jogos ficou conhecido pela violência gráfica em 2022?",
        opcoes: ["The Callisto Protocol", "Dying Light 2", "The Quarry", "Scorn"],
        resposta: 0
    },
    {
    pergunta: "Em The Last of Us, qual é o nome da líder dos Vagalumes?",
    opcoes: ["Marlene", "Tess", "Anna", "Riley"],
    resposta: 0
    },

    {
        pergunta: "Qual jogo ganhou o prêmio de Game of the Year no The Game Awards 2018?",
        opcoes: ["God of War", "Red Dead Redemption 2", "Celeste", "Spider-Man"],
        resposta: 0
    },
],

    dificil: [
    {
        pergunta: "Em qual ano o primeiro PlayStation foi lançado?",
        opcoes: ["1994", "1998", "1990", "2000"],
        resposta: 0
    },
    {
        pergunta: "Quem criou o jogo Metal Gear?",
        opcoes: ["Miyamoto", "Sakurai", "Hideo Kojima", "Kojima e Miyamoto"],
        resposta: 2
    },
    {
        pergunta: "Qual é o nome do console portátil lançado pela Sega em 1990?",
        opcoes: ["Game Gear", "Neo Geo Pocket", "Atari Lynx", "PSP"],
        resposta: 0
    },
    {
        pergunta: "Qual jogo é oficialmente reconhecido como o primeiro videogame da história?",
        opcoes: ["Pong", "Tennis for Two", "Spacewar!", "Computer Space"],
        resposta: 1
    },
    {
        pergunta: "Qual desses jogos NÃO é da FromSoftware?",
        opcoes: ["Bloodborne", "Dark Souls", "Sekiro", "Nioh"],
        resposta: 3
    },
    {
        pergunta: "Em The Witcher 3, qual é o nome da espada de prata padrão de Geralt?",
        opcoes: ["Aerondight", "Zirael", "Gwynbleidd", "Arondight"],
        resposta: 2
    },
    
    {
        pergunta: "Qual foi o primeiro videogame da Microsoft?",
        opcoes: ["Xbox", "Xbox 360", "MSX", "Z80 Home System"],
        resposta: 0
    },
    {
        pergunta: "No jogo DOOM (1993), qual é a arma mais poderosa?",
        opcoes: ["BFG 9000", "Shotgun", "Chaingun", "Plasma Rifle"],
        resposta: 0
    }
]

};

// Telas
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const endScreen = document.getElementById("endScreen");

// Elementos
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const tempoEl = document.getElementById("tempo");
const pontosEl = document.getElementById("pontos");
const contadorPerguntaEl = document.getElementById("contadorPergunta");
const pontuacaoFinalEl = document.getElementById("pontuacaoFinal");

// Áudios
const somAcerto = document.getElementById("somAcerto");
const somErro = document.getElementById("somErro");

// Variáveis globais
let nivelEscolhido = "";
let listaPerguntas = [];
let index = 0;
let pontos = 0;
let tempo;
let interval;

document.querySelectorAll(".nivelBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        nivelEscolhido = btn.dataset.nivel;
        iniciarJogo();
    });
});

function iniciarJogo() {
    listaPerguntas = perguntas[nivelEscolhido];
    index = 0;
    pontos = 0;

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    mostrarPergunta();
}

function mostrarPergunta() {
    if (index >= listaPerguntas.length) return fimDeJogo();

    limpar();
    iniciarTimer();

    const q = listaPerguntas[index];

    perguntaEl.textContent = q.pergunta;
    contadorPerguntaEl.textContent = `Pergunta ${index + 1} / ${listaPerguntas.length}`;
    pontosEl.textContent = pontos;

    q.opcoes.forEach((op, i) => {
        const div = document.createElement("div");
        div.classList.add("opcao");
        div.textContent = op;

        div.addEventListener("click", () => escolher(i));

        opcoesEl.appendChild(div);
    });
}

function escolher(i) {
    pararTimer();

    const correto = listaPerguntas[index].resposta;

    document.querySelectorAll(".opcao").forEach((el, idx) => {
        el.style.pointerEvents = "none";
        if (idx == correto) el.classList.add("correta");

        if (idx == i && i !== correto) el.classList.add("errada");
    });

    if (i === correto) {
        pontos++;
        somAcerto.play();
    } else {
        somErro.play();
    }

    setTimeout(() => {
        index++;
        mostrarPergunta();
    }, 1200);
}

function iniciarTimer() {
    // Define tempo inicial conforme a dificuldade
    if (nivelEscolhido === "facil") tempo = 240;      // 4 minutos
    if (nivelEscolhido === "medio") tempo = 120;      // 2 minutos
    if (nivelEscolhido === "dificil") tempo = 60;     // 1 minuto

    tempoEl.textContent = formatarTempo(tempo);

    interval = setInterval(() => {
        tempo--;
        tempoEl.textContent = formatarTempo(tempo);

        if (tempo <= 0) {
            pararTimer();
            somErro.play();
            index++;
            setTimeout(mostrarPergunta, 800);
        }
    }, 1000);
}
function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg.toString().padStart(2, "0")}`;
}


function pararTimer() {
    clearInterval(interval);
}

function limpar() {
    opcoesEl.innerHTML = "";
}

function fimDeJogo() {
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    pontuacaoFinalEl.textContent = pontos;
}

document.getElementById("recomecarBtn").addEventListener("click", () => {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});
