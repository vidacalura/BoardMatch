const inputEmail: HTMLInputElement = <HTMLInputElement>document.getElementById("input-email");
const registroBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("registrar-btn");
const resRegistroContainer: HTMLElement = <HTMLElement>document.getElementById("res-registro");

registroBtn.addEventListener("click", registrarEmailNaFila);
inputEmail.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter")
        registrarEmailNaFila(<Event>e);
});

async function registrarEmailNaFila(e: Event): Promise<void> {
    e.preventDefault();
    resRegistroContainer.textContent = "";

    const email = inputEmail.value.trim();
    if (!emailEhValido(email)) {
        mostrarErroRegistro("Email inválido. Cheque seu email e tente novamente.");
        return;
    }

    await fetch("", {
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

function mostrarErroRegistro(erro: string): void {
    resRegistroContainer.style.color = "#FF4949";
    resRegistroContainer.textContent = erro; 
}