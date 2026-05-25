/**
 * EcoRadar Agro - Módulo Core Javascript Puro (Vanilla)
 * Arquitetura Event-Driven sem dependências externas ou injeções inline.
 */

document.addEventListener("DOMContentLoaded", function () {
    // Inicialização de Handlers Globais
    inicializarAcessibilidade();
    inicializarCalculadora();
    inicializarGraficosEDados();
    inicializarQuiz();
    inicializarSimuladorClima();
});

/* ==========================================================================
   MÓDULO 1: ACESSIBILIDADE (ALTO CONTRASTE E LEITURA DE VOZ)
   ========================================================================== */
function inicializarAcessibilidade() {
    const btnContraste = document.getElementById("btn-contraste");
    const btnVoz = document.getElementById("btn-voz");

    if (btnContraste) {
        btnContraste.addEventListener("click", function () {
            document.body.classList.toggle("alto-contrast");
            const ativo = document.body.classList.contains("alto-contrast");
            btnContraste.setAttribute("aria-pressed", ativo);
        });
    }

    if (btnVoz) {
        let escutando = false;
        btnVoz.addEventListener("click", function () {
            if (!escutando) {
                const textoParaLer = document.getElementById("conteudo-principal").innerText;
                const fala = new SpeechSynthesisUtterance(textoParaLer);
                fala.lang = "pt-BR";
                fala.rate = 1.1;
                window.speechSynthesis.speak(fala);
                btnVoz.innerText = "🛑 Parar Leitura";
                escutando = true;
                
                fala.onend = function() {
                    btnVoz.innerText = "🔊 Ouvir Site";
                    escutando = false;
                };
            } else {
                window.speechSynthesis.cancel();
                btnVoz.innerText = "🔊 Ouvir Site";
                escutando = false;
            }
        });
    }
}

/* ==========================================================================
   MÓDULO 2: GRÁFICOS DINÂMICOS E CONTADORES NATIVOS
   ========================================================================== */
function inicializarGraficosEDados() {
    // Configuração de IntersectionObserver para disparo de animações sob scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("animate-bar")) {
                    const larguraAlvo = entry.target.getAttribute("data-width");
                    entry.target.style.width = larguraAlvo;
                }
                if (entry.target.classList.contains("animate-number")) {
                    animarNumero(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".animate-bar").forEach(barra => observer.observe(barra));
    document.querySelectorAll(".animate-number").forEach(num => observer.observe(num));
}

function animarNumero(elemento) {
    const alvo = parseInt(elemento.getAttribute("data-target"), 10);
    let atual = 0;
    const incremento = alvo / 50; 
    const intervalo = setInterval(() => {
        atual += incremento;
        if (atual >= alvo) {
            elemento.innerText = alvo + "%";
            clearInterval(intervalo);
        } else {
            elemento.innerText = Math.floor(atual) + "%";
        }
    }, 25);
}

/* ==========================================================================
   MÓDULO 3: CALCULADORA ECOLÓGICA
   ========================================================================== */
function inicializarCalculadora() {
    const btnCalcular = document.getElementById("btn-calcular-ecologia");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", function () {
            const hectaresInput = document.getElementById("input-hectares");
            const boxResultado = document.getElementById("resultado-calculadora");
            const txtAgua = document.getElementById("calc-agua");
            const txtDeriva = document.getElementById("calc-deriva");

            if (hectaresInput && boxResultado) {
                const hectares = parseFloat(hectaresInput.value) || 0;
                
                // Algoritmos empíricos sustentáveis baseados em dados médios
                const litrosPoupados = hectares * 12500; 
                const reducaoDeriva = Math.floor(hectares * 1.5) + 2;

                txtAgua.innerText = litrosPoupados.toLocaleString("pt-BR") + " Litros";
                txtDeriva.innerText = reducaoDeriva + " Vezes";

                boxResultado.classList.remove("resultado-oculto");
            }
        });
    }
}

/* ==========================================================================
   MÓDULO 4: QUIZ TÉCNICO PEDAGÓGICO
   ========================================================================== */
const bancoQuestoes = [
    {
        pergunta: "De acordo com os dados oficiais da Embrapa Territorial, qual a porcentagem de vegetação nativa mantida e preservada de forma privada pelos próprios produtores rurais?",
        opcoes: ["A) Cerca de 33% do território brasileiro", "B) Menos de 10% do território nacional"],
        correta: 0
    },
    {
        pergunta: "A agricultura irrigada regulada representa grande parte do consumo consuntivo de água doce no Brasil (dados da ANA). Qual tecnologia reduz esse impacto?",
        opcoes: ["A) Uso de sensores de umidade associados ao EcoRadar", "B) Ampliação dos turnos de irrigação contínua"],
        correta: 0
    },
    {
        pergunta: "Qual o principal perigo de realizar pulverizações com ventos em velocidades excessivas?",
        opcoes: ["A) Aceleração do crescimento das plantas", "B) Fenômeno da deriva, espalhando químicos em áreas de preservação"],
        correta: 1
    },
    {
        pergunta: "Qual o lema central de desenvolvimento do Programa Agrinho para o ano de 2026?",
        opcoes: ["A) Produção em Massa a Qualquer Custo", "B) Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"],
        correta: 1
    }
];

let indiceQuiz = 0;

function inicializarQuiz() {
    renderizarQuestao();
    
    const btnProxima = document.getElementById("btn-proxima");
    if(btnProxima) {
        btnProxima.addEventListener("click", function() {
            indiceQuiz++;
            if(indiceQuiz < bancoQuestoes.length) {
                renderizarQuestao();
                document.getElementById("resultado-quiz").innerText = "";
                btnProxima.classList.add("avancar-oculto");
            } else {
                document.getElementById("status-pergunta").innerText = "Quiz Concluído!";
                document.getElementById("pergunta-quiz").innerText = "Parabéns por exercitar o conhecimento técnico sobre o agro sustentável!";
                document.getElementById("btn-opcao-a").style.display = "none";
                document.getElementById("btn-opcao-b").style.display = "none";
                btnProxima.style.display = "none";
            }
        });
    }
}

function renderizarQuestao() {
    const status = document.getElementById("status-pergunta");
    const containerPergunta = document.getElementById("pergunta-quiz");
    const optA = document.getElementById("btn-opcao-a");
    const optB = document.getElementById("btn-opcao-b");

    if (containerPergunta && optA && optB) {
        status.innerText = `Pergunta ${indiceQuiz + 1} de ${bancoQuestoes.length}`;
        containerPergunta.innerText = bancoQuestoes[indiceQuiz].pergunta;
        optA.innerText = bancoQuestoes[indiceQuiz].opcoes[0];
        optB.innerText = bancoQuestoes[indiceQuiz].opcoes[1];
        
        // Remove listeners antigos redefinindo os clones dos nós
        optA.onclick = () => analisarEscolha(0);
        optB.onclick = () => analisarEscolha(1);
    }
}

function analisarEscolha(opcaoSelecionada) {
    const feedback = document.getElementById("resultado-quiz");
    const btnProxima = document.getElementById("btn-proxima");
    const correta = bancoQuestoes[indiceQuiz].correta;

    if (opcaoSelecionada === correta) {
        feedback.innerText = "🟢 Resposta Correta! Excelente domínio técnico.";
        feedback.style.color = "#81c784";
    } else {
        feedback.innerText = "❌ Resposta Incorreta. Revise as diretrizes da Embrapa e tente novamente!";
        feedback.style.color = "#e53935";
    }
    if(btnProxima) btnProxima.classList.remove("avancar-oculto");
}

/* ==========================================================================
   MÓDULO 5: CONTROLE DO PAINEL DE SIMULAÇÃO DE DECISÃO
   ========================================================================== */
function inicializarSimuladorClima() {
    const forte = document.getElementById("btn-simular-forte");
    const seco = document.getElementById("btn-simular-seco");
    const instavel = document.getElementById("btn-simular-instavel");

    if (forte) forte.addEventListener("click", () => aplicarLogicaClimatica(25, 85));
    if (seco) seco.addEventListener("click", () => aplicarLogicaClimatica(8, 10));
    if (instavel) instavel.addEventListener("click", () => aplicarLogicaClimatica(14, 45));
}

function aplicarLogicaClimatica(velocidadeVento, proximidadeChuva) {
    const luzPulverizacao = document.getElementById("luz-pulverizacao");
    const textoPulverizacao = document.getElementById("texto-pulverizacao");
    const luzIrrigacao = document.getElementById("luz-irrigacao");
    const textoIrrigacao = document.getElementById("texto-irrigacao");

    // Lógica para Pulverização baseada em Ventos (Zonas Críticas)
    if (velocidadeVento > 20) {
        luzPulverizacao.className = "status-luz vermelha";
        textoPulverizacao.innerText = `⚠️ Proibido pulverizar (Vento forte: ${velocidadeVento} km/h). Risco extremo de deriva química externa.`;
    } else {
        luzPulverizacao.className = "status-luz verde";
        textoPulverizacao.innerText = `✅ Condições ótimas para a pulverização (${velocidadeVento} km/h). Insumo fixado de forma segura.`;
    }

    // Lógica para Irrigação baseada em Nuvem e frentes de Precipitação
    if (proximidadeChuva > 70) {
        luzIrrigacao.className = "status-luz vermelha";
        textoIrrigacao.innerText = `⚠️ Irrigação pausada. Probabilidade de chuva em ${proximidadeChuva}%. Economizando recursos hídricos e energia.`;
    } else if (proximidadeChuva < 20) {
        luzIrrigacao.className = "status-luz verde";
        textoIrrigacao.innerText = `✅ Solo necessitando hidratação. Sem previsões de chuvas imediatas (${proximidadeChuva}%). Irrigação liberada.`;
    } else {
        luzIrrigacao.className = "status-luz cinza";
        textoIrrigacao.innerText = `Instável. Monitore as atualizações de nuvens no Radar regional antes de ligar as bombas de água.`;
    }
}