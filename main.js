/**
 * EcoRadar Agro - Sistema Base 2026
 * Código JavaScript Vanilla nativo sem dependências externas.
 */

document.addEventListener("DOMContentLoaded", function () {
    configurarSistemaAcessibilidade();
    configurarSimuladorCampo();
    configurarCalculadoraCarbono();
    configurarModuloQuiz();
});

/* ==========================================================================
   MÓDULO 1: ACESSIBILIDADE COMPLETA (OUVIR SITE / AUDIO E CONTROLE COGNITIVO)
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

    // 1. RECURSO RETORNADO: Ouvir Site (Sintetizador de Voz Nativo Web Speech API)
    let sintetizando = false;
    if (btnOuvir) {
        btnOuvir.addEventListener("click", function () {
            if (!sintetizando) {
                // Captura todo o texto relevante do container principal
                const textoParaLer = document.getElementById("conteudo-principal").innerText;
                const ruidoclean = textoParaLer.replace(/\$/g, ""); // limpa sintaxe LaTeX para leitura limpa
                
                window.speechSynthesis.cancel(); // Reseta instâncias anteriores
                const fala = new SpeechSynthesisUtterance(ruidoclean);
                fala.lang = "pt-BR";
                fala.rate = 1.0;
                
                fala.onend = function () {
                    sintetizando = false;
                    btnOuvir.innerText = "🔊 Ouvir Site (Texto-Voz)";
                };

                window.speechSynthesis.speak(fala);
                sintetizando = true;
                btnOuvir.innerText = "🛑 Parar Leitura de Áudio";
            } else {
                window.speechSynthesis.cancel();
                sintetizando = false;
                btnOuvir.innerText = "🔊 Ouvir Site (Texto-Voz)";
            }
        });
    }

    // 2. Alternador de Alto Contraste
    if (btnContraste) {
        btnContraste.addEventListener("click", function () {
            document.body.classList.toggle("alto-contraste");
            const ativo = document.body.classList.contains("alto-contraste");
            btnContraste.setAttribute("aria-pressed", ativo);
        });
    }

    // 3. Tamanho de Fonte Incremental
    let estagioFonte = 0;
    if (btnFonte) {
        btnFonte.addEventListener("click", function () {
            estagioFonte = (estagioFonte + 1) % 3;
            if (estagioFonte === 0) {
                document.documentElement.style.setProperty('--tamanho-fonte-base', '16px');
                btnFonte.innerText = "🔎 Ampliar Texto do Site";
            } else if (estagioFonte === 1) {
                document.documentElement.style.setProperty('--tamanho-fonte-base', '19px');
                btnFonte.innerText = "🔎 Letra: [Tamanho Grande]";
            } else {
                document.documentElement.style.setProperty('--tamanho-fonte-base', '22px');
                btnFonte.innerText = "🔎 Letra: [Tamanho Máximo]";
            }
        });
    }

    // 4. Controle de Espaçamento e Altura de Linhas
    let espacamentoAtivo = false;
    if (btnEspacamento) {
        btnEspacamento.addEventListener("click", function () {
            espacamentoAtivo = !espacamentoAtivo;
            if (espacamentoAtivo) {
                document.documentElement.style.setProperty('--espacamento-texto-base', '2px');
                document.documentElement.style.setProperty('--altura-linha-base', '2.0');
                btnEspacamento.innerText = "↔️ Espaçamento: Ampliado";
            } else {
                document.documentElement.style.setProperty('--espacamento-texto-base', 'normal');
                document.documentElement.style.setProperty('--altura-linha-base', '1.6');
                btnEspacamento.innerText = "↔️ Espaçamento Adaptativo";
            }
        });
    }

    // 5. Tipografia Adaptada para Dislexia
    if (btnDislexia) {
        btnDislexia.addEventListener("click", function () {
            document.body.classList.toggle("fonte-dislexia");
            const ativo = document.body.classList.contains("fonte-dislexia");
            btnDislexia.innerText = ativo ? "📖 Fonte: Dislexia Ativa" : "📖 Fonte Amigável Dislexia";
        });
    }

    // 6. Ajuste de Saturação (Monocromático Corrigido)
    if (btnSaturacao) {
        btnSaturacao.addEventListener("click", function () {
            document.body.classList.toggle("modo-monocromatico");
            const ativo = document.body.classList.contains("modo-monocromatico");
            btnSaturacao.innerText = ativo ? "🎨 Modo Saturação: P&B" : "🎨 Remover Saturação (P&B)";
        });
    }
}

/* ==========================================================================
   MÓDULO 2: CONTROLADORES INTERATIVOS - SIMULADOR DO PRODUTOR
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
        campoUmidade.innerText = "17%";
        campoVento.innerText = "6 km/h";
        campoStatus.innerText = "SISTEMA DE IRRIGAÇÃO LIBERADO";
        campoStatus.className = "status-alerta";
        
        feedbackUmidade.innerText = "Status: Solo em estado de estresse hídrico agudo.";
        feedbackVento.innerText = "Status: Ventos estáveis sob níveis seguros.";
        feedbackRecomendacao.innerText = "Recomendação Técnica: Acionar os microaspersores ou pivôs centrais imediatamente. A evapotranspiração está alta e o solo requer reposição volumétrica urgente para evitar a perda da plantação.";
    });

    disparadorChuva.addEventListener("click", function () {
        campoUmidade.innerText = "94%";
        campoVento.innerText = "16 km/h";
        campoStatus.innerText = "BLOQUEIO PREVENTIVO DE IRRIGAÇÃO";
        campoStatus.className = "status-alerta alerta-ativo";
        
        feedbackUmidade.innerText = "Status: Solo saturado por precipitação pluviométrica.";
        feedbackVento.innerText = "Status: Correntes de ar úmidas detectadas.";
        feedbackRecomendacao.innerText = "Recomendação Técnica: Sensores automáticos integrados preveem tempestade severa nas coordenadas próximas. Sistemas de irrigação bloqueados para poupar água doce, gastos elétricos e evitar a lixiviação (lavagem) de nutrientes.";
    });

    disparadorVento.addEventListener("click", function () {
        campoUmidade.innerText = "42%";
        campoVento.innerText = "34 km/h";
        campoStatus.innerText = "RISCO CRÍTICO: ALERTA DE DERIVA";
        campoStatus.className = "status-alerta alerta-ativo";
        
        feedbackUmidade.innerText = "Status: Níveis hídricos de solo moderados.";
        feedbackVento.innerText = "Status: Rajadas contínuas de vento de alta velocidade.";
        feedbackRecomendacao.innerText = "Recomendação Técnica: Suspensão obrigatória imediata de pulverizações de defensivos agrícolas ou insumos biológicos. Ventos acima de 20 km/h dispersam o produto para fora da lavoura alvo, contaminando rios locais e destruindo abelhas polinizadoras.";
    });
}

/* ==========================================================================
   MÓDULO 3: RETORNADO - CÁLCULOS DA CALCULADORA DE CARBONO FLORESTAL
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

            let fatorSequestro = 0;
            if (bioma === "mata-atlantica") fatorSequestro = 8.5;
            else if (bioma === "cerrado") fatorSequestro = 4.2;
            else if (bioma === "floresta-tropical") fatorSequestro = 12.0;

            // Equações Matemáticas Ecológicas
            const toneladasCO2 = hectares * FatorSequestro;
            const creditosGerados = toneladasCO2; // 1 Crédito = 1 tonelada de CO2 evitada
            const valorFinanceiro = creditosGerados * 75.50; // Estimativa de preço médio de mercado por crédito em Reais

            // Atualização no DOM
            document.getElementById("res-toneladas").innerText = toneladasCO2.toFixed(2);
            document.getElementById("res-creditos").innerText = creditosGerados.toFixed(2);
            document.getElementById("res-financeiro").innerText = valorFinanceiro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        });
    }
}

/* ==========================================================================
   MÓDULO 4: QUIZ DE VALIDAÇÃO CIENTÍFICA DO AGRINHO
   ========================================================================== */
const bancoQuestoes = [
    {
        pergunta: "Qual a porcentagem de mata nativa conservada voluntariamente dentro de propriedades agrícolas privadas no Brasil?",
        opcoes: ["A) Cerca de 33% do território (Dados Embrapa Territorial)", "B) Menos de 5% de toda a área nacional mapeada"],
        correta: 0
    },
    {
        pergunta: "O que ocorre se um produtor rural realizar pulverizações com velocidades de vento superiores a 20 km/h?",
        opcoes: ["A) O defensivo é fixado com maior aderência nas folhas", "B) Ocorre a deriva ecológica, espalhando defensivos em áreas vizinhas e matas"],
        correta: 1
    },
    {
        pergunta: "Qual o impacto real do uso de dados de telemetria meteorológica nos sistemas de irrigação modernos?",
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
                document.getElementById("resultado-quiz").innerText = "";
                btnProxima.classList.add("avancar-oculto");
            } else {
                document.getElementById("status-pergunta").innerText = "Simulação Técnica Concluída!";
                document.getElementById("pergunta-quiz").innerText = "Parabéns! Você concluiu a validação científica de dados exigida pelas diretrizes do Concurso Agrinho 2026.";
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
        statusTxt.innerText = `Pergunta ${indiceQuestaoAtual + 1} de ${bancoQuestoes.length}`;
        perguntaTxt.innerText = bancoQuestoes[indiceQuestaoAtual].pergunta;
        botaoA.innerText = bancoQuestoes[indiceQuestaoAtual].opcoes[0];
        botaoB.innerText = bancoQuestoes[indiceQuestaoAtual].opcoes[1];

        botaoA.onclick = () => verificarRespostaSelecionada(0);
        botaoB.onclick = () => verificarRespostaSelecionada(1);
    }
}

function verificarRespostaSelecionada(respostaUsuario) {
    const feedbackCampo = document.getElementById("resultado-quiz");
    const btnAvancar = document.getElementById("btn-proxima");
    
    if (respostaUsuario === bancoQuestoes[indiceQuestaoAtual].correta) {
        feedbackCampo.innerText = "🟢 Resposta Correta! Validação técnica e empírica confirmada.";
        feedbackCampo.style.color = "#81c784";
    } else {
        feedbackCampo.innerText = "❌ Alternativa Incorreta. Os relatórios oficiais contradizem essa opção.";
        feedbackCampo.style.color = "#e53935";
    }
    
    if (btnAvancar) btnAvancar.classList.remove("avancar-oculto");
}