/* ==========================================================================
   PROJETO DESENVOLVIDO PARA O CONCURSO AGRINHO 2026 - LOGICA DO FRONT-END
   ========================================================================= */

// --- BANCO DE DADOS LOCAL DO QUIZ ---
const perguntasQuiz = [
    {
        pergunta: "Por que não devemos pulverizar plantações com ventos muito fortes?",
        opcoes: [
            "A) Por causa do fenômeno da deriva, que desvia os produtos e contamina a natureza ao redor.",
            "B) Porque as gotas d'água congelam antes de tocar nas folhas da lavoura."
        ],
        correta: 0,
        explicacao: "Correto! O vento forte causa deriva, desperdiçando o product e poluindo o meio ambiente."
    },
    {
        pergunta: "Qual o impacto ecológico de ligar sistemas de irrigação momentos antes de uma chuva forte?",
        opcoes: [
            "A) Ajuda a economizar energia elétrica nas bombas.",
            "B) Causa desperdício severo de água doce e gastos desnecessários de eletricidade."
        ],
        correta: 1,
        explicacao: "Excelente! Irrigar antes da chuva é desnecessário, já que a natureza fará o trabalho de graça."
    },
    {
        pergunta: "Qual a porcentagem aproximada de consumo de água doce mundial pela agricultura?",
        opcoes: [
            "A) Cerca de 70%, o que exige o uso de tecnologias inteligentes para evitar o esgotamento.",
            "B) Menos de 5%, pois a maior parte vem de águas industriais."
        ],
        correta: 0,
        explicacao: "Isso mesmo! O agro usa cerca de 70% da água doce, por isso a tecnologia de controle é vital."
    },
    {
        pergunta: "Qual o tema principal do Concurso Agrinho 2026?",
        opcoes: [
            "A) Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente.",
            "B) Expansão urbana máxima e automação industrial sem controle."
        ],
        correta: 0,
        explicacao: "Perfeito! O foco é produzir com inteligência respeitando e conservando o ecossistema!"
    }
];

let indicePerguntaAtual = 0;
let acertosQuiz = 0; 
let vozAtiva = false;
let sinteseVoz = window.speechSynthesis;
let utteranceAtual = null;

/* ==========================================================================
   1. INICIALIZAÇÃO DO SISTEMA
   ========================================================================= */
function inicializarQuizEPainel() {
    renderizarPerguntaQuiz();
    simularClima(12, 15); // Configuração neutra inicial
}

/* ==========================================================================
   2. ACESSIBILIDADE - LEITURA DE VOZ (VERSÃO CORRIGIDA ANTI-TRAVAMENTO)
   ========================================================================= */
function toggleLeituraVoz() {
    const btnVoz = document.getElementById("btn-voz");
    
    // Força a limpeza de qualquer fila presa no navegador antes de agir
    sinteseVoz.cancel();
    
    if (!vozAtiva) {
        vozAtiva = true;
        btnVoz.innerText = "🛑 Parar Leitura";
        btnVoz.classList.add("btn-ativo");
        
        let textoParaLer = "Bem-vindo ao EcoRadar Agro. Categoria Front-End, Agrinho 2026. ";
        textoParaLer += "Desenvolvedor: Vinicius Montagna Fabricio. Escola: Colégio Estadual Cívico-Militar Stella Maris, Andirá Paraná. ";
        textoParaLer += "Sobre o Projeto: O EcoRadar Agro é uma plataforma digital desenvolvida para auxiliar pequenos e grandes produtores rurais a tomarem decisões inteligentes e ecológicas no campo.";
        
        utteranceAtual = new SpeechSynthesisUtterance(textoParaLer);
        utteranceAtual.lang = 'pt-BR';
        utteranceAtual.rate = 1.1;
        
        // Quando a fala terminar naturalmente
        utteranceAtual.onend = function() {
            vozAtiva = false;
            btnVoz.innerText = "🔊 Ouvir Site";
            btnVoz.classList.remove("btn-ativo");
        };

        // Segurança caso ocorra um erro de bloqueio de áudio do sistema
        utteranceAtual.onerror = function() {
            vozAtiva = false;
            btnVoz.innerText = "🔊 Ouvir Site";
            btnVoz.classList.remove("btn-ativo");
            sinteseVoz.cancel();
        };
        
        sinteseVoz.speak(utteranceAtual);
    } else {
        // Se já estava ativa, o cancel() executado no início desliga o som,
        // nos restando redefinir o layout do botão.
        vozAtiva = false;
        btnVoz.innerText = "🔊 Ouvir Site";
        btnVoz.classList.remove("btn-ativo");
    }
}

/* ==========================================================================
   3. ALTO CONTRASTE
   ========================================================================= */
function toggleContraste() {
    document.body.classList.toggle("alto-contraste");
    const btn = document.getElementById("btn-contraste");
    if (document.body.classList.contains("alto-contraste")) {
        btn.innerText = "☀️ Modo Normal";
    } else {
        btn.innerText = "🌓 Contraste";
    }
}

/* ==========================================================================
   4. SISTEMA DO QUIZ INTERATIVO
   ========================================================================= */
function renderizarPerguntaQuiz() {
    const statusTxt = document.getElementById("status-pergunta");
    const perguntaTxt = document.getElementById("pergunta-quiz");
    const btnA = document.getElementById("btn-opcao-a");
    const btnB = document.getElementById("btn-opcao-b");
    const resultadoTxt = document.getElementById("resultado-quiz");
    const btnProxima = document.getElementById("btn-proxima");

    resultadoTxt.innerText = "";
    resultadoTxt.style.color = "initial";
    btnProxima.style.display = "none";
    
    btnA.style.display = "inline-block";
    btnB.style.display = "inline-block";
    btnA.disabled = false;
    btnB.disabled = false;

    if (indicePerguntaAtual < perguntasQuiz.length) {
        const dados = perguntasQuiz[indicePerguntaAtual];
        statusTxt.innerText = `Pergunta ${indicePerguntaAtual + 1} de ${perguntasQuiz.length}`;
        perguntaTxt.innerText = dados.pergunta;
        btnA.innerText = dados.opcoes[0];
        btnB.innerText = dados.opcoes[1];
    } else {
        statusTxt.innerText = "✨ Quiz Concluído!";
        perguntaTxt.innerText = `Você finalizou o teste ecológico!`;
        
        let feedbackAcertos = "";
        if(acertosQuiz === perguntasQuiz.length) {
            feedbackAcertos = "🏆 Excelente! Você possui consciência ecológica máxima!";
        } else if(acertosQuiz >= 2) {
            feedbackAcertos = "🌱 Muito bom! Você conhece bastante sobre o campo.";
        } else {
            feedbackAcertos = "📚 Vale a pena ler o Espaço Informativo para aprender mais.";
        }
        
        resultadoTxt.innerHTML = `<span style="font-size:1.2rem; display:block; margin-bottom:8px;">Você acertou <strong>${acertosQuiz} de ${perguntasQuiz.length}</strong> perguntas.</span> ${feedbackAcertos}`;
        resultadoTxt.style.color = "#2e7d32";
        
        btnA.style.display = "none";
        btnB.style.display = "none";
    }
}

function verificarResposta(opcaoSelecionada) {
    const dados = perguntasQuiz[indicePerguntaAtual];
    const resultadoTxt = document.getElementById("resultado-quiz");
    const btnA = document.getElementById("btn-opcao-a");
    const btnB = document.getElementById("btn-opcao-b");
    const btnProxima = document.getElementById("btn-proxima");

    btnA.disabled = true;
    btnB.disabled = true;

    if (opcaoSelecionada === dados.correta) {
        acertosQuiz++; 
        resultadoTxt.innerText = "✅ " + dados.explicacao;
        resultadoTxt.style.color = "#27ae60";
    } else {
        resultadoTxt.innerText = "❌ Resposta incorreta. O correto seria a alternativa que evita danos ecológicos.";
        resultadoTxt.style.color = "#e74c3c";
    }
    
    btnProxima.style.display = "inline-block";
}

function proximaPergunta() {
    indicePerguntaAtual++;
    renderizarPerguntaQuiz();
}

/* ==========================================================================
   5. LOGICA COMPUTACIONAL DO PAINEL DE DECISÃO SUSTENTÁVEL
   ========================================================================= */
function simularClima(velocidadeVento, umidadeAr) {
    const luzPulverizacao = document.getElementById("luz-pulverizacao");
    const textoPulverizacao = document.getElementById("texto-pulverizacao");
    const luzIrrigacao = document.getElementById("luz-irrigacao");
    const textoIrrigacao = document.getElementById("texto-irrigacao");

    // Lógica para Pulverização
    if (velocidadeVento > 20) {
        luzPulverizacao.className = "status-luz vermelho-ativo";
        textoPulverizacao.innerHTML = `<strong>Bloqueado:</strong> Vento a ${velocidadeVento} km/h. Risco extremo de deriva química!`;
    } else if (velocidadeVento < 5) {
        luzPulverizacao.className = "status-luz vermelho-ativo";
        textoPulverizacao.innerHTML = `<strong>Aviso:</strong> Vento muito fraco (${velocidadeVento} km/h). Risco de inversão térmica.`;
    } else {
        luzPulverizacao.className = "status-luz verde-ativo";
        textoPulverizacao.innerHTML = `<strong>Liberado:</strong> Vento a ${velocidadeVento} km/h. Condição ideal para aplicação segura.`;
    }

    // Lógica para Irrigação Inteligente
    if (umidadeAr > 80) {
        luzIrrigacao.className = "status-luz vermelho-ativo";
        textoIrrigacao.innerHTML = `<strong>Desligar:</strong> Umidade em ${umidadeAr}%. Chuva iminente detetada via satélite. Economize água!`;
    } else if (umidadeAr < 30) {
        luzIrrigacao.className = "status-luz verde-ativo";
        textoIrrigacao.innerHTML = `<strong>Ativar Urgente:</strong> Solo seco (${umidadeAr}%). Irrigação necessária para o crescimento.`;
    } else {
        luzIrrigacao.className = "status-luz verde-ativo";
        textoIrrigacao.innerHTML = `<strong>Modo Econômico:</strong> Umidade estável em ${umidadeAr}%. Monitorando as próximas nuvens.`;
    }
}