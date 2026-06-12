document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================
    // 1. SISTEMA DO SIMULADOR (ÁREA DO PRODUTOR) - REGRAS ORIGINAIS
    // ==========================================================
    const valUmidade = document.getElementById("val-umidade");
    const msgUmidade = document.getElementById("msg-umidade");
    const valVento = document.getElementById("val-vento");
    const msgVento = document.getElementById("msg-vento");
    const valStatus = document.getElementById("val-status");
    const msgRecomendacao = document.getElementById("msg-recomendacao");

    document.getElementById("simular-sol").addEventListener("click", () => {
        valUmidade.innerText = "18%";
        msgUmidade.innerText = "Status: Solo muito seco! Alerta de estresse hídrico.";
        valStatus.innerText = "LIGAR IRRIGAÇÃO POR GOTEJAMENTO";
        valStatus.style.color = "#e76f51";
        msgRecomendacao.innerText = "Recomendado ativar o gotejamento nas próximas 2 horas para evitar perdas mundiais.";
    });

    document.getElementById("simular-chuva").addEventListener("click", () => {
        valUmidade.innerText = "85%";
        msgUmidade.innerText = "Status: Solo completamente encharcado.";
        valStatus.innerText = "SISTEMA DE IRRIGAÇÃO DESLIGADO";
        valStatus.style.color = "#2a9d8f";
        msgRecomendacao.innerText = "Chuva forte detectada. Economia de água ativa para poupar os mananciais.";
    });

    document.getElementById("simular-vento").addEventListener("click", () => {
        valVento.innerText = "38 km/h";
        msgVento.innerText = "Status: Ventos fortes! Risco crítico de deriva.";
        valStatus.innerText = "PROIBIDO PULVERIZAR AGORA";
        valStatus.style.color = "#e76f51";
        msgRecomendacao.innerText = "Atenção: Suspenda a aplicação de insumos. O vento levará os defensivos para áreas de preservação.";
    });

    // ==========================================================
    // 2. CALCULADORA DE CRÉDITOS DE CARBONO
    // ==========================================================
    document.getElementById("btn-calcular-carbono").addEventListener("click", () => {
        const hectares = parseFloat(document.getElementById("calc-hectares").value);
        const bioma = document.getElementById("calc-bioma").value;

        if (isNaN(hectares) || hectares <= 0) {
            alert("Por favor, insira um número válido de hectares.");
            return;
        }

        let fatorFixacao = 4.2; 
        if (bioma === "mata-atlantica") fatorFixacao = 8.5;
        if (bioma === "floresta-tropical") fatorFixacao = 12.0;

        const toneladasCo2 = hectares * fatorFixacao;
        const creditosGerados = toneladasCo2; 
        const valorFinanceiro = creditosGerados * 75.00; 

        document.getElementById("res-toneladas").innerText = toneladasCo2.toFixed(2);
        document.getElementById("res-creditos").innerText = creditosGerados.toFixed(2);
        document.getElementById("res-financeiro").innerText = valorFinanceiro.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    // ==========================================================
    // 3. QUIZ TEMÁTICO DA TERRA
    // ==========================================================
    const perguntas = [
        { q: "O que é a 'deriva' na pulverização agrícola?", a: "Quando o vento leva o defensivo para fora da plantação alvo", b: "O processo de crescimento acelerado das folhas", correta: "a" },
        { q: "Qual o método de irrigação mais econômico para evitar o desperdício de água doce?", a: "Aspersão convencional de alta pressão", b: "Gotejamento direto na raiz da planta", correta: "b" },
        { q: "Segundo a Embrapa, qual a porcentagem média do território brasileiro preservada pelos produtores?", a: "Cerca de 33%", b: "Cerca de 5%", correta: "a" },
        { q: "Como os drones ajudam na agricultura de precisão?", a: "Identificando pragas e falhas através de fotos detalhadas", b: "Regando toda a fazenda de uma única vez", correta: "a" },
        { q: "Qual o principal benefício em gerar créditos de carbono na fazenda?", a: "Comprovar que a propriedade ajuda a limpar o ar do planeta", b: "Aumentar a quantidade de chuvas na lavoura", correta: "a" }
    ];

    let perguntaAtualIndex = 0;
    let acertos = 0;

    const statusPergunta = document.getElementById("status-pergunta");
    const perguntaQuiz = document.getElementById("pergunta-quiz");
    const btnOpcaoA = document.getElementById("btn-opcao-a");
    const btnOpcaoB = document.getElementById("btn-opcao-b");
    const resultadoQuiz = document.getElementById("resultado-quiz");
    const btnProxima = document.getElementById("btn-proxima");
    const btnReiniciar = document.getElementById("btn-reiniciar");

    function carregarPergunta() {
        resultadoQuiz.innerText = "";
        btnProxima.classList.add("avancar-oculto");
        
        if (perguntaAtualIndex < perguntas.length) {
            statusPergunta.innerText = `Pergunta ${perguntaAtualIndex + 1} de ${perguntas.length}`;
            perguntaQuiz.innerText = perguntas[perguntaAtualIndex].q;
            btnOpcaoA.innerText = "A) " + perguntas[perguntaAtualIndex].a;
            btnOpcaoB.innerText = "B) " + perguntas[perguntaAtualIndex].b;
            btnOpcaoA.disabled = false;
            btnOpcaoB.disabled = false;
        } else {
            statusPergunta.innerText = "Quiz Finalizado! 🎉";
            perguntaQuiz.innerText = `Você acertou ${acertos} de ${perguntas.length} questões.`;
            btnOpcaoA.classList.add("avancar-oculto");
            btnOpcaoB.classList.add("avancar-oculto");
            btnReiniciar.classList.remove("avancar-oculto");
        }
    }

    function responder(opcaoEscrita) {
        btnOpcaoA.disabled = true;
        btnOpcaoB.disabled = true;
        const correta = perguntas[perguntaAtualIndex].correta;

        if (opcaoEscrita === correta) {
            resultadoQuiz.innerText = "🟢 Resposta Correta! Excelente.";
            acertos++;
        } else {
            resultadoQuiz.innerText = `🔴 Resposta Errada. A alternativa correta era a ${correta.toUpperCase()}.`;
        }
        btnProxima.classList.remove("avancar-oculto");
    }

    btnOpcaoA.addEventListener("click", () => responder("a"));
    btnOpcaoB.addEventListener("click", () => responder("b"));
    
    btnProxima.addEventListener("click", () => {
        perguntaAtualIndex++;
        carregarPergunta();
    });

    btnReiniciar.addEventListener("click", () => {
        perguntaAtualIndex = 0;
        acertos = 0;
        btnOpcaoA.classList.remove("avancar-oculto");
        btnOpcaoB.classList.remove("avancar-oculto");
        btnReiniciar.classList.add("avancar-oculto");
        carregarPergunta();
    });

    carregarPergunta();

    // ==========================================================
    // 4. CONTROLES DO PAINEL DE ACESSIBILIDADE FLUTUANTE
    // ==========================================================
    const btnAbrirAcessibilidade = document.getElementById("btn-abrir-acessibilidade");
    const menuAcessibilidade = document.getElementById("menu-acessibilidade");

    btnAbrirAcessibilidade.addEventListener("click", () => {
        const expandido = btnAbrirAcessibilidade.getAttribute("aria-expanded") === "true";
        btnAbrirAcessibilidade.setAttribute("aria-expanded", !expandido);
        menuAcessibilidade.classList.toggle("acessibilidade-escondido");
    });

    // Alto Contraste
    document.getElementById("btn-contraste").addEventListener("click", function() {
        document.body.classList.toggle("alto-contraste");
        const ativo = document.body.classList.contains("alto-contraste");
        this.setAttribute("aria-pressed", ativo);
    });

    // Redimensionamento de Texto
    let tamanhoTextoGrande = false;
    document.getElementById("btn-fonte").addEventListener("click", function() {
        tamanhoTextoGrande = !tamanhoTextoGrande;
        document.body.style.fontSize = tamanhoTextoGrande ? "1.2rem" : "1rem";
        this.setAttribute("aria-pressed", tamanhoTextoGrande);
    });

    // Espaçamento de Caracteres
    let espacado = false;
    document.getElementById("btn-espacamento").addEventListener("click", function() {
        espacado = !espacado;
        document.body.style.letterSpacing = espacado ? "2px" : "normal";
        this.setAttribute("aria-pressed", espacado);
    });

    // Fonte de Suporte para Dislexia
    let dislexiaAtivo = false;
    document.getElementById("btn-dislexia").addEventListener("click", function() {
        dislexiaAtivo = !dislexiaAtivo;
        document.body.style.fontFamily = dislexiaAtivo ? "'Comic Sans MS', cursive, sans-serif" : "var(--fonte-padrao)";
        this.setAttribute("aria-pressed", dislexiaAtivo);
    });

    // Escala de Cinza (Achromatopsia)
    let cinzaAtivo = false;
    document.getElementById("btn-saturacao").addEventListener("click", function() {
        cinzaAtivo = !cinzaAtivo;
        document.body.style.filter = cinzaAtivo ? "grayscale(100%)" : "none";
        this.setAttribute("aria-pressed", cinzaAtivo);
    });

    // Síntese de Voz (Leitor de Tela do Conteúdo Central)
    document.getElementById("btn-ouvir-site").addEventListener("click", () => {
        const textoParaLer = document.getElementById("conteudo-principal").innerText;
        window.speechSynthesis.cancel(); 
        const fala = new SpeechSynthesisUtterance(textoParaLer);
        fala.lang = "pt-BR";
        window.speechSynthesis.speak(fala);
    });
});