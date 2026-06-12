// ==========================================================================
// SCROLL OBSERVABILITY MONITOR
// ==========================================================================
const blocosScroll = document.querySelectorAll('.animar-scroll');
const monitorScroll = new IntersectionObserver((elementos) => {
    elementos.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('visivel');
    });
}, { threshold: 0.05 });
blocosScroll.forEach(bloco => monitorScroll.observe(bloco));

// ==========================================================================
// 1. CODIGO DO MAPA DE ANDIRÁ (PONTOS DE PRODUÇÃO)
// ==========================================================================
function clicarMapa(polo) {
    const box = document.getElementById('info-mapa-clique');
    const titulo = document.getElementById('mapa-titulo-polo');
    const desc = document.getElementById('mapa-desc-polo');
    box.style.display = 'block';

    if(polo === 'norte') {
        titulo.innerText = "🌾 Polo Norte - Culturas de Café Especial";
        desc.innerText = "Localizado nas regiões de topografia acidentada de Andirá. Destaque para o manejo sustentável sombreado e agricultura de precisão familiar.";
    } else if(polo === 'sul') {
        titulo.innerText = "🚜 Polo Sul - Produção de Grãos (Soja/Milho)";
        desc.innerText = "Áreas planas ideais para grandes safras. Uso consolidado de plantio direto na palha e monitoramento de pragas por drones termais.";
    } else {
        titulo.innerText = "🏡 Polo Leste - Cinturão Verde de Hortifrúti";
        desc.innerText = "Abastecimento local focado em transição orgânica e técnicas avançadas de economia hídrica por gotejamento subterrâneo.";
    }
}

// ==========================================================================
// 6. SIMULADOR DE ECONOMIA DE ÁGUA
// ==========================================================================
document.getElementById('btn-calcular-agua').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('sim-agua-hectares').value) || 0;
    const cultura = document.getElementById('sim-agua-cultura').value;
    
    let consumoBase = cultura === 'graos' ? 450000 : 600000;
    let tradicional = hectares * consumoBase;
    let eficiente = tradicional * 0.70; // 30% de economia real
    let economia = tradicional - eficiente;

    document.getElementById('res-agua-tradicional').innerText = tradicional.toLocaleString('pt-BR');
    document.getElementById('res-agua-eficiente').innerText = eficiente.toLocaleString('pt-BR');
    document.getElementById('res-agua-economia').innerText = economia.toLocaleString('pt-BR');
    document.getElementById('res-sim-agua').style.display = 'block';
});

// ==========================================================================
// 7. SIMULADOR DE PLANTIO (SOJA, MILHO, CAFÉ)
// ==========================================================================
function simularPlantio(cultura) {
    const box = document.getElementById('res-sim-plantio');
    box.style.display = 'block';

    if(cultura === 'soja') {
        document.getElementById('plantio-nome').innerText = "🌱 Cultura da Soja";
        document.getElementById('plantio-epoca').innerText = "Outubro a Dezembro (Safra Principal)";
        document.getElementById('plantio-agua').innerText = "450 a 700 mm por ciclo produtivo";
        document.getElementById('plantio-beneficios').innerText = "Fixação biológica de nitrogênio atmosférico no solo através de bactérias simbióticas, poupando fertilizantes químicos.";
    } else if(cultura === 'milho') {
        document.getElementById('plantio-nome').innerText = "🌽 Cultura do Milho Safrinha";
        document.getElementById('plantio-epoca').innerText = "Janeiro a Março (Após a colheita da soja)";
        document.getElementById('plantio-agua').innerText = "500 a 600 mm bem distribuídos";
        document.getElementById('plantio-beneficios').innerText = "Produção de palhada volumosa de alta qualidade para conservação mecânica e térmica do solo no sistema de plantio direto.";
    } else if(cultura === 'cafe') {
        document.getElementById('plantio-nome').innerText = "☕ Cultura do Café";
        document.getElementById('plantio-epoca').innerText = "Perene (Plantio de mudas nos meses chuvosos)";
        document.getElementById('plantio-agua').innerText = "1200 a 1400 mm anuais concentrados";
        document.getElementById('plantio-beneficios').innerText = "Estabilização mecânica de encostas contra erosões hídricas intensas e fomento econômico de fixação humana no campo.";
    }
}

// ==========================================================================
// 8. CALCULADORA DE EMISSÕES DE CO2
// ==========================================================================
document.getElementById('btn-calcular-emissoes').addEventListener('click', () => {
    const diesel = parseFloat(document.getElementById('calc-combustivel').value) || 0;
    const area = parseFloat(document.getElementById('calc-area-cultivo').value) || 0;

    // Fatores reais: 1L Diesel emite aprox 2.6kg CO2. Plantações absorvem.
    let emitido = (diesel * 2.61) / 1000; 
    let arvoresNecessarias = Math.ceil(emitido * 7);

    document.getElementById('res-co2-emitido').innerText = emitido.toFixed(2);
    document.getElementById('res-arvores-compensacao').innerText = arvoresNecessarias;
    document.getElementById('res-calc-emissoes').style.display = 'block';
});

// ==========================================================================
// 9. ASSISTENTE VIRTUAL AGRO PRE-PROGRAMADO
// ==========================================================================
function perguntarIA(id) {
    const box = document.getElementById('res-ia');
    const txt = document.getElementById('txt-res-ia');
    box.style.display = 'block';

    if(id === 1) {
        txt.innerText = "Sustentabilidade no campo significa produzir alimentos saudáveis em volume suficiente para atender o mercado sem esgotar os recursos hídricos, sem degradar a microbiologia do solo e garantindo proteção às matas nativas.";
    } else if(id === 2) {
        txt.innerText = "Crédito de Carbono é uma moeda ambiental internacional. Cada tonelada de CO2 que deixa de ser emitida ou que é absorvida pelas matas da fazenda vira um título digital comercializável, gerando lucros extras ao produtor.";
    } else {
        txt.innerText = "Economiza-se água instalando sensores hídricos nas raízes das plantas, usando sistemas de microaspersão/gotejamento fechados e mantendo o solo coberto com palhada seca para evitar a evaporação direta provocada pelo sol.";
    }
}

// ==========================================================================
// 11. CONTADOR AMBIENTAL DINÂMICO CONTINUO
// ==========================================================================
let metrosCubicosAgua = 1250400;
setInterval(() => {
    metrosCubicosAgua += Math.floor(Math.random() * 8) + 3;
    document.getElementById('contador-dinamico-litros').innerText = metrosCubicosAgua.toLocaleString('pt-BR') + " Litros";
}, 1500);

// ==========================================================================
// 13. ANTES E DEPOIS INTERATIVO DO SOLO
// ==========================================================================
document.getElementById('slider-antes-depois').addEventListener('input', function(e) {
    const valor = e.target.value;
    const indicador = document.getElementById('status-solo-visual');

    if(valor < 35) {
        indicador.innerText = "🌵 Solo Degradado (Compactado, erodido e sem nutrientes)";
        indicador.style.background = "#ffebee"; indicador.style.color = "#c62828";
    } else if (valor >= 35 && valor < 75) {
        indicador.innerText = "🌾 Solo em Recuperação (Adubação verde e plantio direto iniciados)";
        indicador.style.background = "#fff3e0"; indicador.style.color = "#ef6c00";
    } else {
        indicador.innerText = "🌱 Solo Totalmente Recuperado (Rico em matéria orgânica e bio-retentivo!)";
        indicador.style.background = "#e8f5e9"; indicador.style.color = "#2e7d32";
    }
});

// ==========================================================================
// 14 & 15. FAZENDA ANIMADA & MISSÃO SUSTENTÁVEL DECISÓRIA
// ==========================================================================
function atualizarMissao() {
    const irr = document.getElementById('decisao-irrigacao').checked;
    const sol = document.getElementById('decisao-solar').checked;
    const mata = document.getElementById('decisao-mata').checked;

    const bSolar = document.getElementById('ani-solar');
    const bDrone = document.getElementById('ani-drone');
    const bIrr = document.getElementById('ani-irrigacao');
    const bSens = document.getElementById('ani-sensores');

    let pontuacaoVerde = 0;

    // Atualiza estados e "animações" visuais simuladas
    if(sol) { bSolar.style.background = "#fff59d"; bSolar.innerHTML = "☀️ Painel Solar <br><b>GERANDO ENERGIA</b>"; pontuacaoVerde++; } 
    else { bSolar.style.background = "#eceff1"; bSolar.innerHTML = "☀️ Painel Solar <br><small>Aguardando</small>"; }

    if(irr) { bIrr.style.background = "#90caf9"; bIrr.innerHTML = "💦 Irrigação <br><b>FLUXO INTELIGENTE</b>"; bSens.style.background = "#a5d6a7"; bSens.innerHTML = "📟 Sensores IoT <br><b>CONECTADOS</b>"; pontuacaoVerde += 2; } 
    else { bIrr.style.background = "#eceff1"; bIrr.innerHTML = "💦 Irrigação <br><small>Desligada</small>"; bSens.style.background = "#eceff1"; bSens.innerHTML = "📟 Sensores IoT <br><small>Desconectados</small>"; }

    if(mata) { bDrone.style.background = "#ce93d8"; bDrone.innerHTML = "🚁 Drones Ativos <br><b>MAPEANDO APP</b>"; pontuacaoVerde++; } 
    else { bDrone.style.background = "#eceff1"; bDrone.innerHTML = "🚁 Drones Ativos <br><small>Pousado</small>"; }

    // Determina as notas da missão
    const nAmbiental = document.getElementById('nota-ambiental');
    const nEconomica = document.getElementById('nota-economica');

    if(pontuacaoVerde === 0) { nAmbiental.innerText = "F"; nAmbiental.style.color = "red"; nEconomica.innerText = "C"; nEconomica.style.color = "orange"; }
    else if(pontuacaoVerde <= 2) { nAmbiental.innerText = "B"; nAmbiental.style.color = "blue"; nEconomica.innerText = "B"; nEconomica.style.color = "blue"; }
    else { nAmbiental.innerText = "A+ EXCELENTE"; nAmbiental.style.color = "green"; nEconomica.innerText = "A+ ALTO LUCRO"; nEconomica.style.color = "green"; }
}

// ==========================================================================
// 3 & 10. MOTOR DO QUIZ INTERATIVO E GANHO DE MEDALHAS
// ==========================================================================
const perguntasAgro = [
    {
        pergunta: "Quanto de água uma plantação economiza com irrigação inteligente?",
        opcoes: ["Cerca de 10 a 30% devido aos sensores de solo", "Não causa impacto real", "Gasta mais água devido aos computadores"],
        correta: 0
    },
    {
        pergunta: "O que é agricultura sustentável?",
        opcoes: ["Parar de produzir alimentos no país", "Produzir garantindo a saúde do solo, água e recursos futuros", "Utilizar maquinários antigos de tração braçal"],
        correta: 1
    },
    {
        pergunta: "Como funciona o crédito de carbono na propriedade rural?",
        opcoes: ["Financiamento bancário convencional de tratores", "O produtor ganha títulos financeiros ao reter CO2 nas florestas e solo", "Um imposto extra cobrado sobre a colheita"],
        correta: 1
    }
];

let indexQuestao = 0;
let acertosQuestao = 0;

function carregarQuestao() {
    document.getElementById('btn-proxima').style.display = 'none';
    document.getElementById('resultado-quiz').innerText = "";
    const containerOpcoes = document.getElementById('bloco-opcoes');
    containerOpcoes.innerHTML = "";

    if(indexQuestao >= perguntasAgro.length) {
        exibirFinalQuiz();
        return;
    }

    document.getElementById('status-pergunta').innerText = `Questão ${indexQuestao + 1} de ${perguntasAgro.length}`;
    const atual = perguntasAgro[indexQuestao];
    document.getElementById('pergunta-quiz').innerText = atual.pergunta;

    // Desbloqueia medalha básica ao começar
    document.getElementById('medalha-1').style.opacity = "1";

    atual.opcoes.forEach((op, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-resposta-quiz';
        btn.innerText = op;
        btn.onclick = () => avaliarQuestao(idx);
        containerOpcoes.appendChild(btn);
    });
}

function avaliarQuestao(escolhida) {
    const certa = perguntasAgro[indexQuestao].correta;
    const btns = document.getElementById('bloco-opcoes').querySelectorAll('button');
    btns.forEach(b => b.disabled = true);

    const resultado = document.getElementById('resultado-quiz');
    if(escolhida === certa) {
        resultado.innerText = "🎯 Resposta Correta!"; resultado.style.color = "green";
        acertosQuestao++;
    } else {
        resultado.innerText = "❌ Resposta Incorreta."; resultado.style.color = "red";
    }

    // Gerenciador dinâmico de medalhas por acertos
    if(acertosQuestao >= 2) document.getElementById('medalha-2').style.opacity = "1";
    if(acertosQuestao === perguntasAgro.length) document.getElementById('medalha-3').style.opacity = "1";

    document.getElementById('btn-proxima').style.display = 'inline-block';
}

function exibirFinalQuiz() {
    document.getElementById('status-pergunta').innerText = "Quiz Encerrado!";
    document.getElementById('pergunta-quiz').innerText = `Desempenho: Você acertou ${acertosQuestao} de ${perguntasAgro.length} formulações.`;
    document.getElementById('bloco-opcoes').innerHTML = "";
    document.getElementById('btn-proxima').style.display = 'none';
    document.getElementById('btn-reiniciar').style.display = 'inline-block';
}

document.getElementById('btn-proxima').addEventListener('click', () => { indexQuestao++; carregarQuestao(); });
document.getElementById('btn-reiniciar').addEventListener('click', () => { indexQuestao = 0; acertosQuestao = 0; document.getElementById('btn-reiniciar').style.display = 'none'; carregarQuestao(); });

window.addEventListener('DOMContentLoaded', carregarQuestao);

// ==========================================================================
// CENTRAL CONTROLE DE ACESSIBILIDADE INTEGRADA
// ==========================================================================
const btnHubAcessivel = document.getElementById('btn-abrir-acessibilidade');
const menuHubAcessivel = document.getElementById('menu-acessibilidade');

btnHubAcessivel.addEventListener('click', () => {
    const status = menuHubAcessivel.classList.toggle('acessibilidade-escondido');
    btnHubAcessivel.setAttribute('aria-expanded', !status);
});

document.getElementById('btn-contraste').addEventListener('click', () => document.body.classList.toggle('alto-contraste'));
document.getElementById('btn-fonte').addEventListener('click', () => document.body.classList.toggle('fonte-grande'));
document.getElementById('btn-espacamento').addEventListener('click', () => document.body.classList.toggle('espacado'));
document.getElementById('btn-dislexia').addEventListener('click', () => document.body.classList.toggle('fonte-dislexia'));
document.getElementById('btn-saturacao').addEventListener('click', () => document.documentElement.classList.toggle('monocromatico'));