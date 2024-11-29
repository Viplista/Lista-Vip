window.onload = function() {
    loadEventsAdmin();
}

// Carregar todos os eventos para o painel de administração
function loadEventsAdmin() {
    const events = getEvents();
    const eventListContainer = document.getElementById("eventListAdmin");
    eventListContainer.innerHTML = "";  // Limpa a lista de eventos

    events.forEach(event => {
        const div = document.createElement("div");
        div.textContent = `Evento: ${event.name}`;
        
        const button = document.createElement("button");
        button.textContent = "Ver Convidados";
        button.onclick = () => viewGuests(event.id);
        
        div.appendChild(button);
        eventListContainer.appendChild(div);
    });
}

// Visualizar os convidados de um evento
function viewGuests(eventId) {
    const events = getEvents();
    const event = events.find(event => event.id === eventId);

    let guestListHTML = `<h3>Convidados para o evento ${event.name}:</h3>`;
    event.guests.forEach(guest => {
        guestListHTML += `<p>${guest.name}</p>`;
    });
    
    const eventListContainer = document.getElementById("eventListAdmin");
    eventListContainer.innerHTML = guestListHTML;
}

// Criar um novo evento
function createEvent() {
    const eventName = prompt("Nome do novo evento:");
    
    if (eventName) {
        const events = getEvents();
        const newEvent = {
            id: Date.now(),  // ID único
            name: eventName,
            guests: []  // Inicialmente, o evento não tem convidados
        };
        
        events.push(newEvent);
        saveEvents(events);

        loadEventsAdmin();  // Atualiza a lista de eventos
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
