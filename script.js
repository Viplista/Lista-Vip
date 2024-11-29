window.onload = function() {
    loadEvents();
}

// Carregar todos os eventos
function loadEvents() {
    const events = getEvents();
    const eventListContainer = document.getElementById("eventListContainer");
    eventListContainer.innerHTML = "";  // Limpa a lista de eventos

    events.forEach(event => {
        const button = document.createElement("button");
        button.textContent = event.name;
        button.onclick = () => showEventForm(event.id);
        eventListContainer.appendChild(button);
    });
}

// Mostrar o formulário de inscrição para o evento selecionado
function showEventForm(eventId) {
    document.getElementById("guestForm").style.display = "flex";
    document.getElementById("guestForm").onsubmit = function(event) {
        event.preventDefault();
        addGuest(eventId);
    }
}

// Adicionar um convidado ao evento selecionado
function addGuest(eventId) {
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const contact = document.getElementById("contact").value;

    if (name && contact) {
        const events = getEvents();
        const event = events.find(event => event.id === eventId);

        event.guests.push({ name, cpf, contact });

        // Atualizar o evento no localStorage
        saveEvents(events);
        
        document.getElementById("guestForm").reset();
        document.getElementById("guestForm").style.display = "none";
        alert("Convidado adicionado com sucesso!");
    }
}

// Recuperar todos os eventos do localStorage
function getEvents() {
    const events = localStorage.getItem("events");
    return events ? JSON.parse(events) : [];
}

// Salvar os eventos no localStorage
function saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
}
