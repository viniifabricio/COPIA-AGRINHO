/**
 * EcoRadar Agro - Sistema Base 2026
 * Código JavaScript Vanilla nativo sem dependências externas.
 */

document.addEventListener("DOMContentLoaded", function () {
    configurarSistemaAcessibilidade();
    configurarSimuladorCampo();
    configurarCalculadoraCarbono();
    configurarModuloQuiz();
    inicializarWidgetVLibras(); // Inicialização externa corrigida e movida para cá
});

/* ==========================================================================
   INICIALIZADOR DO PLUGIN DE ACESSIBILIDADE GOVERNAMENTAL VLIBRAS
   ========================================================================== */
function inicializarWidgetVLibras() {
    try {
        if (window.VLibras) {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        } else {
            // Tenta carregar novamente em caso de atraso na resposta do servidor federal
            window.addEventListener('load', function() {
                if (window.VLibras) {
                    new window.VLibras.Widget('https://vlibras.gov.br/app');
                }
            });
        }
    } catch (erro) {
        console.warn("Aviso de Acessibilidade: Ocorreu um atraso na conexão com o servidor do VLibras.", erro);
    }
}

/* ==========================================================================
   MÓDULO 1: ACESSIBILIDADE COMPLETA (PERSISTÊNCIA LOCALSTORAGE CORRIGIDA)
   ========================================================================== */
function configurarSistemaAcessibilidade() {
    const btnFlutuante = document.getElementById("btn-abrir-acessibilidade");
    const menuBox = document.getElementById("menu-acessibilidade");
    
    const btnOuvir = document.getElementById("btn-ouvir-site");
    const btnContraste = document.getElementById("btn-contraste");
    const btnFonte = document.getElementById("btn-fonte");
    const btnEspacamento = document.getElementById("btn-espacamento");
    const btnDislexia = document.getElementById("btn-dislexia");
    const btnSaturacao = document.getElementById("btn-saturacao");

    // CARREGAR E REAPLICAR ESTADOS PREVIOS SALVOS NO NAVEGADOR (LOCALSTORAGE)
    if (localStorage.getItem("pref-alto-contraste") === "ativo") {
        document.body.classList.add("alto-contraste");
        if (btnContraste) btnContraste.setAttribute("aria-pressed", "true");
    }

    if (localStorage.getItem("pref-fonte-dislexia") === "ativo") {
        document.body.classList.add("fonte-dislexia");
        if (btnDislexia) btnDislexia.innerText = "📖 Fonte: Dislexia Ativa";
    }

    if (localStorage.getItem("pref-modo-monocromatico") === "ativo") {
        document.body.classList.add("modo-monocromatico");
        if (btnSaturacao) btnSaturacao.innerText = "🎨 Modo Saturação: P&B";
    }

    let estagioFonte = parseInt(localStorage.getItem("pref-estagio-fonte") || "0");
    aplicarEstagioFonte(estagioFonte, btnFonte);

    let espacamentoAtivo = localStorage.getItem("pref-espacamento-ativo") === "true";
    aplicarEspacamentoAdaptativo(espacamentoAtivo, btnEspacamento);

    // Gerenciador do Menu Toggle Flutuante
    if (btnFlutuante && menuBox) {
        btnFlutuante.addEventListener("click", function (evento) {
            evento.stopPropagation();
            menuBox.classList.toggle("acessibilidade-escondido");
            const estaVisivel = !menuBox.classList.contains("acessibilidade-escondido");
            btnFlutuante.setAttribute("aria-expanded", estaVisivel);
        });

        document.addEventListener("click", function () {
            menuBox.classList.add("acessibilidade-escondido");
            btnFlutuante.setAttribute("aria-expanded", false);
        });

        menuBox.addEventListener("click", function (evento) {
            evento.stopPropagation();
        });
    }

    // 1. RECURSO: Ouvir Site (Sintetizador de Voz Nativo com Verificação de Erro)
    let sintetizando = false;
    if (btnOuvir) {
        btnOuvir.addEventListener("click", function () {
            if (!("speechSynthesis" in window)) {
                alert("O seu navegador atual não oferece suporte para a ferramenta de leitura de tela em áudio.");
                return;
            }

            if (!sintetizando) {
                const textoParaLer = document.getElementById("conteudo-principal").textContent;
                window.speechSynthesis.cancel(); 
                
                const fala = new SpeechSynthesisUtterance(textoParaLer);
                fala.lang = "pt-BR";
                fala.rate = 1.0;
                
                fala.onend = function () {
                    sintetizando = false;
                    btnOuvir.textContent = "🔊 Ouvir Site (Texto-Voz)";
                };

                window.speechSynthesis.speak(fala);
                sintetizando = true;
                btnOuvir.textContent = "🛑 Parar Leitura de Áudio";
            } else {
                window.speechSynthesis.cancel();
                sintetizando = false;
                btnOuvir.textContent = "🔊 Ouvir Site (Texto-Voz)";
            }
        });
    }

    // 2. Alternador de Alto Contraste (Com Salvamento)
    if (btnContraste) {
        btnContraste.addEventListener("click", function () {
            document.body.classList.toggle("alto-contraste");
            const ativo = document.body.classList.contains("alto-contraste");
            btnContraste.setAttribute("aria-pressed", ativo);
            localStorage.setItem("pref-alto-contraste", ativo ? "ativo" : "inativo");
        });
    }

    // 3. Tamanho de Fonte Incremental (Com Salvamento)
    if (btnFonte) {
        btnFonte.addEventListener("click", function () {
            estagioFonte = (estagioFonte + 1) % 3;
            localStorage.setItem("pref-estagio-fonte", estagioFonte.toString());
            aplicarEstagioFonte(estagioFonte, btnFonte);
        });
    }

    // 4. Controle de Espaçamento e Altura de Linhas (Com Salvamento)
    if (btnEspacamento) {
        btnEspacamento.addEventListener("click", function () {
            espacamentoAtivo = !espacamentoAtivo;
            localStorage.setItem("pref-espacamento-ativo", espacamentoAtivo.toString());
            aplicarEspacamentoAdaptativo(espacamentoAtivo, btnEspacamento);
        });
    }

    // 5. Tipografia Adaptada para Dislexia (Com Salvamento)
    if (btnDislexia) {
        btnDislexia.addEventListener("click", function () {
            document.body.classList.toggle("fonte-dislexia");
            const ativo = document.body.classList.contains("fonte-dislexia");
            btnDislexia.textContent = ativo ? "📖 Fonte: Dislexia Ativa" : "📖 Fonte Amigável Dislexia";
            localStorage.setItem("pref-fonte-dislexia", ativo ? "ativo" : "inativo");
        });
    }

    // 6. Ajuste de Saturação (Com Salvamento)
    if (btnSaturacao) {
        btnSaturacao.addEventListener("click", function () {
            document.body.classList.toggle("modo-monocromatico");
            const ativo = document.body.classList.contains("modo-monocromatico");
            btnSaturacao.textContent = ativo ? "🎨 Modo Saturação: P&B" : "🎨 Remover Saturação (P&B)";
            localStorage.setItem("pref-modo-monocromatico", ativo ? "ativo" : "inativo");
        });
    }
}

// Funções de Apoio de Escopo Global para Reaplicação do localStorage
function aplicarEstagioFonte(estagio, botaoElemento) {
    if (!botaoElemento) return;
    if (estagio === 0) {
        document.documentElement.style.setProperty('--tamanho-fonte-base', '16px');
        botaoElemento.textContent = "🔎 Ampliar Texto do Site";
    } else if (estagio === 1) {
        document.documentElement.style.setProperty('--tamanho-fonte-base', '19px');
        botaoElemento.textContent = "🔎 Letra: [Tamanho Grande]";
    } else {
        document.documentElement.style.setProperty('--tamanho-fonte-base', '22px');
        botaoElemento.textContent = "🔎 Letra: [Tamanho Máximo]";
    }
}

function aplicarEspacamentoAdaptativo(ativo, botaoElemento) {
    if (!botaoElemento) return;
    if (ativo) {
        document.documentElement.style.setProperty('--espacamento-texto-base', '2px');
        document.documentElement.style.setProperty('--altura-linha-base', '2.0');
        botaoElemento.textContent = "↔️ Espaçamento: Ampliado";
    } else {
        document.documentElement.style.setProperty('--espacamento-texto-base', 'normal');
        document.documentElement.style.setProperty('--altura-linha-base', '1.6');
        botaoElemento.textContent = "↔️ Espaçamento Adaptativo";
    }
}

/* ==========================================================================
   MÓDULO 2: CONTROLADORES INTERATIVOS - SIMULADOR DO PRODUTOR (TEXTO HUMANIZADO)
   ========================================================================== */
function configurarSimuladorCampo() {
    const disparadorSol = document.getElementById("simular-sol");
    const disparadorChuva = document.getElementById("simular-chuva");
    const disparadorVento = document.getElementById("simular-vento");

    const campoUmidade = document.getElementById("val-umidade");
    const campoVento = document.getElementById("val-vento");
    const campoStatus = document.getElementById("val-status");

    const feedbackUmidade = document.getElementById("msg-umidade");
    const feedbackVento = document.getElementById("msg-vento");
    const feedbackRecomendacao = document.getElementById("msg-recomendacao");

    if (!disparadorSol) return;

    disparadorSol.addEventListener("click", function () {
        campoUmidade.textContent = "17%";
        campoVento.textContent = "6 km/h";
        campoStatus.textContent = "SISTEMA DE IRRIGAÇÃO LIBERADO";
        campoStatus.className = "status-alerta";
        
        feedbackUmidade.textContent = "Status: O solo está muito seco e precisa de água.";
        feedbackVento.textContent = "Status: Ventos fracos e em velocidade segura.";
        feedbackRecomendacao.textContent = "Orientação: Ligar os sistemas de irrigação o quanto antes. O calor está alto e as plantas precisam de água para não prejudicar a lavoura.";
    });

    disparadorChuva.addEventListener("click", function () {
        campoUmidade.textContent = "94%";
        campoVento.textContent = "16 km/h";
        campoStatus.textContent = "DESLIGAMENTO PREVENTIVO DA IRRIGAÇÃO";
        campoStatus.className = "status-alerta alerta-ativo";
        
        feedbackUmidade.textContent = "Status: Solo completamente molhado pela chuva.";
        feedbackVento.textContent = "Status: Ventos úmidos na propriedade.";
        feedbackRecomendacao.textContent = "Orientação: O sistema identificou chuva forte chegando. Os irrigadores foram desligados automaticamente para economizar água, poupar energia elétrica e evitar que os nutrientes da terra sejam lavados.";
    });

    disparadorVento.addEventListener("click", function () {
        campoUmidade.textContent = "42%";
        campoVento.textContent = "34 km/h";
        campoStatus.textContent = "RISCO CRÍTICO: ALERTA DE VENTO FORTE";
        campoStatus.className = "status-alerta alerta-ativo";
        
        feedbackUmidade.textContent = "Status: Solo com umidade moderada.";
        feedbackVento.textContent = "Status: Rajadas fortes de vento na plantação.";
        feedbackRecomendacao.textContent = "Orientação: Não aplicar nenhum tipo de produto na lavoura agora. O vento forte vai arrastar o produto para fora do alvo, desperdiçando dinheiro, poluindo rios próximos e prejudicando insetos polinizadores importantes, como as abelhas.";
    });
}

/* ==========================================================================
   MÓDULO 3: CÁLCULOS DA CALCULADORA DE CARBONO FLORESTAL
   ========================================================================== */
function configurarCalculadoraCarbono() {
    const btnCalcular = document.getElementById("btn-calcular-carbono");
    
    if (btnCalcular) {
        btnCalcular.addEventListener("click", function() {
            const hectares = parseFloat(document.getElementById("calc-hectares").value);
            const bioma = document.getElementById("calc-bioma").value;
            
            if (isNaN(hectares) || hectares <= 0) {
                alert("Por favor, insira uma quantidade válida de hectares preservados.");
                return;
            }

            let falarSequestro = 0;
            if (bioma === "mata-atlantica") {
                falarSequestro = 8.5;
            } else if (bioma === "cerrado") {
                falarSequestro = 4.2;
            } else if (bioma === "floresta-tropical") {
                falarSequestro = 12.0;
            }

            const toneladasCO2 = hectares * falarSequestro;
            const creditosGerados = toneladasCO2; 
            const valorFinanceiro = creditosGerados * 75.50; 

            document.getElementById("res-toneladas").textContent = toneladasCO2.toFixed(2);
            document.getElementById("res-creditos").textContent = creditosGerados.toFixed(2);
            document.getElementById("res-financeiro").textContent = valorFinanceiro.toLocaleString('pt-BR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });
        });
    }
}

/* ==========================================================================
   MÓDULO 4: QUIZ DE VALIDAÇÃO CIENTÍFICA DO AGRINHO (PADRONIZADO)
   ========================================================================== */
const bancoQuestoes = [
    {
        pergunta: "Qual a porcentagem de mata nativa conservada voluntariamente dentro de propriedades agrícolas privadas no Brasil?",
        opcoes: ["A) Cerca de 33% do território (Dados Embrapa Territorial)", "B) Menos de 5% de toda a área nacional mapeada"],
        correta: 0
    },
    {
        pergunta: "O que ocorre se um produtor rural realizar pulverizações com velocidades de vento superiores a 20 km/h?",
        opcoes: ["A) O defensivo é fixado com maior aderência nas folhas", "B) Ocorre o desperdício do produto, que é arrastado para fora do alvo pelo vento"],
        correta: 1
    },
    {
        pergunta: "Qual o impacto real do uso de dados de monitoramento do clima nos sistemas de irrigação modernos?",
        opcoes: ["A) Reduz em até 30% o desperdício de água doce ao evitar irrigações desnecessárias", "B) Causa a aceleração artificial do ciclo biológico natural das plantas"],
        correta: 0
    }
];

let indiceQuestaoAtual = 0;

function configurarModuloQuiz() {
    exibirQuestaoAtual();
    const btnProxima = document.getElementById("btn-proxima");
    
    if (btnProxima) {
        btnProxima.addEventListener("click", function () {
            indiceQuestaoAtual++;
            if (indiceQuestaoAtual < bancoQuestoes.length) {
                exibirQuestaoAtual();
                document.getElementById("resultado-quiz").textContent = "";
                btnProxima.classList.add("avancar-oculto");
            } else {
                document.getElementById("status-pergunta").textContent = "Simulação Técnica Concluída!";
                document.getElementById("pergunta-quiz").textContent = "Parabéns! Você concluiu a validação científica de dados exigida pelas diretrizes do Concurso Agrinho 2026.";
                document.getElementById("btn-opcao-a").style.display = "none";
                document.getElementById("btn-opcao-b").style.display = "none";
                btnProxima.style.display = "none";
            }
        });
    }
}

function exibirQuestaoAtual() {
    const statusTxt = document.getElementById("status-pergunta");
    const perguntaTxt = document.getElementById("pergunta-quiz");
    const botaoA = document.getElementById("btn-opcao-a");
    const botaoB = document.getElementById("btn-opcao-b");

    if (perguntaTxt && botaoA) {
        statusTxt.textContent = `Pergunta ${indiceQuestaoAtual + 1} de ${bancoQuestoes.length}`;
        perguntaTxt.textContent = bancoQuestoes[indiceQuestaoAtual].pergunta;
        botaoA.textContent = bancoQuestoes[indiceQuestaoAtual].opcoes[0];
        botaoB.textContent = bancoQuestoes[indiceQuestaoAtual].opcoes[1];

        // PADRONIZAÇÃO DE ESCUTA DE EVENTOS COM ADDEVENTLISTENER PARA EVITAR CONFLITOS DE CLIQUE
        botaoA.replaceWith(botaoA.cloneNode(true));
        botaoB.replaceWith(botaoB.cloneNode(true));

        const novoBotaoA = document.getElementById("btn-opcao-a");
        const novoBotaoB = document.getElementById("btn-opcao-b");

        novoBotaoA.addEventListener("click", () => verificarRespostaSelecionada(0));
        novoBotaoB.addEventListener("click", () => verificarRespostaSelecionada(1));
    }
}

function verificarRespostaSelecionada(respostaUsuario) {
    const feedbackCampo = document.getElementById("resultado-quiz");
    const btnAvancar = document.getElementById("btn-proxima");
    
    if (respostaUsuario === bancoQuestoes[indiceQuestaoAtual].correta) {
        feedbackCampo.textContent = "🟢 Resposta Correta! Validação técnica e prática confirmada.";
        feedbackCampo.style.color = "#81c784";
    } else {
        feedbackCampo.textContent = "❌ Alternativa Incorreta. Os relatórios oficiais do setor dizem o contrário.";
        feedbackCampo.style.color = "#e53935";
    }
    
    if (btnAvancar) btnAvancar.classList.remove("avancar-oculto");
}