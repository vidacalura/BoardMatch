const inputEmail: HTMLInputElement = <HTMLInputElement>document.getElementById("input-email");
const registroBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("registrar-btn");
const resRegistroContainer: HTMLElement = <HTMLElement>document.getElementById("res-registro");
const doarBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("doar-btn");
const doarInfoDiv: HTMLElement = <HTMLElement>document.getElementById("doar-info-bg");

registroBtn.addEventListener("click", registrarEmailNaFila);
inputEmail.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter")
        registrarEmailNaFila(<Event>e);
});

doarBtn.addEventListener("click", mostrarInfoDoacao);
doarInfoDiv.addEventListener("click", mostrarInfoDoacao);

/**
* Registra o email do usuário na email-list do BoardMatch
* @param {Event} e Evento padrão da função
*/
async function registrarEmailNaFila(e: Event): Promise<void> {
    e.preventDefault();
    resRegistroContainer.textContent = "";

    const email = inputEmail.value.trim();
    if (!emailEhValido(email)) {
        mostrarErroRegistro("Email inválido. Cheque seu email e tente novamente.");
        return;
    }

    await fetch("https://boardmatch-api.up.railway.app/api/email-list", {
    //await fetch("http://0.0.0.0:4000/api/email-list", {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON"
        },
        body: JSON.stringify({
            email
        })
    })
    .then((res) => { return res.json(); })
    .then((res) => {
        if (res.error) {
            mostrarErroRegistro(res.error);
            return;
        }

        resRegistroContainer.style.color = "#39EB00";
        resRegistroContainer.textContent = "Email registrado com sucesso! Obrigado pelo seu suporte! :)";
    })
    .catch((err) => {
        console.log(err);
        mostrarErroRegistro("Erro ao conectar com o sistema :( Tente novamente mais tarde.");
    });
}

function emailEhValido(email: string): boolean {
    if (email.length < 6) 
        return false;
    if (!email.includes("@")) 
        return false;
    if (!email.includes("."))
        return false;

    return true;
}

/**
 * Mostra uma mensagem de erro no registro de email formatado 
 * @param {String} erro Erro a ser mostrado ao usuário
 */
function mostrarErroRegistro(erro: string): void {
    resRegistroContainer.style.color = "#FF4949";
    resRegistroContainer.textContent = erro; 
}

/**
 * Mostra um modal com informações para doação
 * @param {Event} e Evento padrão da função
 */
function mostrarInfoDoacao(e: Event): void {
    if (doarInfoDiv.className.includes("hidden")) {
        doarInfoDiv.classList.remove("hidden");
    }
    else {
        if (e.target.id === "doar-info-bg")
            doarInfoDiv.classList.add("hidden");
    }
}