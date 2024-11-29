// Função para adicionar um convidado à lista
document.getElementById('guestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const contact = document.getElementById('contact').value;

    if (name && contact) {
        // Obtém a lista de convidados do localStorage (caso exista)
        const guestList = getGuestList();

        // Adiciona o novo convidado à lista
        guestList.push({ name, cpf, contact });

        // Salva a lista atualizada no localStorage
        saveGuestList(guestList);

        // Limpa o formulário
        document.getElementById('guestForm').reset();
    }
});

// Função para obter a lista de convidados do localStorage
function getGuestList() {
    const guestList = localStorage.getItem('guestList');
    return guestList ? JSON.parse(guestList) : [];
}

// Função para salvar a lista de convidados no localStorage
function saveGuestList(guestList) {
    localStorage.setItem('guestList', JSON.stringify(guestList));
}
