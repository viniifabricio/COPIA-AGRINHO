// ==========================================================================
// CONFIGURAÇÕES E MEMÓRIA DE ACESSIBILIDADE (localStorage)
// ==========================================================================
const configuracoesAcessibilidade = [
    { idBotao: 'btn-contraste', classeCSS: 'alto-contraste' },
    { idBotao: 'btn-fonte', classeCSS: 'fonte-grande' },
    { idBotao: 'btn-espacamento', classeCSS: 'espacado' },
    { idBotao: 'btn-dislexia', classeCSS: 'fonte-dislexia' },
    { idBotao: 'btn-saturacao', classeCSS: 'preto-branco' }
];

configuracoesAcessibilidade.forEach(item => {
    const estadoSalvo = localStorage.getItem(item.classeCSS) === 'true';
    if (estadoSalvo) {
        document.body.classList.add(item.classeCSS);
    }
});

// ==========================================================================
// 1. LÓGICA DO SIMULADOR CLIMÁTICO DO PRODUTOR
// ==========================================================================
const valUmidade = document.getElementById('val-umidade');
const valVento = document.getElementById('val-vento');
const valStatus = document.getElementById('val-status');
const msgUmidade = document.getElementById('msg-umidade');
const msgVento = document.getElementById('msg-vento');
const msgRecomendacao = document.getElementById('msg-recomendacao');

document.getElementById('simular-sol').addEventListener('click', () => {
    valUmidade.innerText = '22%';
    valVento.innerText = '8 km/h';
    valStatus.innerText = 'ALERTA: IRRIGAÇÃO REQUERIDA';
    valStatus.style.color = '#e63946';
    msgUmidade.innerText = 'Status: Estresse hídrico severo detectado no perfil do solo.';
    msgVento.innerText = 'Status: Velocidade de vento propícia para aspersão.';
    msgRecomendacao.innerText = 'Recomendação: Ativar sistemas de irrigação para reposição imediata da demanda hídrica.';
});

document.getElementById('simular-chuva').addEventListener('click', () => {
    valUmidade.innerText = '85%';
    valVento.innerText = '15 km/h';
    valStatus.innerText = 'SISTEMA SUSPENSO POR PRECIPITAÇÃO';
    valStatus.style.color = '#2a9d8f';
    msgUmidade.innerText = 'Status: Capacidade de campo saturada por precipitação natural.';
    msgVento.innerText = 'Status: Deslocamento de massas de ar em níveis médios.';
    msgRecomendacao.innerText = 'Recomendação: Desativação automatizada dos pivôs, maximizando a eficiência hidroenergética.';
});

document.getElementById('simular-vento').addEventListener('click', () => {
    valUmidade.innerText = '40%';
    valVento.innerText = '32 km/h';
    valStatus.innerText = 'ALERTA: RISCO CRÍTICO DE DERIVA';
    valStatus.style.color = '#d90429';
    msgUmidade.innerText = 'Status: Umidade do substrato estável.';
    msgVento.innerText = 'Status: Rajadas de vento excedem os limites técnicos operacionais.';
    msgRecomendacao.innerText = 'Recomendação: Interromper a aplicação de defensivos agrícolas para evitar dispersão exógena.';
});

// ==========================================================================
// 2. LÓGICA DA CALCULADORA DE CRÉDITOS DE CARBONO
// ==========================================================================
document.getElementById('btn-calcular-carbono').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('calc-hectares').value);
    const bioma = document.getElementById('calc-bioma').value;
    
    if (isNaN(hectares) || hectares <= 0) {
        alert('Por favor, insira uma extensão territorial válida (valor maior que zero).');
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

// ==========================================================================
// 3. LÓGICA DO QUIZ TÉCNICO E FORMAL (5 PERGUNTAS DE NÍVEL AVANÇADO)
// ==========================================================================
const questoes = [
    {
        pergunta: "Conforme os relatórios consolidados da Agência Nacional de Águas (ANA), qual setor econômico apresenta a maior taxa de consumo de água doce no território brasileiro?",
        a: "O abastecimento urbano e o consumo residencial/doméstico de água.",
        b: "Os sistemas de irrigação e manejo hídrico voltados à produção agrícola.",
        resposta: "b",
        explicacao: "Parabéns! A irrigação agrícola responde pelo maior volume de captação. Ferramentas de automação mitigam essa demanda em até 30%."
    },
    {
        pergunta: "Sob a perspectiva do manejo fitossanitário seguro, por que é tecnicamente contraindicada a pulverização de lavouras sob ventos superiores a 28 km/h?",
        a: "Em razão do fenômeno da deriva, que arrasta as microgotas e causa a dispersão involuntária de defensivos fora do alvo delimitado.",
        b: "Devido ao aumento da taxa de evaporação cinemática instantânea gerada pela fricção do ar.",
        resposta: "a",
        explicacao: "Excelente resposta! O vento excessivo desvia os insumos químicos, gerando contaminação ambiental exógena e severo prejuízo financeiro."
    },
    {
        pergunta: "De acordo com os dados oficiais de monitoramento territorial espacial da Embrapa, qual parcela do território nacional é mantida sob conservação ambiental nativa por iniciativa direta e custeio dos produtores rurais?",
        a: "Apenas uma fração residual estimada em aproximadamente 10% do território nacional.",
        b: "Uma extensão robusta que representa cerca de 33% de todo o território brasileiro mapeado.",
        resposta: "b",
        explicacao: "Resposta correta! Os proprietários rurais desempenham papel estratégico na conservação biológica, custeando um terço das florestas nativas do país."
    },
    {
        pergunta: "Qual pilar conceitual justifica a integração de sensores de umidade de solo a sistemas de telemetria meteorológica automatizados?",
        a: "O princípio da racionalização ambiental, evitando a exaustão de corpos hídricos superficiais e subterrâneos.",
        b: "O controle indutivo de microclimas locais para aceleração do ciclo pluviométrico regional.",
        resposta: "a",
        explicacao: "Perfeito! A irrigação de precisão protege a integridade dos corpos de água locais e reduz significativamente os custos com energia elétrica pública."
    },
    {
        pergunta: "Considerando as regras do mercado de ativos ecológicos, qual tipologia florestal apresenta o maior potencial médio anual de sequestro de carbono por hectare?",
        a: "A vegetação nativa rasteira e arbustiva característica do bioma Cerrado stricto sensu.",
        b: "Florestas comerciais e áreas em estágio de silvicultura ativa e crescimento biomassa acelerado.",
        resposta: "b",
        explicacao: "Exato! Plantas em pleno desenvolvimento fisiológico e expansão de biomassa realizam maior conversão fotossintética, estocando $CO_2$ na estrutura lenhosa."
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
    resQuiz.innerText = '';
    btnProx.classList.add('avancar-oculto');
    btnReiniciar.classList.add('avancar-oculto');
    blocoOpcoes.style.display = 'flex'; 
    btnA.disabled = false;
    btnB.disabled = false;

    if (perguntaAtual < questoes.length) {
        statusPerg.innerText = `Questão ${perguntaAtual + 1} de ${questoes.length}`;
        txtPergunta.innerText = questoes[perguntaAtual].pergunta;
        btnA.innerText = "A) " + questoes[perguntaAtual].a;
        btnB.innerText = "B) " + questoes[perguntaAtual].b;
    } else {
        statusPerg.innerText = "Avaliação Concluída! 🎉";
        txtPergunta.innerText = `Simulado técnico finalizado com sucesso. Desempenho obtido: ${pontuacao} acertos de um total de ${questoes.length} proposições apresentadas.`;
        blocoOpcoes.style.display = 'none'; 
        btnProx.classList.add('avancar-oculto');
        btnReiniciar.classList.remove('avancar-oculto'); 
    }
}

function avaliarResposta(alternativa) {
    btnA.disabled = true;
    btnB.disabled = true;
    const questao = questoes[perguntaAtual];

    // Se estiver em alto contraste, a cor de feedback deve ser ajustável pelo CSS, limpamos estilos inline pesados
    if (alternativa === questao.resposta) {
        pontuacao++;
        resQuiz.innerText = "🌟 " + questao.explicacao;
        resQuiz.style.color = document.body.classList.contains('alto-contraste') ? '#ffff00' : '#2d6a4f';
    } else {
        resQuiz.innerText = "❌ Incorreto. Parâmetro técnico: " + questao.explicacao;
        resQuiz.style.color = document.body.classList.contains('alto-contraste') ? '#ffffff' : '#d90429';
    }
    btnProx.classList.remove('avancar-oculto');
}

btnA.addEventListener('click', () => avaliarResposta('a'));
btnB.addEventListener('click', () => avaliarResposta('b'));

btnProx.addEventListener('click', () => {
    perguntaAtual++;
    carregarQuestao();
});

btnReiniciar.addEventListener('click', () => {
    perguntaAtual = 0;
    pontuacao = 0;
    carregarQuestao();
});

carregarQuestao();

// ==========================================================================
// 4. CENTRAL DE ACESSIBILIDADE FLUTUANTE
// ==========================================================================
const btnAbrirMenu = document.getElementById('btn-abrir-acessibilidade');
const menuAcessivel = document.getElementById('menu-acessibilidade');

btnAbrirMenu.addEventListener('click', () => {
    const expandido = menuAcessivel.classList.toggle('acessibilidade-escondido');
    btnAbrirMenu.setAttribute('aria-expanded', !expandido);
});

function gerenciarAcessibilidade(idBotao, classeCSS) {
    const botao = document.getElementById(idBotao);
    
    if (document.body.classList.contains(classeCSS)) {
        botao.setAttribute('aria-pressed', 'true');
    }

    botao.addEventListener('click', () => {
        const ativo = document.body.classList.toggle(classeCSS);
        botao.setAttribute('aria-pressed', ativo);
        localStorage.setItem(classeCSS, ativo);
    });
}

configuracoesAcessibilidade.forEach(item => {
    gerenciarAcessibilidade(item.idBotao, item.classeCSS);
});

let lendoConteudo = null;
document.getElementById('btn-ouvir-site').addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            document.getElementById('btn-ouvir-site').innerText = "🔊 Ouvir Conteúdo (Sintetizador)";
            return;
        }
        const textoParaLer = document.getElementById('conteudo-principal').innerText;
        lendoConteudo = new SpeechSynthesisUtterance(textoParaLer);
        lendoConteudo.lang = 'pt-BR';
        
        lendoConteudo.onend = () => {
            document.getElementById('btn-ouvir-site').innerText = "🔊 Ouvir Conteúdo (Sintetizador)";
        };

        document.getElementById('btn-ouvir-site').innerText = "🛑 Interromper Leitura";
        window.speechSynthesis.speak(lendoConteudo);
    } else {
        alert('O navegador utilizado não possui suporte para a API nativa de síntese de voz.');
    }
});