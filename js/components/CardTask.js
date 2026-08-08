import { getStatusMarkup } from '../utils/taskUtils.js'

export const TaskCard = (task) => {
  const canceledClass = task.canceled ? 'is-canceled' : ''

  const checkIcon = task.completed
    ? '<i data-lucide="check-circle-2" width="20" height="20" class="task-check"></i>'
    : ''

  const statusMarkup = getStatusMarkup(task)

  return `
    <div class="task d-flex justify-content-between gap-5 ${canceledClass}">
      <div class="taskBody w-100">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <h3 class="mb-0">${task.title}</h3>
            ${checkIcon}
          </div>
          <span class="fw-bold text-${task.status}">${task.percent}%</span>
        </div>
        <p>${task.category}</p>

        <div class="progress" role="progressbar" aria-valuenow="${task.percent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar progress-bar-striped bg-${task.status}" style="width: ${task.percent}%"></div>
        </div>

        <div class="countSubTasks d-flex flex-column gap-2 mt-3">
          <div class="d-flex align-items-center gap-3">
            <div class="d-flex gap-1 align-items-center">
              <i data-lucide="check-circle" width="16" height="16"></i>
              <span>${task.totalTasks} Tasks</span>
            </div>
            <div class="d-flex align-items-center gap-1 text-muted">
              <i data-lucide="calendar" width="16" height="16"></i>
              <span>${task.dateLabel}</span>
            </div>
            ${statusMarkup}
          </div>
        </div>
      </div>

      <div class="taskFooter">
        <div class="btn-group">
          <button type="button" class="btn btnDropdown dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
            <i data-lucide="ellipsis-vertical" width="18" height="18"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Editar Tarea</a></li>
            <li><a class="dropdown-item" href="#">Agregar SubTareas</a></li>
            <li><a class="dropdown-item" href="#">Eliminar Tarea</a></li>
          </ul>
        </div>
      </div>
    </div>
    `
}
