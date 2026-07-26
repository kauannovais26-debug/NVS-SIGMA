document.addEventListener("DOMContentLoaded", () => {

    atualizarDashboard();

    configurarEventos();

    carregarLinhaSelecionada();

});

// ==============================
// MODAL
// ==============================

const modal = document.getElementById("modal");

document.getElementById("btnFechar").addEventListener("click", () => {

    modal.style.display = "none";

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// ==============================
// NAVEGAÇÃO
// ==============================

const paginaDashboard = document.getElementById("dashboard");
const paginaMaquinas = document.getElementById("maquinas");

const btnDashboard = document.getElementById("menuDashboard");
const btnMaquinas = document.getElementById("menuMaquinas");

function abrirDashboard() {

    paginaDashboard.style.display = "flex";
    paginaMaquinas.style.display = "none";

    document.querySelector(".titulo").style.display = "block";
    document.querySelector(".resumo").style.display = "grid";

    btnDashboard.classList.add("ativo");
    btnMaquinas.classList.remove("ativo");

}

function abrirMaquinas() {

    paginaDashboard.style.display = "none";
    paginaMaquinas.style.display = "block";

    document.querySelector(".titulo").style.display = "none";
    document.querySelector(".resumo").style.display = "none";

    btnDashboard.classList.remove("ativo");
    btnMaquinas.classList.add("ativo");

    carregarLinhaSelecionada();

}

function configurarEventos() {

    btnDashboard.addEventListener("click", abrirDashboard);

    btnMaquinas.addEventListener("click", abrirMaquinas);

    document
        .getElementById("maquinaSelecionada")
        .addEventListener("change", carregarLinhaSelecionada);

}

// ==============================
// MÁQUINAS
// ==============================

function carregarLinhaSelecionada() {

    const id = Number(
        document.getElementById("maquinaSelecionada").value
    );

    const linha = linhas.find(l => l.id === id);

    if (!linha) return;

    maquinaAtual = id;

    document.getElementById("nomeMaquina").innerText = linha.nome;

    alterarStatus(
        linha.status.toUpperCase().replaceAll(" ", "_")
    );

    if (linha.dosadora) {

        document.getElementById("opAtual").innerText =
            linha.dosadora.op;

        document.getElementById("produtoAtual").innerText =
            linha.dosadora.produto;

        document.getElementById("metaAtual").innerText =
            linha.dosadora.meta;

        document.getElementById("produzidoAtual").innerText =
            linha.dosadora.produzido;

        const eficiencia =
            Math.round(
                (linha.dosadora.produzido /
                    linha.dosadora.meta) * 100
            );

        document.getElementById("percentual").innerText =
            eficiencia + "%";

        const barra =
            document.getElementById("barraProgresso");

        if (barra) {

            barra.style.width = eficiencia + "%";

        }

    }

}