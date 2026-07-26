const linhas = [

{
    id: 1,
    nome: "DOSADORA 01",
    status: "Produzindo",

    dosadora: {
        op: "245871",
        produto: "150FEN400",
        produzido: 820,
        meta: 1000
    },

    plissadeira: {
        op: "245871",
        produto: "150FEN400",
        produzido: 790,
        meta: 1000
    },

    mensagem: "Produção normal."
},

{
    id: 2,
    nome: "DOSADORA 02",
    status: "Produzindo",

    dosadora: {
        op: "245910",
        produto: "150FEN403",
        produzido: 680,
        meta: 1000
    },

    plissadeira: {
        op: "245910",
        produto: "150FEN403",
        produzido: 640,
        meta: 1000
    },

    mensagem: "Produção normal."
},

{
    id: 3,
    nome: "DOSADORA 03",
    status: "Setup",

    dosadora: {
        op: "245930",
        produto: "180FEN200",
        produzido: 0,
        meta: 1000
    },

    plissadeira: {
        op: "245930",
        produto: "180FEN200",
        produzido: 0,
        meta: 1000
    },

    mensagem: "Troca de Ferramental"
},

{
    id: 4,
    nome: "PLISSADEIRA 01",
    status: "Parada",

    dosadora: {
        op: "246000",
        produto: "200FEN100",
        produzido: 0,
        meta: 1000
    },

    plissadeira: {
        op: "246000",
        produto: "200FEN100",
        produzido: 0,
        meta: 1000
    },

    mensagem: "Aguardando Material"
},

{
    id: 5,
    nome: "PLISSADEIRA 02",
    status: "Produzindo",

    dosadora: {
        op: "245950",
        produto: "150FEN500",
        produzido: 950,
        meta: 1000
    },

    plissadeira: {
        op: "245950",
        produto: "150FEN500",
        produzido: 920,
        meta: 1000
    },

    mensagem: "Produção normal."
}

];