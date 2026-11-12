
const etapas = [
    "recebido",
    "barista",
    "pronto",
    "entregue"
];

const chaveStatus = "aromaStatusPedido";

// Recupera o status salvo ou inicia como recebido
let statusAtual = localStorage.getItem(chaveStatus) || "recebido";

// Atualiza as cores das etapas na tela
function atualizarEtapas() {
    const progresso = etapas.indexOf(statusAtual);

    const indicadores = document.querySelectorAll("[data-etapa]");

    indicadores.forEach((indicador) => {
        const etapa = indicador.dataset.etapa;
        const indice = etapas.indexOf(etapa);

        indicador.style.backgroundColor =
            indice < progresso ? "#3E9876" :
            indice === progresso ? "#194735" :
            "#E8E8E8";

        indicador.style.color =
            indice <= progresso ? "#FFFFFF" : "#568477";

        indicador.style.transition = "all 0.3s ease";

        indicador.classList.toggle("concluida", indice < progresso);
        indicador.classList.toggle("atual", indice === progresso);
        indicador.classList.toggle("pendente", indice > progresso);
    });

    // Atualiza também os botões do painel da cozinha
    document.querySelectorAll("[data-status]").forEach((botao) => {
        const ativo = botao.dataset.status === statusAtual;

        botao.style.backgroundColor = ativo ? "#194735" : "#E8E8E8";
        botao.style.color = ativo ? "#FFFFFF" : "#194735";
    });
}

// Altera o status do pedido
function alterarStatus(novoStatus) {
    if (!etapas.includes(novoStatus)) {
        console.error("Etapa inválida:", novoStatus);
        return;
    }

    statusAtual = novoStatus;

    localStorage.setItem(chaveStatus, statusAtual);

    atualizarEtapas();
}

// Eventos dos botões do painel da cozinha
document.querySelectorAll("[data-status]").forEach((botao) => {
    botao.addEventListener("click", () => {
        alterarStatus(botao.dataset.status);
    });
});

// Atualiza a tela assim que carregar
document.addEventListener("DOMContentLoaded", atualizarEtapas);

// Atualiza caso outra aba do mesmo navegador altere o pedido
window.addEventListener("storage", (evento) => {
    if (evento.key === chaveStatus) {
        statusAtual = evento.newValue || "recebido";
        atualizarEtapas();
    }
});
