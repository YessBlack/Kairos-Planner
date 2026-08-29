import { getStatusBadge, getTaskProgress, getTaskStatus, getUrgencyMarkup, getDateLabel } from '../../utils/taskUtils.js'

export const TaskCard = (task) => {
  const canceledClass = task.canceled ? 'is-canceled' : ''
  const displayStatus = getTaskStatus(task)
  const statusClass = `status-${displayStatus}`

  const statusBadge = getStatusBadge(task)
  const urgencyMarkup = getUrgencyMarkup(task)
  const { total, done, percent } = getTaskProgress(task)
  const dateLabel = getDateLabel(task)

  return `
    <div class="task d-flex justify-content-between gap-5 ${statusClass} ${canceledClass} w-100">
      <div class="d-flex align-items-start gap-2 w-100">
        ${task.canceled
      ? ''
      : `<input
          type="checkbox"
          class="form-check-input btnCompleteTask flex-shrink-0 mt-1"
          data-task-id="${task.id}"
          ${task.completed ? 'checked' : ''}
          aria-label="Marcar tarea como completada"
        >`}

        <div class="taskBody w-100">
          <div class="d-flex align-items-center justify-content-between gap-3 mb-2">
            <div class="d-flex align-items-center gap-2">
              <h3 class="m-0">${task.title}</h3>
            </div>
            ${statusBadge}
          </div>
          <p>${task.description}</p>

          <hr class="taskDivider">

          <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap">
            <div class="d-flex align-items-center gap-3 countSubTasks">
              <div class="d-flex gap-1 align-items-center">
                <i data-lucide="check-circle" width="16" height="16"></i>
                <span>${done}/${total} Tasks</span>
              </div>
              <div class="d-flex align-items-center gap-1 text-muted">
                <i data-lucide="calendar" width="16" height="16"></i>
                <span>${dateLabel}</span>
              </div>
              ${urgencyMarkup}
            </div>

            <div class="d-flex align-items-center gap-2 taskProgress">
              <div class="progress" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-bar-striped bg-${displayStatus}" style="width: ${percent}%"></div>
              </div>
              <span>${percent}%</span>
            </div>
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
            <li>
              <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEditTask">
                Editar Tarea
              </a>
            </li>
            <li>
              <a class="dropdown-item btnOpenSubtasks" href="#" data-task-id="${task.id}" data-bs-toggle="modal" data-bs-target="#modalAddSubtask">
                SubTareas
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalDeleteTask">
                Eliminar Tarea
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `
}
