document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // CONFIGURAÇÕES E MEMÓRIA DE ACESSIBILIDADE (LOCALSTORAGE)
    // ==========================================================================
    const configuracoesAcessibilidade = [
        { idBotao: 'btn-contraste', classeCSS: 'alto-contraste' },
        { idBotao: 'btn-fonte', classeCSS: 'fonte-grande' },
        { idBotao: 'btn-espacamento', classeCSS: 'espacado' },
        { idBotao: 'btn-dislexia', classeCSS: 'fonte-dislexia' },
        { idBotao: 'btn-saturacao', classeCSS: 'escala-cinza' }
    ];

    // Carrega as configurações salvas antes de carregar o visual completo
    configuracoesAcessibilidade.forEach(item => {
        const estadoSalvo = localStorage.getItem(item.classeCSS) === 'true';
        if (estadoSalvo) {
            if (item.classeCSS === 'escala-cinza') {
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

    if (valUmidade && valVento && valStatus) {
        document.getElementById('simular-sol')?.addEventListener('click', () => {
            valUmidade.innerText = '22%';
            valVento.innerText = '8 km/h';
            valStatus.innerText = 'ALERTA: PRECISANDO LIGAR A IRRIGAÇÃO';
            valStatus.style.color = '#d90429'; 
            msgUmidade.innerText = 'Status: A terra está muito seca.';
            msgVento.innerText = 'Status: O vento está calmo, bom para irrigar.';
            msgRecomendacao.innerText = 'Recomendação: Ligue os pivôs de irrigação para dar água para as plantas.';
        });

        document.getElementById('simular-chuva')?.addEventListener('click', () => {
            valUmidade.innerText = '85%';
            valVento.innerText = '15 km/h';
            valStatus.innerText = 'SISTEMA DESLIGADO - JÁ ESTÁ CHOVENDO';
            valStatus.style.color = '#2d6a4f'; 
            msgUmidade.innerText = 'Status: A terra já recebeu bastante água da chuva.';
            msgVento.innerText = 'Status: Vento moderado.';
            msgRecomendacao.innerText = 'Recomendação: O sistema desliga a irrigação sozinho para economizar água e energia.';
        });

        document.getElementById('simular-vento')?.addEventListener('click', () => {
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
    document.getElementById('btn-calcular-carbono')?.addEventListener('click', () => {
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

        const resToneladas = document.getElementById('res-toneladas');
        if (resToneladas) {
            resToneladas.innerText = toneladasAnuais.toFixed(2);
            document.getElementById('res-creditos').innerText = creditosGerados.toFixed(2);
            document.getElementById('res-financeiro').innerText = valorFinanceiro.toFixed(2);
        }
    });

    // ==========================================================================
    // 3. LÓGICA DO QUIZ INTERATIVO (LINGUAGEM ACESSÍVEL)
    // ==========================================================================
    const questoes = [
        {
            pergunta: "Segundo os dados oficiais do Brasil, qual é o setor que mais gasta água doce no nosso país?",
            a: "O uso nas casas e o abastecimento das grandes cidades.",
            b: "A irrigação de lavouras e plantações na agricultura.",
            resposta: "b",
            explicacao: "Isso mesmo! A irrigação gasta bastante água. Por isso, usar tecnologia para monitorar ajuda a economizar até 30% desse consumo."
        },
        {
            pergunta: "Por que não é recomendado passar produtos na lavoura quando o vento está muito forte (acima de 28 km/h)?",
            a: "Because o vento forte espalha o produto para fora da lavoura, contaminando a vizinhança e desperdiçando dinheiro.",
            b: "Porque o produto evapora no ar antes de tocar as folhas por causa do calor do vento.",
            resposta: "a",
            explicacao: "Perfeito! Esse problema se chama deriva. O vento leva o produto para onde não devia, prejudicando a natureza e o bolso do produtor."
        },
        {
            pergunta: "De acordo com as pesquisas da Embrapa, quanto do território do Brasil é preservado de forma voluntária pelos próprios produtores rurais?",
            a: "Apenas uma parte bem pequena, perto de 10% do país.",
            b: "Uma grande parte, correspondente a cerca de 33% (um terço) do país.",
            resposta: "b",
            explicacao: "Você acertou! Os produtores rurais cuidam de um terço das florestas nativas do Brasil dentro de suas propriedades."
        },
        {
            pergunta: "Qual é a maior vantagem de usar sensores que medem a umidade da terra direto no celular?",
            a: "Saber a hora exata de irrigar, evitando gastar água e energia elétrica à toa.",
            b: "Mudar o clima da região para fazer chover mais vezes no mês.",
            resposta: "a",
            explicacao: "Exatamente! Irrigar sabendo o quanto a terra precisa economiza muita água e reduz o valor da conta de energia."
        },
        {
            pergunta: "Pensando no mercado de créditos de carbono, que tipo de floresta consegue limpar o ar mais rápido?",
            a: "Florestas comerciais novas que estão crescendo rápido (como plantações de eucalipto).",
            b: "Vegetações rasteiras e pequenas como as árvores baixas do Cerrado.",
            resposta: "a",
            explicacao: "Correto! Árvores que estão crescendo rápido fazem mais fotossíntese e conseguem puxar e guardar mais gás carbono na sua madeira."
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
        if (blocoOpcoes) blocoOpcoes.style.display = 'flex'; 
        if (btnA) { btnA.disabled = false; btnB.disabled = false; }

        if (perguntaAtual < questoes.length) {
            statusPerg.innerText = `Pergunta ${perguntaAtual + 1} de ${questoes.length}`;
            txtPergunta.innerText = questoes[perguntaAtual].pergunta;
            btnA.innerText = "A) " + questoes[perguntaAtual].a;
            btnB.innerText = "B) " + questoes[perguntaAtual].b;
        } else {
            statusPerg.innerText = "Quiz Concluído! 🎉";
            txtPergunta.innerText = `Você terminou o teste técnico! Você acertou ${pontuacao} de um total de ${questoes.length} perguntas.`;
            if (blocoOpcoes) blocoOpcoes.style.display = 'none'; 
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
    // 4. MENU DE ACESSIBILIDADE FLUTUANTE & SÍNTESE DE VOZ
    // ==========================================================================
    const btnAbrirMenu = document.getElementById('btn-abrir-acessibilidade');
    const menuAcessivel = document.getElementById('menu-acessibilidade');

    if (btnAbrirMenu && menuAcessivel) {
        btnAbrirMenu.addEventListener('click', () => {
            const escondido = menuAcessivel.classList.toggle('acessibilidade-escondido');
            btnAbrirMenu.setAttribute('aria-expanded', !escondido);
        });
    }

    function gerenciarAcessibilidade(idBotao, classeCSS) {
        const botao = document.getElementById(idBotao);
        if (!botao) return; 
        
        const elementoAlvo = (classeCSS === 'escala-cinza') ? document.documentElement : document.body;
        
        if (elementoAlvo.classList.contains(classeCSS)) {
            botao.setAttribute('aria-pressed', 'true');
        } else {
            botao.setAttribute('aria-pressed', 'false');
        }

        botao.addEventListener('click', () => {
            let ativo;
            if (classeCSS === 'escala-cinza') {
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
                    btnOuvir.innerText = "🔊 Ouvir Conteúdo (Sintetizador)";
                    return;
                }
                const conteudoPrincipal = document.getElementById('conteudo-principal');
                const textoParaLer = conteudoPrincipal ? conteudoPrincipal.innerText : document.body.innerText;
                lendoConteudo = new SpeechSynthesisUtterance(textoParaLer);
                lendoConteudo.lang = 'pt-BR';
                
                lendoConteudo.onend = () => {
                    btnOuvir.innerText = "🔊 Ouvir Conteúdo (Sintetizador)";
                };

                btnOuvir.innerText = "🛑 Parar Leitura";
                window.speechSynthesis.speak(lendoConteudo);
            } else {
                alert('Este navegador não aceita a função de leitura de texto.');
            }
        });

        window.addEventListener('beforeunload', () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        });
    }

    // ==========================================================================
    // 5. MOTOR DE ANIMAÇÃO DE ROLAGEM (INTERSECTION OBSERVER)
    // ==========================================================================
    const secoesParaAnimar = document.querySelectorAll(".animar-scroll");
    
    if ("IntersectionObserver" in window) {
        const observadorScroll = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observadorScroll.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.15
        });

        secoesParaAnimar.forEach(secao => observadorScroll.observe(secao));
    } else {
        secoesParaAnimar.forEach(secao => secao.classList.add("visivel"));
    }
});