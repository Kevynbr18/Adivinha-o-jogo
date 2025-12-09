let nomeJogador = "";

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
            pergunta: "Na franquia Mario, quem salva a Princesa Peach?",
            opcoes: ["Mario", "Luigi", "Bowser", "Toad"],
            resposta: 0
        }
    ],

    medio: [
        {
            pergunta: "Em qual plataforma Halo ficou famoso?",
            opcoes: ["Nintendo", "Xbox", "PlayStation", "PC"],
            resposta: 1
        },
        {
            pergunta: "Qual jogo popularizou o Battle Royale?",
            opcoes: ["GTA V", "PUBG", "Minecraft", "FIFA"],
            resposta: 1
        },
        {
            pergunta: "Qual desses jogos ficou conhecido pela violência em 2022?",
            opcoes: ["The Callisto Protocol", "Dying Light 2", "The Quarry", "Scorn"],
            resposta: 0
        }
    ],

    dificil: [
        {
            pergunta: "Ano de lançamento do primeiro PlayStation:",
            opcoes: ["1994", "1998", "1990", "2000"],
            resposta: 0
        },
        {
            pergunta: "Criador de Metal Gear:",
            opcoes: ["Miyamoto", "Sakurai", "Hideo Kojima", "Kojima e Miyamoto"],
            resposta: 2
        },
        {
            pergunta: "Console portátil da Sega de 1990:",
            opcoes: ["Game Gear", "Neo Geo Pocket", "Atari Lynx", "PSP"],
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
const nomeFinalEl = document.getElementById("nomeFinal");

// Sons
const somAcerto = document.getElementById("somAcerto");
const somErro = document.getElementById("somErro");

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
    pararTimer(); // garante que não fica timer antigo

    nome = document.getElementById("nomeJogador").value.trim();

    if (nome === "") {
        alert("Digite seu nome antes de começar!");
        return;
    }

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
    if (nivelEscolhido === "facil") tempo = 180;
    if (nivelEscolhido === "medio") tempo = 120;
    if (nivelEscolhido === "dificil") tempo = 60;

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

function formatarTempo(seg) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
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

    nomeFinalEl.textContent = nomeJogador;
    pontuacaoFinalEl.textContent = pontos;
}

document.getElementById("recomecarBtn").addEventListener("click", () => {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});
