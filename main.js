// ==========================================================================
// MONITOR DE RENDERIZAÇÃO DE SCROLL (INTERSECTION OBSERVER ORIGINAL)
// ==========================================================================
const blocosScroll = document.querySelectorAll('.animar-scroll');
const monitorScroll = new IntersectionObserver((elementos) => {
    elementos.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.add('visivel');
        }
    });
}, { threshold: 0.05 });
blocosScroll.forEach(bloco => monitorScroll.observe(bloco));

// ==========================================================================
// 1. DINÂMICA DO MAPA DE ANDIRÁ (PONTOS DE PRODUÇÃO)
// ==========================================================================
function clicarMapa(polo) {
    const box = document.getElementById('info-mapa-clique');
    const titulo = document.getElementById('mapa-titulo-polo');
    const desc = document.getElementById('mapa-desc-polo');
    box.style.display = 'block';

    if (polo === 'norte') {
        titulo.innerText = "🌾 Polo Norte - Plantações de Cafés Especiais";
        desc.innerText = "Região montanhosa de Andirá. Caracteriza-se por lavouras de manejo sombreado que preservam microclimas locais e evitam erosões hídricas severas.";
    } else if (polo === 'sul') {
        titulo.innerText = "🚜 Polo Sul - Cinturão de Produção de Grãos";
        desc.innerText = "Áreas planas ideais para grandes safras de soja e milho safrinha. Aplicação em massa do Sistema de Plantio Direto e rotação de culturas.";
    } else {
        titulo.innerText = "🏡 Polo Leste - Policultura e Agricultura Familiar";
        desc.innerText = "Centrado no abastecimento hortifrúti regional através de transição orgânica controlada e sistemas de irrigação fechada por microaspersão.";
    }
}

// ==========================================================================
// 6 & 7. MOTOR DO SIMULADOR INTEGRADO (ÁGUA & CULTURAS)
// ==========================================================================
function alterarInformacaoCultura() {
    const cultura = document.getElementById('sim-agua-cultura').value;
    
    if (cultura === 'soja') {
        document.getElementById('plantio-nome').innerText = "🌱 Cultura da Soja Sustentável";
        document.getElementById('plantio-epoca').innerText = "Outubro a Dezembro (Safra)";
        document.getElementById('plantio-beneficios').innerText = "Garante a fixação simbiótica de nitrogênio no solo através de bactérias biológicas nativas, poupando fertilizantes industriais.";
    } else if (cultura === 'milho') {
        document.getElementById('plantio-nome').innerText = "🌽 Cultura do Milho Safrinha";
        document.getElementById('plantio-epoca').innerText = "Janeiro a Março (Após colheita da soja)";
        document.getElementById('plantio-beneficios').innerText = "A estrutura mecânica residual de suas raízes gera volumosa palhada protetiva essencial para o plantio direto continuado.";
    } else if (cultura === 'cafe') {
        document.getElementById('plantio-nome').innerText = "☕ Cultura do Café de Precisão";
        document.getElementById('plantio-epoca').innerText = "Perene (Mudas alinhadas nos meses chuvosos)";
        document.getElementById('plantio-beneficios').innerText = "Cultura duradoura que impede a compactação profunda da terra e atua ativamente no sequestro contínuo de carbono atmosférico.";
    }
}

document.getElementById('btn-calcular-agua').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('sim-agua-hectares').value) || 0;
    const cultura = document.getElementById('sim-agua-cultura').value;
    
    let fatorConsumo = cultura === 'cafe' ? 600000 : 450000;
    let tradicional = hectares * fatorConsumo;
    let eficiente = tradicional * 0.70; // 30% de redução mecânica real
    let economia = tradicional - eficiente;

    document.getElementById('res-agua-tradicional').innerText = tradicional.toLocaleString('pt-BR');
    document.getElementById('res-agua-eficiente').innerText = eficiente.toLocaleString('pt-BR');
    document.getElementById('res-agua-economia').innerText = economia.toLocaleString('pt-BR');
    
    alterarInformacaoCultura();
});

// ==========================================================================
// 8. PROCESSAMENTO DA Pegada de Carbono (CO2)
// ==========================================================================
document.getElementById('btn-calcular-emissoes').addEventListener('click', () => {
    const diesel = parseFloat(document.getElementById('calc-combustivel').value) || 0;

    let co2Emitido = (diesel * 2.61) / 1000; // 1L de óleo diesel descarrega ~2.61kg de gás estufa
    let arvoresCompensacao = Math.ceil(co2Emitido * 7); // Algoritmo padrão de equivalência florestal

    document.getElementById('res-co2-emitido').innerText = co2Emitido.toFixed(2);
    document.getElementById('res-arvores-compensacao').innerText = arvoresCompensacao;
});

// ==========================================================================
// 9. BANCO DE CONSULTAS DO ASSISTENTE AGRO
// ==========================================================================
function perguntarIA(id) {
    const box = document.getElementById('res-ia');
    const txt = document.getElementById('txt-res-ia');
    box.style.display = 'block';

    if (id === 1) {
        txt.innerText = "A sustentabilidade agrícola apoia-se em produzir alimentos saudáveis em larga escala sem exaurir as reservas hídricas subsuperficiais, preservando a microfauna biológica do solo e retendo matas nativas de preservação permanente.";
    } else if (id === 2) {
        txt.innerText = "Créditos de Carbono convertem toneladas de gases estufa que deixaram de ser emitidos ou que foram retidos por florestas nativas em títulos digitais negociáveis, gerando novas fontes de renda líquida para a propriedade sustentável.";
    } else {
        txt.innerText = "A otimização de recursos hídricos envolve monitorar o solo por meio de sensores de umidade em tempo real, adotar gotejamentos localizados e reter a cobertura de palhada seca sobre a terra para eliminar perdas por evaporação solar.";
    }
}

// ==========================================================================
// 11. ATUALIZADOR VOLUMÉTRICO DINÂMICO CONTÍNUO
// ==========================================================================
let volumeInicialLitros = 1250400;
setInterval(() => {
    volumeInicialLitros += Math.floor(Math.random() * 6) + 2;
    const campoContador = document.getElementById('contador-dinamico-litros');
    if (campoContador) {
        campoContador.innerText = volumeInicialLitros.toLocaleString('pt-BR') + " Litros";
    }
}, 1200);

// ==========================================================================
// 13. GERENCIADOR DE TRANSFORMAÇÃO DE SOLO (ANTES E DEPOIS)
// ==========================================================================
document.getElementById('slider-antes-depois').addEventListener('input', function(e) {
    const estagio = e.target.value;
    const monitor = document.getElementById('status-solo-visual');

    if (estagio < 35) {
        monitor.innerText = "🌵 Estágio Atual: Solo Altamente Degradado (Compactado, erodido e sem vida)";
        monitor.style.background = "#ffebee"; monitor.style.color = "#c62828";
    } else if (estagio >= 35 && estagio < 75) {
        monitor.innerText = "🌾 Estágio Atual: Solo em Fase de Transição (Rotação de culturas e adubação verde em curso)";
        monitor.style.background = "#fff3e0"; monitor.style.color = "#ef6c00";
    } else {
        monitor.innerText = "🌱 Estágio Atual: Solo Plenamente Regenerado (Rico em matéria orgânica, bio-retentivo e equilibrado!)";
        monitor.style.background = "#e8f5e9"; monitor.style.color = "#2e7d32";
    }
});

// ==========================================================================
// 14 & 15. FAZENDA INTELIGENTE ANIMADA & MATRIZ DE DECISÃO
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

    if (sol) {
        bSolar.style.background = "#fff59d"; bSolar.innerHTML = "☀️ Módulo Fotovoltaico<br><b>OPERANDO SOLAR</b>"; pontuacaoVerde++;
    } else {
        bSolar.style.background = "#eceff1"; bSolar.innerHTML = "☀️ Módulo Fotovoltaico<br><small>Inativo</small>";
    }

    if (irr) {
        bIrr.style.background = "#90caf9"; bIrr.innerHTML = "💦 Malha Hidráulica<br><b>FLUXO OTIMIZADO</b>";
        bSens.style.background = "#a5d6a7"; bSens.innerHTML = "📟 Telemetria IoT<br><b>MONITORANDO</b>"; pontuacaoVerde += 2;
    } else {
        bIrr.style.background = "#eceff1"; bIrr.innerHTML = "💦 Malha Hidráulica<br><small>Bloqueada</small>";
        bSens.style.background = "#eceff1"; bSens.innerHTML = "📟 Telemetria IoT<br><small>Desconectada</small>";
    }

    if (mata) {
        bDrone.style.background = "#ce93d8"; bDrone.innerHTML = "🚁 Monitoramento Drone<br><b>MAPEANDO APP</b>"; pontuacaoVerde++;
    } else {
        bDrone.style.background = "#eceff1"; bDrone.innerHTML = "🚁 Monitoramento Drone<br><small>Estacionado</small>";
    }

    const nAmbiental = document.getElementById('nota-ambiental');
    const nEconomica = document.getElementById('nota-economica');

    if (pontuacaoVerde === 0) {
        nAmbiental.innerText = "F (Crítico)"; nAmbiental.style.color = "red";
        nEconomica.innerText = "C (Instável)"; nEconomica.style.color = "#ef6c00";
    } else if (pontuacaoVerde <= 2) {
        nAmbiental.innerText = "B (Moderado)"; nAmbiental.style.color = "blue";
        nEconomica.innerText = "B (Estabilizado)"; nEconomica.style.color = "blue";
    } else {
        nAmbiental.innerText = "A+ (Excelente Conservação)"; nAmbiental.style.color = "green";
        nEconomica.innerText = "A+ (Alta Rentabilidade)"; nEconomica.style.color = "green";
    }
}

// ==========================================================================
// 3 & 10. ENGINE DO QUIZ PEDAGÓGICO E LIBERAÇÃO DE CONQUISTAS
// ==========================================================================
const quesitoAgro = [
    {
        p: "Qual a principal vantagem da irrigação controlada via sensores?",
        o: ["Redução substancial de 10 a 30% do consumo, aplicando água onde necessário", "Nenhum impacto perceptível na lavoura", "Aumento sistemático do gasto de água"],
        c: 0
    },
    {
        p: "O que caracteriza o Sistema de Plantio Direto?",
        o: ["Abertura profunda de valas com aração constante", "Cultivo sobre resíduos vegetais anteriores, mantendo o solo protegido", "Queima mecânica de detritos antes da semeadura"],
        c: 1
    },
    {
        p: "Como uma propriedade rural emite ou captura créditos de carbono?",
        o: ["Adquirindo maquinários poluentes tradicionais", "Retendo poluentes nas árvores nativas e estocando matéria orgânica estável na terra", "Pagando taxas financeiras sobre o volume colhido"],
        c: 1
    }
];

let posicaoQuiz = 0;
let contagemAcertos = 0;

function gerenciarMedalhas() {
    if (posicaoQuiz >= 0) {
        document.getElementById('medalha-1').classList.add('desbloqueada');
    }
    if (contagemAcertos >= 2) {
        document.getElementById('medalha-2').classList.add('desbloqueada');
    }
    if (contagemAcertos === quesitoAgro.length) {
        document.getElementById('medalha-3').classList.add('desbloqueada');
    }
}

function inicializarQuiz() {
    document.getElementById('btn-proxima').style.display = 'none';
    document.getElementById('resultado-quiz').innerText = "";
    const opcoesContainer = document.getElementById('bloco-opcoes');
    opcoesContainer.innerHTML = "";

    if (posicaoQuiz >= quesitoAgro.length) {
        concluirQuiz();
        return;
    }

    document.getElementById('status-pergunta').innerText = `Proposição ${posicaoQuiz + 1} de ${quesitoAgro.length}`;
    const itemAtual = quesitoAgro[posicaoQuiz];
    document.getElementById('pergunta-quiz').innerText = itemAtual.p;

    gerenciarMedalhas();

    itemAtual.o.forEach((alternativa, num) => {
        const opcaoBtn = document.createElement('button');
        opcaoBtn.className = 'btn-resposta-quiz';
        opcaoBtn.innerText = alternativa;
        opcaoBtn.onclick = () => checarEscolhaQuiz(num);
        opcoesContainer.appendChild(opcaoBtn);
    });
}

function checarEscolhaQuiz(selecionada) {
    const gabarito = quesitoAgro[posicaoQuiz].c;
    const todosBotoes = document.getElementById('bloco-opcoes').querySelectorAll('button');
    todosBotoes.forEach(btn => btn.disabled = true);

    const painelRetorno = document.getElementById('resultado-quiz');
    if (selecionada === gabarito) {
        painelRetorno.innerText = "🎯 Diagnóstico Correto!"; painelRetorno.style.color = "green";
        contagemAcertos++;
    } else {
        painelRetorno.innerText = "❌ Alternativa Incorreta."; painelRetorno.style.color = "red";
    }

    gerenciarMedalhas();
    document.getElementById('btn-proxima').style.display = 'inline-block';
}

function concluirQuiz() {
    document.getElementById('status-pergunta').innerText = "Processo Concluído!";
    document.getElementById('pergunta-quiz').innerText = `Desempenho Final: Você validou com precisão ${contagemAcertos} de ${quesitoAgro.length} teses agrícolas.`;
    document.getElementById('bloco-opcoes').innerHTML = "";
    document.getElementById('btn-proxima').style.display = 'none';
    document.getElementById('btn-reiniciar').style.display = 'inline-block';
}

document.getElementById('btn-proxima').addEventListener('click', () => { posicaoQuiz++; inicializarQuiz(); });
document.getElementById('btn-reiniciar').addEventListener('click', () => { posicaoQuiz = 0; contagemAcertos = 0; document.getElementById('btn-reiniciar').style.display = 'none'; inicializarQuiz(); });

window.addEventListener('DOMContentLoaded', () => {
    inicializarQuiz();
    alterarInformacaoCultura();
});

// ==========================================================================
// CENTRAL INTEGRADA DE CONTROLE DE ACESSIBILIDADE
// ==========================================================================
const gatilhoAcessibilidade = document.getElementById('btn-abrir-acessibilidade');
const painelAcessibilidade = document.getElementById('menu-acessibilidade');

gatilhoAcessibilidade.addEventListener('click', () => {
    const invisivel = painelAcessibilidade.classList.toggle('acessibilidade-escondido');
    gatilhoAcessibilidade.setAttribute('aria-expanded', !invisivel);
});

document.getElementById('btn-contraste').addEventListener('click', () => document.body.classList.toggle('alto-contraste'));
document.getElementById('btn-fonte').addEventListener('click', () => document.body.classList.toggle('fonte-grande'));
document.getElementById('btn-espacamento').addEventListener('click', () => document.body.classList.toggle('espacado'));
document.getElementById('btn-dislexia').addEventListener('click', () => document.body.classList.toggle('fonte-dislexia'));
document.getElementById('btn-saturacao').addEventListener('click', () => document.documentElement.classList.toggle('preto-branco'));