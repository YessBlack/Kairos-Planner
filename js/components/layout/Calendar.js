export const Calendar = () => {
  return `
    <div class="agenda-card">
      <div class="agenda-header">
        <div class="info">
          <div class="icon-calendar">
            <i data-lucide="calendar" class="icon" style="width: 20px; height: 20px;"></i>
          </div>
          <div class="info-header">
            <div class="title-row">
              <h3 class="title">Agenda de Planificación & Time-blocking</h3>
              <span class="badge badge-blue" id="viewBadge">Vista Mes</span>
            </div>
            <p class="subtitle">Vista mensual de tus tareas, con seguimiento de vencimientos</p>        </div>
        </div>

        <div class="controls">
          <div class="view-switch">
            <button class="view-switch-btn active" data-view="dayGridMonth">Mes</button>
            <button class="view-switch-btn" data-view="timeGridWeek">Semana</button>
            <button class="view-switch-btn" data-view="timeGridDay">Día</button>
          </div>

          <div class="month-nav">
            <button class="nav-btn" id="prevBtn">
              <i data-lucide="chevron-left" class="icon-sm"></i>
            </button>
            <span class="month-label" id="monthLabel"></span>
            <button class="nav-btn" id="nextBtn">
              <i data-lucide="chevron-right" class="icon-sm"></i>
            </button>
          </div>

          <button class="view-btn" id="toggleBtn" type="button" aria-expanded="false" aria-controls="calendarWrapper">
            <span id="toggleLabel">Expandir</span>
            <i data-lucide="chevron-down" class="icon-sm" id="toggleIcon"></i>
          </button>
        </div>
      </div>

      <div class="agenda-status">
        <span class="agenda-status-item agenda-status-item--milestone">
          <span class="agenda-dot agenda-dot--amber"></span>
          Próxima a vencer: <strong id="nextDeadline"></strong>
        </span>

        <span class="agenda-status-item">
          <span class="agenda-dot agenda-dot--green"></span>
          <strong id="activeTasksCount">0 tareas</strong> activas esta semana
        </span>

        <span class="agenda-status-item">
          <span class="agenda-dot agenda-dot--purple"></span>
          <strong id="overdueTasksCount">0 tareas</strong> vencidas
        </span>
      </div>

      <div class="agenda-calendar-wrapper" id="calendarWrapper">
        <div id="calendar"></div>
      </div>
    </div>
  `
}
