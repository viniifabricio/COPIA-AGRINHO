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

// Garante a aplicação do histórico salvo do usuário sem redefinir o ambiente do zero
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
// 3. LÓGICA DO QUIZ DE CONHECIMENTOS (MELHORADO COM FUNÇÃO REINICIAR)
// ==========================================================================
const questoes = [
    {
        pergunta: "De acordo com a Agência Nacional de Águas (ANA), qual atividade gasta mais água doce no Brasil?",
        a: "Uso doméstico nas cidades",
        b: "Irrigação de plantações na agricultura",
        resposta: "b",
        explicacao: "Correto! A irrigação usa bastante água doce. Por isso, sistemas como o EcoRadar ajudam a economizar esse recurso."
    },
    {
        pergunta: "Por que não devemos passar defensivos agrícolas com ventos acima de 28 km/h?",
        a: "Porque o vento forte causa a 'deriva', levando o produto para fora da lavoura",
        b: "Porque o produto perde o efeito na hora com o calor do vento",
        resposta: "a",
        explicacao: "Muito bem! O vento forte espalha o produto para longe, poluindo o ambiente e gerando desperdício."
    },
    {
        pergunta: "Segundo dados da Embrapa, qual a porcentagem aproximada do território brasileiro protegida por produtores dentro de suas terras?",
        a: "Cerca de 10%",
        b: "Cerca de 33%",
        resposta: "b",
        explicacao: "Exato! Cerca de um terço do Brasil é preservado de forma voluntária pelos produtores rurais."
    }
];

let perguntaAtual = 0;

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
        statusPerg.innerText = `Pergunta ${perguntaAtual + 1} de ${questoes.length}`;
        txtPergunta.innerText = questoes[perguntaAtual].pergunta;
        btnA.innerText = "A) " + questoes[perguntaAtual].a;
        btnB.innerText = "B) " + questoes[perguntaAtual].b;
    } else {
        statusPerg.innerText = "Quiz Concluído! 🎉";
        txtPergunta.innerText = "Parabéns por testar os seus conhecimentos sobre sustentabilidade!";
        blocoOpcoes.style.display = 'none'; 
        btnProx.classList.add('avancar-oculto');
        btnReiniciar.classList.remove('avancar-oculto'); 
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

btnReiniciar.addEventListener('click', () => {
    perguntaAtual = 0;
    carregarQuestao();
});

carregarQuestao();

// ==========================================================================
// 4. CENTRAL DE ACESSIBILIDADE FLUTUANTE COM LOCALSTORAGE
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
            document.getElementById('btn-ouvir-site').innerText = "🔊 Ouvir Site (Texto-Voz)";
            return;
        }
        const textoParaLer = document.getElementById('conteudo-principal').innerText;
        lendoConteudo = new SpeechSynthesisUtterance(textoParaLer);
        lendoConteudo.lang = 'pt-BR';
        
        lendoConteudo.onend = () => {
            document.getElementById('btn-ouvir-site').innerText = "🔊 Ouvir Site (Texto-Voz)";
        };

        document.getElementById('btn-ouvir-site').innerText = "🛑 Parar Leitura";
        window.speechSynthesis.speak(lendoConteudo);
    } else {
        alert('Desculpe, o seu navegador atual não suporta a leitura de tela por voz.');
    }
});