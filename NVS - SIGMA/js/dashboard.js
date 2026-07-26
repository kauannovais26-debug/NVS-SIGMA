let maquinaAtual = 1;

function carregarLinhaSelecionada() {

    maquinaAtual = Number(
        document.getElementById("maquinaSelecionada").value
    );

    const linha = linhas.find(l => l.id === maquinaAtual);

    if (!linha) return;

    document.getElementById("nomeMaquina").innerText =
        linha.nome;

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

        const percentual = Math.round(
            (linha.dosadora.produzido /
             linha.dosadora.meta) * 100
        );

        document.getElementById("percentual").innerText =
            percentual + "%";

        document.getElementById("barraProgresso").style.width =
            percentual + "%";
    }
}

function criarLinha(linha){

    let statusClasse = "";
    let statusIcone = "";
    let conteudo = "";

    switch(linha.status){

        case "Produzindo":
            statusClasse = "produzindo";
            statusIcone = "🟢 Produzindo";

            conteudo = `

                <div class="maquina">

                    <h4>Dosadora</h4>

                    <p>OP${linha.dosadora.op}</p>

                    <small>${linha.dosadora.produto}</small>

                    <div class="barra">
                        <div class="progresso"
                        style="width:${(linha.dosadora.produzido/linha.dosadora.meta)*100}%">
                        </div>
                    </div>

                    <small>

                        ${linha.dosadora.produzido}/${linha.dosadora.meta}

                        (${Math.round((linha.dosadora.produzido/linha.dosadora.meta)*100)}%)

                    </small>

                </div>

            `;

            if(linha.plissadeira){

                conteudo += `

                <div class="maquina">

                    <h4>Plissadeira</h4>

                    <p>OP${linha.plissadeira.op}</p>

                    <small>${linha.plissadeira.produto}</small>

                    <div class="barra">
                        <div class="progresso"
                        style="width:${(linha.plissadeira.produzido/linha.plissadeira.meta)*100}%">
                        </div>
                    </div>

                    <small>

                        ${linha.plissadeira.produzido}/${linha.plissadeira.meta}

                        (${Math.round((linha.plissadeira.produzido/linha.plissadeira.meta)*100)}%)

                    </small>

                </div>

                `;

            }

        break;

        case "Setup":

            statusClasse = "setup";
            statusIcone = "🟡 Setup";

            conteudo = `

                <div class="mensagem">

                    ${linha.mensagem}

                </div>

            `;

        break;

        case "Parada":

            statusClasse = "parada";
            statusIcone = "🔴 Parada";

            conteudo = `

                <div class="mensagem">

                    ${linha.mensagem}

                </div>

            `;

        break;

    }

    return `

    <article class="linha">

        <div class="linha-id">

            LINHA ${linha.id}

        </div>

        <div class="status ${statusClasse}">

            ${statusIcone}

        </div>

        <div class="producao">

            ${conteudo}

        </div>

        <div class="acoes">

            <button onclick="abrirDetalhes(${linha.id})">

                Detalhes

            </button>

        </div>

    </article>

    `;

}

function atualizarDashboard(){

    const dashboard = document.getElementById("dashboard");

    dashboard.innerHTML = "";

    linhas.forEach(linha=>{

        dashboard.innerHTML += criarLinha(linha);

    });

}

function abrirDetalhes(id){

    maquinaAtual = id;

    const linha = linhas.find(l => l.id === id);

    if(!linha) return;

    document.getElementById("tituloModal").innerHTML = `
        LINHA ${linha.id}
        <span class="badge-status ${linha.status.toLowerCase()}">
            ${linha.status}
        </span>
    `;

    let html = "";

    if(linha.status === "Produzindo"){

        if(linha.dosadora){

            html += `

            <div class="card-modal">

                <div class="titulo-card">
                    ⚙️ Dosadora
                </div>

                <div class="campo">
                    <span>OP</span>
                    <strong>${linha.dosadora.op}</strong>
                </div>

                <div class="campo">
                    <span>Produto</span>
                    <strong>${linha.dosadora.produto}</strong>
                </div>

                <div class="campo">
                    <span>Meta</span>
                    <strong>${linha.dosadora.meta}</strong>
                </div>

                <div class="campo">
                    <span>Produzido</span>
                    <strong>${linha.dosadora.produzido}</strong>
                </div>

                <div class="barra-modal">

                    <div class="barra-modal-preenchimento"

                    style="width:${(linha.dosadora.produzido/linha.dosadora.meta)*100}%">

                    </div>

                </div>

                <div class="percentual">

                    ${Math.round((linha.dosadora.produzido/linha.dosadora.meta)*100)}%

                </div>

            </div>

            `;

        }

        if(linha.plissadeira){

            html += `

            <div class="card-modal">

                <div class="titulo-card">
                    📦 Plissadeira
                </div>

                <div class="campo">
                    <span>OP</span>
                    <strong>${linha.plissadeira.op}</strong>
                </div>

                <div class="campo">
                    <span>Produto</span>
                    <strong>${linha.plissadeira.produto}</strong>
                </div>

                <div class="campo">
                    <span>Meta</span>
                    <strong>${linha.plissadeira.meta}</strong>
                </div>

                <div class="campo">
                    <span>Produzido</span>
                    <strong>${linha.plissadeira.produzido}</strong>
                </div>

                <div class="barra-modal">

                    <div class="barra-modal-preenchimento"

                    style="width:${(linha.plissadeira.produzido/linha.plissadeira.meta)*100}%">

                    </div>

                </div>

                <div class="percentual">

                    ${Math.round((linha.plissadeira.produzido/linha.plissadeira.meta)*100)}%

                </div>

            </div>

            `;

        }

    }else{

        html = `

        <div class="mensagem-card">

            <h3>${linha.status}</h3>

            <p>${linha.mensagem}</p>

        </div>

        `;

    }

    document.getElementById("conteudoModal").innerHTML = html;

    document.getElementById("modal").classList.add("abrir");

}

// ===============================
// FECHAR MODAL
// ===============================

const botaoFechar = document.querySelector(".fechar");

if (botaoFechar) {

    botaoFechar.addEventListener("click", () => {

        document.getElementById("modal").classList.remove("abrir");

    });

}

window.addEventListener("click", (e) => {

    const modal = document.getElementById("modal");

    if (e.target === modal) {

        modal.classList.remove("abrir");

    }

});

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    atualizarDashboard();

    carregarLinhaSelecionada();

    const seletor = document.getElementById("maquinaSelecionada");

    if (seletor) {

        seletor.addEventListener("change", carregarLinhaSelecionada);

    }

});

    document.getElementById("modal").style.display="none";



window.onclick=function(e){

    if(e.target.id=="modal"){

        document.getElementById("modal").style.display="none";

    }

}



function alterarStatus(status){

    const statusDiv = document.getElementById("statusMaquina");
    const barra = document.getElementById("barraProgresso");

    const bannerStatus = document.getElementById("bannerStatus");
    const tituloStatus = document.getElementById("tituloStatus");
    const descricaoStatus = document.getElementById("descricaoStatus");

    const linha = linhas.find(l => l.id === maquinaAtual);

    if(!linha) return;

    statusDiv.className = "status-card";
    bannerStatus.className = "banner-status";

    switch(status){

        case "PRODUZINDO":

            linha.status = "Produzindo";
            delete linha.mensagem;

            statusDiv.classList.add("produzindo");
            statusDiv.innerHTML = "🟢 PRODUZINDO";

            barra.style.background = "#27ae60";

            bannerStatus.classList.add("produzindo");
            tituloStatus.innerHTML = "🟢 MÁQUINA PRODUZINDO";
            descricaoStatus.innerHTML = "Produção operando normalmente.";

        break;

        case "PARADA":

            linha.status = "Parada";
            linha.mensagem = "Máquina Parada";

            statusDiv.classList.add("parada");
            statusDiv.innerHTML = "🔴 PARADA";

            barra.style.background = "#e74c3c";

            bannerStatus.classList.add("parada");
            tituloStatus.innerHTML = "🔴 MÁQUINA PARADA";
            descricaoStatus.innerHTML = "Aguardando intervenção do operador.";

        break;

        case "PARADA_MOTIVO":

            linha.status = "Parada";
            linha.mensagem = "Parada com motivo informado.";

            statusDiv.classList.add("parada-motivo");
            statusDiv.innerHTML = "🟡 PARADA COM MOTIVO";

            barra.style.background = "#f1c40f";

            bannerStatus.classList.add("parada-motivo");
            tituloStatus.innerHTML = "🟡 PARADA COM MOTIVO";
            descricaoStatus.innerHTML = "Parada registrada com justificativa.";

        break;

        case "SETUP":

            linha.status = "Setup";
            linha.mensagem = "Preparando próxima produção.";

            statusDiv.classList.add("setup");
            statusDiv.innerHTML = "🔵 SETUP";

            barra.style.background = "#3498db";

            bannerStatus.classList.add("setup");
            tituloStatus.innerHTML = "🔵 MÁQUINA EM SETUP";
            descricaoStatus.innerHTML = "Preparando próxima ordem de produção.";

        break;

    }

    atualizarDashboard();

}

document.addEventListener("DOMContentLoaded", () => {

    atualizarDashboard();

    carregarLinhaSelecionada();

    const seletor = document.getElementById("maquinaSelecionada");

    if (seletor) {

        seletor.addEventListener(
            "change",
            carregarLinhaSelecionada
        );

    }

})