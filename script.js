// Adiciona um convidado à lista
const form = document.getElementById("guestForm");
const message = document.getElementById("message");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const contact = document.getElementById("contact").value.trim();

        if (!name || !contact) {
            message.innerText = "Preencha os campos obrigatórios.";
            return;
        }

        const guestList = JSON.parse(localStorage.getItem("guestList")) || [];
        guestList.push({ name, cpf, contact });
        localStorage.setItem("guestList", JSON.stringify(guestList));

        message.innerText = "Convidado adicionado com sucesso!";
        form.reset();
    });
}

// Exibe convidados na tabela (admin.html)
function displayGuests() {
    const guests = JSON.parse(localStorage.getItem("guestList")) || [];
    const tableBody = document.querySelector("#guestTable tbody");

    if (tableBody) {
        tableBody.innerHTML = ""; // Limpa tabela

        guests.forEach(({ name, cpf, contact }) => {
            const row = `<tr>
                <td>${name}</td>
                <td>${cpf || "-"}</td>
                <td>${contact}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

// Baixa a lista de convidados em CSV
document.getElementById("downloadBtn")?.addEventListener("click", () => {
    const guests = JSON.parse(localStorage.getItem("guestList")) || [];
    let csvContent = "data:text/csv;charset=utf-8,Nome,CPF,Contato\n";

    guests.forEach(({ name, cpf, contact }) => {
        csvContent += `${name},${cpf || ""},${contact}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lista_convidados.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
