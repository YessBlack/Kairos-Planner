import { Modal } from '../components/Modal.js'
import { SubtaskForm } from '../components/SubTask/SubtaskForm.js'
import { SubtaskCard } from '../components/SubTask/SubtaskCard.js'
import { mountModal } from '../utils/mountModal.js'
import { refreshIcons } from '../utils/refreshIcons.js'

const modalId = 'modalAddSubtask'
let modalEl = null

export const initSubtaskModal = (onClose) => {
  const modalHTML = Modal({
    id: modalId,
    title: 'Subtareas',
    children: SubtaskForm([])
  })

  modalEl = mountModal(modalHTML, modalId)

  if (onClose) {
    modalEl.addEventListener('hidden.bs.modal', onClose)
  }
}

export const fillSubtaskModal = (task) => {
  const body = modalEl.querySelector('.modal-body')
  body.innerHTML = SubtaskForm(task.subtasks)
  refreshIcons()

  const form = body.querySelector('#subtaskForm')
  const input = body.querySelector('#subtaskInput')
  const list = body.querySelector('#subtaskList')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (!text) return

    const newSubtask = { id: crypto.randomUUID(), text, done: false }
    task.subtasks.push(newSubtask)

    list.insertAdjacentHTML('beforeend', SubtaskCard(newSubtask))
    refreshIcons()

    input.value = ''
    input.focus()
  })

  list.addEventListener('click', (event) => {
    const btnRemove = event.target.closest('.btnRemoveSubtask')
    if (btnRemove) {
      const li = btnRemove.closest('li')
      task.subtasks = task.subtasks.filter((s) => s.id !== li.dataset.subtaskId)
      li.remove()
      return
    }

    const btnToggle = event.target.closest('.btnToggleSubtask')

    if (btnToggle) {
      const li = btnToggle.closest('li')
      const subtask = task.subtasks.find((s) => s.id === li.dataset.subtaskId)
      subtask.done = !subtask.done

      li.classList.toggle('is-done', subtask.done)

      const icon = subtask.done ? 'check-circle-2' : 'circle'
      btnToggle.innerHTML = `<i data-lucide="${icon}" width="16" height="16"></i>`

      refreshIcons()
    }
  })
}
