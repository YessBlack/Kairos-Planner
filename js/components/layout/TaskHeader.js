export const TaskHeader = () => `
  <div class="taskHeader-content">
    <div class="taskHeader-inner">
      <div class="taskHeader-title">
        <div>
          <h2 class="taskTitle">Lista de Tareas</h2>
          <p class="taskSubtitle">Supervisa avances, bloqueos y estados de ejecución de la semana</p>
        </div>
      </div>

      <div class="taskHeader-controls">
        <label class="taskSearch" for="taskSearchInput">
          <i data-lucide="search" width="16" height="16"></i>
          <input id="taskSearchInput" type="search" placeholder="Filtrar en esta lista..." autocomplete="off">
        </label>

        <label class="taskSort" for="taskSortSelect">
          <i data-lucide="arrow-down-up" width="16" height="16"></i>
          <span>Ordenar:</span>
          <select id="taskSortSelect">
            <option value="date-asc">Vencimiento más próximo</option>
            <option value="date-desc">Vencimiento más lejano</option>
          </select>
        </label>
      </div>
    </div>
  </div>
`
