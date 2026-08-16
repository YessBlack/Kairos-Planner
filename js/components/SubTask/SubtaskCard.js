export const SubtaskCard = (text) => {
  return `
    <li class="d-flex align-items-center justify-content-between p-2 border rounded-2 gap-3">
      <span>${text}</span>
      <button type="button" class="btn btn-sm btnRemoveSubtask" aria-label="Eliminar subtarea">
        <i data-lucide="trash-2" width="16" height="16"></i>
      </button>
    </li>
  `
}
