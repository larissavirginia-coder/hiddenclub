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