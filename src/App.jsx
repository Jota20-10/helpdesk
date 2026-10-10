
import { useState, useEffect } from 'react';
import './App.css';


// =====================================
// TARJETA DE ESTADÍSTICAS
// =====================================

function StatCard({ title, value, type }) {
  return (
    <article className={`stat-card ${type}`}>
      <p>{title}</p>
      <h2>{value}</h2>
    </article>
  );
}

// =====================================
// FORMULARIO DE CREACIÓN
// =====================================

function TicketForm({ onAddTicket }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Software');
  const [priority, setPriority] = useState('Media');

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) return;

    const newTicket = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status: 'Abierto',
      createdAt: new Date().toISOString()
    };

    onAddTicket(newTicket);

    setTitle('');
    setDescription('');
    setCategory('Software');
    setPriority('Media');
  }

  return (
    <section className="ticket-form-section">
      <h2>Crear nuevo ticket</h2>
      <p>Registra una solicitud de soporte técnico.</p>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ticket-title">
            Título del incidente
          </label>
          <input
            id="ticket-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. La impresora no funciona"
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ticket-description">
            Descripción
          </label>
          <textarea
            id="ticket-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el problema..."
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ticket-category">
              Categoría
            </label>
            <select
              id="ticket-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Software</option>
              <option>Hardware</option>
              <option>Red</option>
              <option>Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ticket-priority">
              Prioridad
            </label>
            <select
              id="ticket-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </div>
        </div>

        <button className="submit-button" type="submit">
          + Crear ticket
        </button>
      </form>
    </section>
  );
}

// =====================================
// FORMULARIO DE EDICIÓN
// =====================================

function TicketEditor({ ticket, onSave, onCancel }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(
    ticket.description
  );
  const [category, setCategory] = useState(ticket.category);
  const [priority, setPriority] = useState(ticket.priority);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) return;

    onSave(ticket.id, {
      title: title.trim(),
      description: description.trim(),
      category,
      priority
    });
  }

  return (
    <form className="ticket-form edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={`edit-title-${ticket.id}`}>
          Título
        </label>
        <input
          id={`edit-title-${ticket.id}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor={`edit-description-${ticket.id}`}>
          Descripción
        </label>
        <textarea
          id={`edit-description-${ticket.id}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`edit-category-${ticket.id}`}>
            Categoría
          </label>
          <select
            id={`edit-category-${ticket.id}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Software</option>
            <option>Hardware</option>
            <option>Red</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`edit-priority-${ticket.id}`}>
            Prioridad
          </label>
          <select
            id={`edit-priority-${ticket.id}`}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
        </div>
      </div>

      <div className="ticket-actions">
        <button type="submit" className="submit-button">
          Guardar cambios
        </button>

        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// =====================================
// LISTADO Y GESTIÓN DE TICKETS
// =====================================

function TicketList({
  tickets,
  onUpdateTicket,
  onChangeStatus,
  onDeleteTicket
}) {
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todas');

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.trim().toLocaleLowerCase();

    const matchesSearch =
      ticket.title.toLocaleLowerCase().includes(searchText) ||
      ticket.description.toLocaleLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === 'Todos' ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'Todas' ||
      ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });


  function saveChanges(id, changes) {
    onUpdateTicket(id, changes);
    setEditingId(null);
  }

  return (
    <section className="ticket-list-section">
      <h2>Tickets registrados</h2>

      <div className="ticket-filters">

        <div className="form-group">
          <label htmlFor="search-tickets">
            Buscar tickets
          </label>

          <input
            id="search-tickets"
            type="search"
            placeholder="Buscar por título o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="filter-status">
              Filtrar por estado
            </label>

            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Todos</option>
              <option>Abierto</option>
              <option>En progreso</option>
              <option>Resuelto</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filter-priority">
              Filtrar por prioridad
            </label>

            <select
              id="filter-priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>Todas</option>
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </div>
        </div>

        <p className="filter-count">
          Mostrando {filteredTickets.length} de {tickets.length} tickets
        </p>

      </div>



      {filteredTickets.length === 0 ? (
        <p className="empty-state">
          {tickets.length === 0
            ? 'Todavía no hay tickets registrados.'
            : 'No hay tickets que coincidan con los filtros.'}
        </p>

      ) : (
        <div className="ticket-list">
          {filteredTickets.map((ticket) => (
            <article className="ticket-item" key={ticket.id}>

              {editingId === ticket.id ? (
                <TicketEditor
                  ticket={ticket}
                  onSave={saveChanges}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <div className="ticket-item-header">
                    <h3>{ticket.title}</h3>

                    <span className={`ticket-status ${ticket.status === 'Resuelto'
                      ? 'resolved-status'
                      : ticket.status === 'En progreso'
                        ? 'progress-status'
                        : ''
                      }`}>
                      {ticket.status}
                    </span>
                  </div>

                  <p>{ticket.description}</p>

                  <div className="ticket-meta">
                    <span>{ticket.category}</span>
                    <span>Prioridad: {ticket.priority}</span>
                    <span>
                      {new Date(
                        ticket.createdAt
                      ).toLocaleDateString('es-CR')}
                    </span>
                  </div>

                  <div className="status-control">
                    <label htmlFor={`status-${ticket.id}`}>
                      Estado:
                    </label>

                    <select
                      id={`status-${ticket.id}`}
                      value={ticket.status}
                      onChange={(e) =>
                        onChangeStatus(ticket.id, e.target.value)
                      }
                    >
                      <option>Abierto</option>
                      <option>En progreso</option>
                      <option>Resuelto</option>
                    </select>
                  </div>

                  <div className="ticket-actions">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => {
                        setEditingId(ticket.id);
                        setDeletingId(null);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => setDeletingId(ticket.id)}
                    >
                      Eliminar
                    </button>
                  </div>

                  {deletingId === ticket.id && (
                    <div className="delete-confirmation">
                      <p>¿Seguro que deseas eliminar este ticket?</p>

                      <div className="ticket-actions">
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => {
                            onDeleteTicket(ticket.id);
                            setDeletingId(null);
                          }}
                        >
                          Sí, eliminar
                        </button>

                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() => setDeletingId(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

// =====================================
// COMPONENTE PRINCIPAL
// =====================================

function App() {

  const [tickets, setTickets] = useState(() => {
    try {
      const savedTickets = localStorage.getItem('helpdeskTickets');

      if (!savedTickets) return [];

      const parsedTickets = JSON.parse(savedTickets);

      return Array.isArray(parsedTickets) ? parsedTickets : [];
    } catch (error) {
      console.error('Error al recuperar tickets:', error);
      return [];
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem(
        'helpdeskTickets',
        JSON.stringify(tickets)
      );
    } catch (error) {
      console.error('Error al guardar tickets:', error);
    }
  }, [tickets]);



  // CREATE
  function addTicket(newTicket) {
    setTickets((previous) => [newTicket, ...previous]);
  }

  // UPDATE: modificar datos
  function updateTicket(id, changes) {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...changes }
          : ticket
      )
    );
  }

  // UPDATE: cambiar estado
  function changeTicketStatus(id, newStatus) {
    if (!['Abierto', 'En progreso', 'Resuelto'].includes(newStatus)) {
      return;
    }

    updateTicket(id, { status: newStatus });
  }

  // DELETE
  function deleteTicket(id) {
    setTickets((previous) =>
      previous.filter((ticket) => ticket.id !== id)
    );
  }

  // Estadísticas dinámicas
  const openTickets = tickets.filter(
    (ticket) => ticket.status === 'Abierto'
  ).length;

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === 'En progreso'
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === 'Resuelto'
  ).length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">🎧</span>
          <h1>HelpDesk</h1>
        </div>

        <span className="header-label">Dashboard</span>
      </header>

      <main className="dashboard">
        <div className="dashboard-heading">
          <h2>Panel de soporte técnico</h2>
          <p>Gestiona incidentes y solicitudes de soporte.</p>
        </div>

        <section className="stats" aria-label="Resumen de tickets">
          <StatCard
            title="Abiertos"
            value={openTickets}
            type="open"
          />
          <StatCard
            title="En progreso"
            value={progressTickets}
            type="progress"
          />
          <StatCard
            title="Resueltos"
            value={resolvedTickets}
            type="resolved"
          />
        </section>

        <TicketForm onAddTicket={addTicket} />

        <TicketList
          tickets={tickets}
          onUpdateTicket={updateTicket}
          onChangeStatus={changeTicketStatus}
          onDeleteTicket={deleteTicket}
        />
      </main>
    </div>
  );
}

export default App;
