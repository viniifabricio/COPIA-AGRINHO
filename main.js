// ==========================================================================
// CONFIGURAÇÕES E MEMÓRIA DE ACESSIBILIDADE
// ==========================================================================
const configuracoesAcessibilidade = [
    { idBotao: 'btn-contraste', classeCSS: 'alto-contraste' },
    { idBotao: 'btn-fonte', classeCSS: 'fonte-grande' },
    { idBotao: 'btn-espacamento', classeCSS: 'espacado' },
    { idBotao: 'btn-dislexia', classeCSS: 'fonte-dislexia' },
    { idBotao: 'btn-saturacao', classeCSS: 'preto-branco' }
];

// Carrega as configurações salvas ao iniciar a página
configuracoesAcessibilidade.forEach(item => {
    const estadoSalvo = localStorage.getItem(item.classeCSS) === 'true';
    if (estadoSalvo) {
        if (item.classeCSS === 'preto-branco') {
            document.documentElement.classList.add(item.classeCSS);
        } else {
            document.body.classList.add(item.classeCSS);
        }
    }
});

// ==========================================================================
// 1. LÓGICA DO SIMULADOR DO CLIMA
// ==========================================================================
const valUmidade = document.getElementById('val-umidade');
const valVento = document.getElementById('val-vento');
const valStatus = document.getElementById('val-status');
const msgUmidade = document.getElementById('msg-umidade');
const msgVento = document.getElementById('msg-vento');
const msgRecomendacao = document.getElementById('msg-recomendacao');

if (document.getElementById('simular-sol')) {
    document.getElementById('simular-sol').addEventListener('click', () => {
        valUmidade.innerText = '22%';
        valVento.innerText = '8 km/h';
        valStatus.innerText = 'ALERTA: PRECISANDO LIGAR A IRRIGAÇÃO';
        valStatus.style.color = '#e63946';
        msgUmidade.innerText = 'Status: A terra está muito seca.';
        msgVento.innerText = 'Status: O vento está calmo, bom para irrigar.';
        msgRecomendacao.innerText = 'Recomendação: Ligue os pivôs de irrigação para dar água para as plantas.';
    });
}

if (document.getElementById('simular-chuva')) {
    document.getElementById('simular-chuva').addEventListener('click', () => {
        valUmidade.innerText = '85%';
        valVento.innerText = '15 km/h';
        valStatus.innerText = 'SISTEMA DESLIGADO - JÁ ESTÁ CHOVENDO';
        valStatus.style.color = '#2a9d8f';
        msgUmidade.innerText = 'Status: A terra já recebeu bastante água da chuva.';
        msgVento.innerText = 'Status: Vento moderado.';
        msgRecomendacao.innerText = 'Recomendação: O sistema desliga a irrigação sozinho para economizar água e energia.';
    });
}

if (document.getElementById('simular-vento')) {
    document.getElementById('simular-vento').addEventListener('click', () => {
        valUmidade.innerText = '40%';
        valVento.innerText = '32 km/h';
        valStatus.innerText = 'ALERTA: VENTO MUITO FORTE';
        valStatus.style.color = '#d90429';
        msgUmidade.innerText = 'Status: A umidade da terra está normal.';
        msgVento.innerText = 'Status: Rajadas de vento muito acima do limite seguro.';
        msgRecomendacao.innerText = 'Recomendação: Não jogue produtos na lavoura agora. O vento forte pode levar o produto para o lugar errado.';
    });
}

// ==========================================================================
// 2. LÓGICA DA CALCULADORA DE CARBONO
// ==========================================================================
if (document.getElementById('btn-calcular-carbono')) {
    document.getElementById('btn-calcular-carbono').addEventListener('click', () => {
        const hectares = parseFloat(document.getElementById('calc-hectares').value);
        const bioma = document.getElementById('calc-bioma').value;
        
        if (isNaN(hectares) || hectares <= 0) {
            alert('Por favor, digite um tamanho de área válido (maior que zero).');
            return;
        }

        let fatorCO2 = 8.5; 
        if (bioma === 'cerrado') fatorCO2 = 4.2;
        if (bioma === 'floresta-tropical') fatorCO2 = 12.0;

        const toneladasAnuais = hectares * fatorCO2;
        const creditosGerados = toneladasAnuais; 
        const valorFinanceiro = creditosGerados * 75.00; 

        document.getElementById('res-toneladas').innerText = toneladasAnuais.toFixed(2);
        document.getElementById('res-creditos').innerText = creditosGerados.toFixed(2);
        document.getElementById('res-financeiro').innerText = valorFinanceiro.toFixed(2);
    });
}

// ==========================================================================
// 3. LÓGICA DO QUIZ COM PERGUNTAS BALANCEADAS (FÁCIL, MÉDIA E DIFÍCIL)
// ==========================================================================
const questoes = [
    {
        pergunta: "[NÍVEL FÁCIL] Qual é a atitude correta para economizar água doce nas plantações?",
        a: "Ligar os irrigadores mecânicos ao meio-dia sob sol forte.",
        b: "Instalar sensores inteligentes para irrigar apenas quando o solo precisar.",
        resposta: "b",
        explicacao: "Isso mesmo! Sensores evitam desperdício irracional de água em terras que já estão úmidas."
    },
    {
        pergunta: "[NÍVEL MÉDIO] Por que não se deve aplicar produtos na lavoura com rajadas de vento acima de 28 km/h?",
        a: "Porque o vento causa o efeito 'deriva', arrastando o produto para rios e propriedades vizinhas.",
        b: "Porque o vento forte fixa o produto em excesso nas folhas, queimando-as.",
        resposta: "a",
        explicacao: "Perfeito! A deriva espalha componentes químicos para fora da área alvo, poluindo ecossistemas."
    },
    {
        pergunta: "[NÍVEL DIFÍCIL] Qual prática de manejo é eficaz para reter (sequestrar) carbono e matéria orgânica na terra?",
        a: "A aração profunda contínua, revolvendo o solo antes de cada semeadura.",
        b: "O Sistema de Plantio Direto, mantendo a palhada de culturas anteriores sobre o chão.",
        resposta: "b",
        explicacao: "Excelente! A cobertura orgânica impede a erosão do solo e retém o gás carbono fixado na terra."
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

const txtPergunta = document.getElementById('pergunta-quiz');
const statusPerg = document.getElementById('status-pergunta');
const btnA = document.getElementById('btn-opcao-a');
const btnB = document.getElementById('btn-opcao-b');
const resQuiz = document.getElementById('resultado-quiz');
const btnProx = document.getElementById('btn-proxima');
const btnReiniciar = document.getElementById('btn-reiniciar');
const blocoOpcoes = document.getElementById('bloco-opcoes');

function carregarQuestao() {
    if (!txtPergunta) return; 

    resQuiz.innerText = '';
    btnProx.classList.add('avancar-oculto');
    btnReiniciar.classList.add('avancar-oculto');
    blocoOpcoes.style.display = 'flex'; 
    btnA.disabled = false;
    btnB.disabled = false;

    if (perguntaAtual < questoes.length) {
        statusPerg.innerText = `Pergunta ${perguntaAtual + 1} de ${questoes.length}`;
        txtPergunta.innerText = questoes[perguntaAtual].pergunta;
        btnA.innerText = "A) " + questoes[perguntaAtual].a;
        btnB.innerText = "B) " + questoes[perguntaAtual].b;
    } else {
        statusPerg.innerText = "Quiz Concluído! 🎉";
        txtPergunta.innerText = `Você concluiu o teste! Você acertou ${pontuacao} de ${questoes.length} perguntas.`;
        blocoOpcoes.style.display = 'none'; 
        btnProx.classList.add('avancar-oculto');
        btnReiniciar.classList.remove('avancar-oculto'); 
    }
}

function avaliarResposta(alternativa) {
    btnA.disabled = true;
    btnB.disabled = true;
    const questao = questoes[perguntaAtual];
    let textFeedback = "";

    if (alternativa === questao.resposta) {
        pontuacao++;
        textFeedback = "🌟 " + questao.explicacao;
        resQuiz.style.color = document.body.classList.contains('alto-contraste') ? '#ffff00' : '#2d6a4f';
    } else {
        textFeedback = "❌ Resposta incorreta. Dica: " + questao.explicacao;
        resQuiz.style.color = document.body.classList.contains('alto-contraste') ? '#ffffff' : '#d90429';
    }
    resQuiz.innerText = textFeedback;
    btnProx.classList.remove('avancar-oculto');
}

if (btnA && btnB) {
    btnA.addEventListener('click', () => avaliarResposta('a'));
    btnB.addEventListener('click', () => avaliarResposta('b'));
}

if (btnProx) {
    btnProx.addEventListener('click', () => {
        perguntaAtual++;
        carregarQuestao();
    });
}

if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () => {
        perguntaAtual = 0;
        pontuacao = 0;
        carregarQuestao();
    });
}

if (txtPergunta) {
    carregarQuestao();
}

// ==========================================================================
// 4. CENTRAL DO MENU DE ACESSIBILIDADE FLUTUANTE & NAVBAR RESPONSIVA
// ==========================================================================
const btnAbrirMenu = document.getElementById('btn-abrir-acessibilidade');
const menuAcessivel = document.getElementById('menu-acessibilidade');

if (btnAbrirMenu && menuAcessivel) {
    btnAbrirMenu.addEventListener('click', () => {
        const escondido = menuAcessivel.classList.toggle('acessibilidade-escondido');
        btnAbrirMenu.setAttribute('aria-expanded', !escondido);
    });
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('aberto');
    });
}

function gerenciarAcessibilidade(idBotao, classeCSS) {
    const botao = document.getElementById(idBotao);
    if (!botao) return; 
    
    const elementoAlvo = (classeCSS === 'preto-branco') ? document.documentElement : document.body;
    
    if (elementoAlvo.classList.contains(classeCSS)) {
        botao.setAttribute('aria-pressed', 'true');
    } else {
        botao.setAttribute('aria-pressed', 'false');
    }

    botao.addEventListener('click', () => {
        let ativo;
        if (classeCSS === 'preto-branco') {
            ativo = document.documentElement.classList.toggle(classeCSS);
        } else {
            ativo = document.body.classList.toggle(classeCSS);
        }
        
        botao.setAttribute('aria-pressed', ativo);
        localStorage.setItem(classeCSS, ativo);
    });
}

configuracoesAcessibilidade.forEach(item => {
    gerenciarAcessibilidade(item.idBotao, item.classeCSS);
});

const btnOuvir = document.getElementById('btn-ouvir-site');
if (btnOuvir) {
    let lendoConteudo = null;
    btnOuvir.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                btnOuvir.innerText = "🔊 Ouvir Conteúdo";
                return;
            }
            const conteudoPrincipal = document.getElementById('conteudo-principal');
            const textoParaLer = conteudoPrincipal ? conteudoPrincipal.innerText : document.body.innerText;
            lendoConteudo = new SpeechSynthesisUtterance(textoParaLer);
            lendoConteudo.lang = 'pt-BR';
            
            lendoConteudo.onend = () => {
                btnOuvir.innerText = "🔊 Ouvir Conteúdo";
            };

            btnOuvir.innerText = "🛑 Parar Leitura";
            window.speechSynthesis.speak(lendoConteudo);
        } else {
            alert('Navegador incompatível com síntese de voz.');
        }
    });
}

// ==========================================================================
// 5. MOTOR DE ANIMAÇÃO DINÂMICA VIA SCROLL (INTERSECTION OBSERVER)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const secoesParaAnimar = document.querySelectorAll(".animar-scroll");
    
    if ("IntersectionObserver" in window) {
        const observadorScroll = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observadorScroll.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15 });

        secoesParaAnimar.forEach(secao => observadorScroll.observe(secao));
    } else {
        secoesParaAnimar.forEach(secao => secao.classList.add("visivel"));
    }
});

// ==========================================================================
// 6. CONTROLE DO SLIDER INTERATIVO (ANTES E DEPOIS)
// ==========================================================================
const sliderFoto = document.getElementById('slider-foto');
const imgDepois = document.querySelector('.img-depois');

if (sliderFoto && imgDepois) {
    sliderFoto.addEventListener('input', (e) => {
        imgDepois.style.width = `${e.target.value}%`;
    });
}

// ==========================================================================
// 7. CONTADOR AMBIENTAL CONTINUO (SIMULAÇÃO)
// ==========================================================================
const contadorAgua = document.getElementById('contador-agua');
if (contadorAgua) {
    let valorInicial = 14520000; 
    setInterval(() => {
        valorInicial += 150; 
        contadorAgua.innerText = valorInicial.toLocaleString('pt-BR') + " Litros";
    }, 1000);
}

// ==========================================================================
// 8. INTERAÇÕES DO ASSISTENTE VIRTUAL AGRO (IA SIMULADA)
// ==========================================================================
const respostaAssistente = document.getElementById('resposta-assistente');

if (respostaAssistente) {
    document.getElementById('btn-pergunta-sustentabilidade').addEventListener('click', () => {
        respostaAssistente.innerText = "Sustentabilidade no agro é produzir alimentos sem destruir o futuro. Consiste em balancear a rentabilidade econômica com a conservação da biodiversidade vegetal e hídrica.";
    });

    document.getElementById('btn-pergunta-carbono').addEventListener('click', () => {
        respostaAssistente.innerText = "O crédito de carbono funciona como um ativo ambiental. Cada tonelada de gases poluentes sequestrada pelo plantio de árvores vira uma cota comercializável no mercado financeiro global.";
    });

    document.getElementById('btn-pergunta-agua').addEventListener('click', () => {
        respostaAssistente.innerText = "Reduz-se o consumo com técnicas como microaspersão direcionada, reaproveitamento pluvial e monitoramento ativo do solo por meio de sensores eletrônicos digitais.";
    });
}