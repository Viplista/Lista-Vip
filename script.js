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

        // Atualiza a tabela de convidados
        updateGuestTable();

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

// Função para atualizar a tabela com a lista de convidados
function updateGuestTable() {
    const guestList = getGuestList();
    const tableBody = document.getElementById('guestTableBody');

    // Limpa a tabela antes de adicionar os novos convidados
    tableBody.innerHTML = '';

    guestList.forEach(guest => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${guest.name}</td><td>${guest.contact}</td>`;
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
