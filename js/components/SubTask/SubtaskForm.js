import { SubtaskCard } from './SubtaskCard.js'

export const SubtaskForm = (subtasks = []) => {
  const subtasksHTML = subtasks.map(SubtaskCard).join('')

  return `
    <form id="subtaskForm" class="d-flex gap-2 mb-3">
      <input 
        type="text" 
        id="subtaskInput" 
        name="subtask" 
        placeholder="Escribe una subtarea..." 
        class="p-2 border rounded-2 flex-grow-1"
        autocomplete="off"
      >
      <button type="submit" class="btn btnAdd d-flex align-items-center gap-2" id="btnAddSubtask">
        <i data-lucide="plus" width="16" height="16"></i>
        <span>Agregar subtarea</span>
      </button>
    </form>
    <ul id="subtaskList" class="d-flex flex-column gap-2 list-unstyled">${subtasksHTML}</ul>
  `
}
