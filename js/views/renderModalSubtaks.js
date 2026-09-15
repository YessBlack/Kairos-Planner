import { Modal } from '../components/ui/Modal.js'
import { SubtaskForm } from '../components/tasks/SubTask/SubtaskForm.js'
import { SubtaskCard } from '../components/tasks/SubTask/SubtaskCard.js'
import { mountModal } from '../utils/mountModal.js'
import { refreshIcons } from '../utils/refreshIcons.js'
import { taskManager } from '../services/instances.js'
import { triggerToast } from '../utils/triggerToast.js'

const modalId = 'modalAddSubtask'
let modalEl = null

const hasSubtaskId = (subtask, subtaskId) => String(subtask.id) === String(subtaskId)

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

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (!text) return

    const newSubtask = { id: crypto.randomUUID(), text, done: false }
    task.subtasks.push(newSubtask)

    list.insertAdjacentHTML('beforeend', SubtaskCard(newSubtask))
    refreshIcons()

    input.value = ''
    input.focus()

    try {
      await taskManager.updateTask(task.id, { subtasks: task.subtasks })
    } catch (error) {
      task.subtasks = task.subtasks.filter((subtask) => subtask.id !== newSubtask.id)
      list.querySelector(`[data-subtask-id="${newSubtask.id}"]`)?.remove()
      triggerToast(`No se pudo guardar la subtarea: ${error.message}`, 'error')
    }
  })

  list.addEventListener('click', async (event) => {
    const btnRemove = event.target.closest('.btnRemoveSubtask')
    if (btnRemove) {
      const li = btnRemove.closest('li')
      const removedSubtask = task.subtasks.find((subtask) => hasSubtaskId(subtask, li.dataset.subtaskId))
      if (!removedSubtask) return

      task.subtasks = task.subtasks.filter((subtask) => !hasSubtaskId(subtask, li.dataset.subtaskId))
      li.remove()

      try {
        await taskManager.updateTask(task.id, { subtasks: task.subtasks })
      } catch (error) {
        task.subtasks.push(removedSubtask)
        list.insertAdjacentHTML('beforeend', SubtaskCard(removedSubtask))
        refreshIcons()
        triggerToast(`No se pudo eliminar la subtarea: ${error.message}`, 'error')
      }
      return
    }

    const btnToggle = event.target.closest('.btnToggleSubtask')

    if (btnToggle) {
      const li = btnToggle.closest('li')
      const subtask = task.subtasks.find((item) => hasSubtaskId(item, li.dataset.subtaskId))
      if (!subtask) return

      subtask.done = !subtask.done

      li.classList.toggle('is-done', subtask.done)

      const icon = subtask.done ? 'check-circle-2' : 'circle'
      btnToggle.innerHTML = `<i data-lucide="${icon}" width="16" height="16"></i>`

      refreshIcons()

      try {
        await taskManager.updateTask(task.id, { subtasks: task.subtasks })
      } catch (error) {
        subtask.done = !subtask.done
        li.classList.toggle('is-done', subtask.done)
        btnToggle.innerHTML = `<i data-lucide="${subtask.done ? 'check-circle-2' : 'circle'}" width="16" height="16"></i>`
        refreshIcons()
        triggerToast(`No se pudo actualizar la subtarea: ${error.message}`, 'error')
      }
    }
  })
}
