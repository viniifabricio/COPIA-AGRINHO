# 🌱 EcoRadar Agro — Documentação Técnica do Projeto
**Concurso Agrinho 2026** **Categoria:** Programação Front-End (Ensino Médio)  
**Instituição:** Colégio Estadual Cívico-Militar Stella Maris — Andirá - PR  

---

## 📝 Apresentação e Propósito Socioambiental
O **EcoRadar Agro** é uma plataforma digital focada no tema **"Agro Forte, Futuro Sustentável"**. O projeto foi desenvolvido com o objetivo de conscientizar e oferecer ferramentas práticas para o pequeno e médio produtor rural do Norte Pioneiro do Paraná. O sistema foca no combate ao desperdício de recursos hídricos na irrigação e na prevenção da deriva de defensivos agrícolas provocada por rajadas de vento severas.

---

## 👥 Ficha Técnica de Desenvolvimento
* **Aluno Desenvolvedor:** Vinicius Montagna Fabricio (Desenvolvimento solo de toda a arquitetura de software, interface, lógica e acessibilidade).
* **Professor Orientador:** Francisco Biudes (Orientação pedagógica, revisão temática e mentoria de projeto).

---

## 🛠️ Tecnologias Utilizadas e Arquitetura
O projeto foi construído recusando o uso de templates prontos, frameworks pesados (como React ou Vue) ou construtores automáticos (No-Code). A arquitetura preza pelo **Código Limpo (Clean Code)** e performance nativa:

* **HTML5 Semântico:** Estruturação baseada em tags acessíveis (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`) para indexação e leitura de tela.
* **CSS3 Avançado:** Layout baseado em Flexbox e CSS Grid Responsivo, utilizando variáveis nativas (`:root`) para controle dinâmico de cores e fontes.
* **JavaScript Vanilla (Puro):** Lógica de programação executada inteiramente no lado do cliente (Client-Side), sem dependências de frameworks.

---

## ⚖️ Conformidade com o Regulamento (Uso de Recursos Externos)
Para fins de transparência com a Banca Avaliadora do Concurso Agrinho 2026, esclarece-se o uso de recursos de terceiros:

1.  **Plugin VLibras:** Integrado exclusivamente na camada de acessibilidade como ferramenta oficial de inclusão do Governo Federal para tradução em Libras. Toda a inicialização foi modularizada dentro do arquivo `main.js`, não interferindo em nenhuma regra de negócio ou lógica principal da aplicação.
2.  **Iframe do Windy:** Recurso de incorporação estritamente informativa para exibição do mapa meteorológico regional em tempo real, atuando de maneira isolada na interface.

---

## ♿ Sistema Avançado de Acessibilidade (WCAG 2.1 & eMAG)
A plataforma possui uma central flutuante de acessibilidade que opera por meio de manipulação dinâmica do DOM via JavaScript, contando com os seguintes diferenciais:

* **Persistência com LocalStorage:** Todas as configurações escolhidas pelo usuário (Alto Contraste, Fonte para Dislexia, Escala de Cores Monocromática, Ampliação de Fonte e Espaçamento Adaptativo) são salvas na memória do navegador. As preferências continuam ativas mesmo se a página for recarregada (`F5`).
* **Acessibilidade Cognitiva (Dislexia):** Opção de troca tipográfica para fontes com pesos inferiores mais acentuados, facilitando a leitura de textos corridos.
* **Navegação por Teclado:** Remoção de travas de foco e estilização personalizada de contornos visuais (`outline`) para garantir usabilidade total sem mouse.
* **Tratamento de Erros de Voz:** Validação preventiva (`"speechSynthesis" in window`) para evitar falhas silenciosas de leitura de áudio em navegadores obsoletos.