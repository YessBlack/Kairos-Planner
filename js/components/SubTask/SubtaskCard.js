export const SubtaskCard = (subtask) => {
  const doneClass = subtask.done ? 'is-done' : ''
  const icon = subtask.done ? 'check-circle-2' : 'circle'

  return `
    <li class="d-flex align-items-center justify-content-between p-2 border rounded-2 gap-3 ${doneClass}" data-subtask-id="${subtask.id}">
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-sm btnToggleSubtask" aria-label="Marcar como hecha">
          <i data-lucide="${icon}" width="16" height="16"></i>
        </button>
        <span class="subtaskText">${subtask.text}</span>
      </div>
      <button type="button" class="btn btn-sm btnRemoveSubtask" aria-label="Eliminar subtarea">
        <i data-lucide="trash-2" width="16" height="16"></i>
      </button>
    </li>
  `
}
