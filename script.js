document.addEventListener("DOMContentLoaded", () => {

    /* BUSCA */
    const btnBusca = document.getElementById("btn-busca");
    const overlay = document.getElementById("busca");
    const campo = document.getElementById("campo-busca");

    btnBusca.addEventListener("click", () => {
        overlay.classList.add("ativa");
        campo.focus();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("ativa");
            campo.value = "";
        }
    });

    campo.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const termo = campo.value.toLowerCase();

            if (termo.includes("livro")) location.href = "#livro";
            else if (termo.includes("manifesto")) location.href = "#manifesto";
            else if (termo.includes("contato")) location.href = "#contato";
            else if (termo.includes("comprar")) location.href = "#comprar";

            overlay.classList.remove("ativa");
            campo.value = "";
        }

        if (e.key === "Escape") {
            overlay.classList.remove("ativa");
            campo.value = "";
        }
    });

    /* CARRINHO */

    const btnCarrinho = document.getElementById("btn-carrinho");
    const carrinho = document.getElementById("carrinho");
    const btnFinalizar = document.getElementById("btn-finalizar");

    btnCarrinho.addEventListener("click", () => {
        carrinho.classList.add("ativo");
    });

    carrinho.addEventListener("click", (e) => {
        if (e.target === carrinho) {
            carrinho.classList.remove("ativo");
        }
    });

    btnFinalizar.addEventListener("click", (e) => {
        e.preventDefault();

        const pagamento = document.querySelector(
            'input[name="pagamento"]:checked'
        );

        if (!pagamento) {
            alert("Selecione uma forma de pagamento");
            return;
        }

        const mensagem = `Quero comprar o livro Mortdecai pagando via ${pagamento.value}`;

        const link =
            "https://wa.me/5531992387078?text=" +
            encodeURIComponent(mensagem);

        window.open(link, "_blank");
    });
});



/* SISTEMA DE AVALIAÇÃO */

let notaSelecionada = 0;

const estrelasInput = document.querySelectorAll(".estrelas-input span");
const btnEnviar = document.getElementById("enviar-avaliacao");
const notaElemento = document.querySelector(".nota");
const reviewsElemento = document.querySelector(".reviews");
const estrelasVisual = document.querySelector(".estrelas");

let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

function atualizarMedia() {
    if (avaliacoes.length === 0) return;

    const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
    const media = (soma / avaliacoes.length).toFixed(1);

    notaElemento.textContent = media;
    reviewsElemento.textContent = `(${avaliacoes.length} avaliações)`;

    let estrelasHTML = "";
    for (let i = 1; i <= 5; i++) {
        estrelasHTML += i <= Math.round(media) ? "★" : "☆";
    }
    estrelasVisual.textContent = estrelasHTML;
}

estrelasInput.forEach(estrela => {
    estrela.addEventListener("click", () => {
        notaSelecionada = parseInt(estrela.dataset.star);

        estrelasInput.forEach(e => {
            e.classList.remove("ativa");
            if (parseInt(e.dataset.star) <= notaSelecionada) {
                e.classList.add("ativa");
            }
        });
    });
});

btnEnviar.addEventListener("click", () => {
    const comentario = document.getElementById("comentario").value;

    if (notaSelecionada === 0) {
        alert("Selecione uma nota");
        return;
    }

    avaliacoes.push({
        nota: notaSelecionada,
        comentario: comentario
    });

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    atualizarMedia();

    document.getElementById("comentario").value = "";
    estrelasInput.forEach(e => e.classList.remove("ativa"));
    notaSelecionada = 0;
});

atualizarMedia();
