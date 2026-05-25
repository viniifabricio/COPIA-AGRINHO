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
    valStatus.innerText = 'ALERTA: IRRIGAÇÃO NECESSÁRIA';
    valStatus.style.color = '#e63946';
    msgUmidade.innerText = 'Status: Solo muito seco. Risco para a plantação.';
    msgVento.innerText = 'Status: Vento calmo. Condições ideais para irrigar.';
    msgRecomendacao.innerText = 'Recomendação: Ligue os pivôs de irrigação agora para repor a água do solo.';
});

document.getElementById('simular-chuva').addEventListener('click', () => {
    valUmidade.innerText = '85%';
    valVento.innerText = '15 km/h';
    valStatus.innerText = 'SISTEMA DESLIGADO ECONOMICAMENTE';
    valStatus.style.color = '#2a9d8f';
    msgUmidade.innerText = 'Status: Solo completamente úmido devido à chuva.';
    msgVento.innerText = 'Status: Vento moderado.';
    msgRecomendacao.innerText = 'Recomendação: Irrigação desligada de forma automática para economizar água e energia.';
});

document.getElementById('simular-vento').addEventListener('click', () => {
    valUmidade.innerText = '40%';
    valVento.innerText = '32 km/h';
    valStatus.innerText = 'ALERTA: RISCO DE DISPERSÃO (DERIVA)';
    valStatus.style.color = '#d90429';
    msgUmidade.innerText = 'Status: Solo com umidade aceitável.';
    msgVento.innerText = 'Status: Rajadas de vento severas detectadas.';
    msgRecomendacao.innerText = 'Recomendação: Não aplique defensivos agora! O vento forte vai arrastar o produto para fora.';
});

// ==========================================================================
// 2. LÓGICA DA CALCULADORA DE CRÉDITOS DE CARBONO
// ==========================================================================
document.getElementById('btn-calcular-carbono').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('calc-hectares').value);
    const bioma = document.getElementById('calc-bioma').value;
    
    if (isNaN(hectares) || hectares <= 0) {
        alert('Por favor, digite uma quantidade de hectares válida.');
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
// 3. LÓGICA DO QUIZ DE CONHECIMENTOS REFORMULADO (5 PERGUNTAS)
// ==========================================================================
const questoes = [
    {
        pergunta: "De acordo com a Agência Nacional de Águas (ANA), qual atividade gasta mais água doce no Brasil?",
        a: "Uso doméstico nas grandes cidades",
        b: "Irrigação de plantações na atividade agrícola",
        resposta: "b",
        explicacao: "Correto! A irrigação usa a maior parte da água doce captada. Por isso, controlar o tempo de rega com o EcoRadar ajuda a economizar muito!"
    },
    {
        pergunta: "Por que não devemos aplicar defensivos agrícolas quando os ventos estão acima de 28 km/h?",
        a: "Porque o vento forte arrasta o produto para fora da plantação (chamado de deriva)",
        b: "Porque o produto seca muito rápido e perde a força por causa do calor do vento",
        resposta: "a",
        explicacao: "Muito bem! O vento forte joga o produto químico para longe, poluindo matas vizinhas e desperdiçando dinheiro."
    },
    {
        pergunta: "Segundo pesquisas da Embrapa, qual a porcentagem de território nacional que os produtores preservam dentro de suas próprias terras?",
        a: "Cerca de 10% de todo o território brasileiro",
        b: "Cerca de 33% (um terço) de todo o território brasileiro",
        resposta: "b",
        explicacao: "Exato! Os produtores rurais brasileiros mantêm e protegem florestas nativas voluntariamente em cerca de um terço do país."
    },
    {
        pergunta: "O que são os Créditos de Carbono que calculamos no site?",
        a: "Dinheiro dado pelo governo para quem usa tratores elétricos na lavoura",
        b: "Certificados gerados por árvores que tiram poluição (CO2) do ar, que podem ser vendidos no mercado",
        resposta: "b",
        explicacao: "Perfeito! Cada tonelada de gás poluente que as árvores da sua fazenda guardam pode virar um crédito valioso no mercado verde."
    },
    {
        pergunta: "Qual é o principal objetivo de usar um sensor de umidade do solo integrado ao monitoramento do tempo?",
        a: "Saber o momento exato de colher as frutas e vegetais sem estragar",
        b: "Ligar a irrigação somente quando a terra realmente precisa, evitando gastar água e energia à toa",
        resposta: "b",
        explicacao: "Isso mesmo! Olhando o solo e a previsão do tempo juntos, o produtor não joga água na terra se já for chover ou se o solo já estiver úmido."
    }
];

let perguntaAtual = 0;

const txtPergunta = document.getElementById('pergunta-quiz');
const statusPerg = document.getElementById('status-pergunta');
const btnA = document.getElementById('btn-opcao-a');
const btnB = document.getElementById('btn-opcao-b');
const resQuiz = document.getElementById('resultado-quiz');
const btnProx = document.getElementById('btn-proxima');

function carregarQuestao() {
    resQuiz.innerText = '';
    btnProx.classList.add('avancar-oculto');
    btnA.disabled = false;
    btnB.disabled = false;

    if (perguntaAtual < questoes.length) {
        statusPerg.innerText = `Pergunta ${perguntaAtual + 1} de ${questoes.length}`;
        txtPergunta.innerText = questoes[perguntaAtual].pergunta;
        btnA.innerText = "A) " + questoes[perguntaAtual].a;
        btnB.innerText = "B) " + questoes[perguntaAtual].b;
    } else {
        statusPerg.innerText = "Quiz Concluído! 🎉";
        txtPergunta.innerText = "Parabéns por testar os seus conhecimentos sobre sustentabilidade!";
        btnA.style.display = 'none';
        btnB.style.display = 'none';
        btnProx.style.display = 'none';
    }
}

function avaliarResposta(alternativa) {
    btnA.disabled = true;
    btnB.disabled = true;
    const questao = questoes[perguntaAtual];

    if (alternativa === questao.resposta) {
        resQuiz.innerText = questao.explicacao;
        resQuiz.style.color = '#2a9d8f';
    } else {
        resQuiz.innerText = "Ops! Resposta incorreta. Dica: " + questao.explicacao;
        resQuiz.style.color = '#e63946';
    }
    btnProx.classList.remove('avancar-oculto');
}

btnA.addEventListener('click', () => avaliarResposta('a'));
btnB.addEventListener('click', () => avaliarResposta('b'));
btnProx.addEventListener('click', () => {
    perguntaAtual++;
    carregarQuestao();
});

carregarQuestao();

// ==========================================================================
// 4. CENTRAL DE ACESSIBILIDADE FLUTUANTE (PERSISTENTE COM LOCALSTORAGE)
// ==========================================================================
const btnAbrirMenu = document.getElementById('btn-abrir-acessibilidade');
const menuAcessivel = document.getElementById('menu-acessibilidade');

btnAbrirMenu.addEventListener('click', () => {
    const expandido = menuAcessivel.classList.toggle('acessibilidade-escondido');
    btnAbrirMenu.setAttribute('aria-expanded', !expandido);
});

function gerenciarAcessibilidade(idBotao, classeCSS, chaveStorage) {
    const botao = document.getElementById(idBotao);
    
    if (localStorage.getItem(chaveStorage) === 'true') {
        document.body.classList.add(classeCSS);
        botao.setAttribute('aria-pressed', 'true');
    }

    botao.addEventListener('click', () => {
        const ativo = document.body.classList.toggle(classeCSS);
        botao.setAttribute('aria-pressed', ativo);
        localStorage.setItem(chaveStorage, ativo);
    });
}

gerenciarAcessibilidade('btn-contraste', 'alto-contraste', 'cfgContraste');
gerenciarAcessibilidade('btn-fonte', 'fonte-grande', 'cfgFonte');
gerenciarAcessibilidade('btn-espacamento', 'espacado', 'cfgEspaço');
gerenciarAcessibilidade('btn-dislexia', 'fonte-dislexia', 'cfgDislexia');
gerenciarAcessibilidade('btn-saturacao', 'preto-branco', 'cfgSaturacao');

let lendoConteudo = null;
document.getElementById('btn-ouvir-site').addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }
        const textoParaLer = document.getElementById('conteudo-principal').innerText;
        lendoConteudo = new SpeechSynthesisUtterance(textoParaLer);
        lendoConteudo.lang = 'pt-BR';
        window.speechSynthesis.speak(lendoConteudo);
    } else {
        alert('Desculpe, o seu navegador atual não suporta a leitura de tela por voz.');
    }
});

if (typeof window.VW === 'object') {
    new window.VW({
        path: 'https://vlibras.gov.br/app',
        opacity: 0.95
    });
}