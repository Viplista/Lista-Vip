// Armazenamento local para persistir os dados entre recarregamentos
const guestListKey = 'guestList';

// Função para obter a lista de convidados do armazenamento local
function getGuestList() {
    const storedList = localStorage.getItem(guestListKey);
    return storedList ? JSON.parse(storedList) : [];
}

// Função para salvar a lista de convidados no armazenamento local
function saveGuestList(guestList) {
    localStorage.setItem(guestListKey, JSON.stringify(guestList));
}

// Função para adicionar um novo convidado à lista
document.getElementById('guestForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const contact = document.getElementById('contact').value;

    if (name && contact) {
        // Cria um objeto para o convidado
        const guest = {
            name: name,
            cpf: cpf,
            contact: contact
        };

        // Adiciona à lista de convidados
        const guestList = getGuestList();
        guestList.push(guest);
        saveGuestList(guestList);

        // Limpa os campos do formulário
        document.getElementById('guestForm').reset();
        document.getElementById('message').textContent = 'Convidado adicionado com sucesso!';
    } else {
        document.getElementById('message').textContent = 'Por favor, preencha todos os campos obrigatórios.';
    }
});

// Função para exibir os convidados na tabela da página de administração
function displayGuests() {
    const guestList = getGuestList();

    // Obtém a tabela do HTML
    const tableBody = document.querySelector('#guestTable tbody');

    // Limpa a tabela antes de adicionar os novos convidados
    tableBody.innerHTML = '';

    // Exibe os convidados na tabela (somente nomes)
    guestList.forEach(function(guest) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${guest.name}</td>`;
        tableBody.appendChild(row);
    });

    // Exibe o número total de convidados
    const totalGuests = document.getElementById('totalGuests');
    if (totalGuests) {
        totalGuests.textContent = `Total de Convidados: ${guestList.length}`;
    }
}

// Função para baixar a lista de convidados em formato CSV com apenas os nomes
document.getElementById('downloadBtn')?.addEventListener('click', function() {
    const guestList = getGuestList();

    // Converte a lista de convidados para CSV com apenas os nomes
    const csvContent = 'Nome\n' +
        guestList.map(guest => `${guest.name}`).join('\n');

    // Cria um link para download
    const link = document.createElement('a');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    link.href = URL.createObjectURL(blob);
    link.download = 'lista_de_convidados.csv';
    link.click();
});

// Função para baixar a lista de convidados em formato PDF com apenas os nomes
document.getElementById('downloadPdfBtn')?.addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const guestList = getGuestList();

    // Adiciona o título
    doc.setFontSize(16);
    doc.text('Lista de Convidados', 20, 20);

    // Adiciona os nomes dos convidados
    doc.setFontSize(12);
    guestList.forEach((guest, index) => {
        doc.text(guest.name, 20, 30 + (index * 10));
    });

    // Salva o PDF
    doc.save('lista_de_convidados.pdf');
});
