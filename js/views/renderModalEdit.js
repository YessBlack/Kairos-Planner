import { Form } from '../components/layout/Form.js'
import { Modal } from '../components/ui/Modal.js'
import { taskManager } from '../services/instances.js'
import { mountModal } from '../utils/mountModal.js'
import { triggerToast } from '../utils/triggerToast.js'
import { renderFilters } from './renderFilters.js'

export const renderModalEdit = () => {
  const modalId = 'modalEditTask'

  const modalHTML = Modal({
    id: modalId,
    title: 'Editar Tarea',
    children: Form()
  })

  const modalEl = mountModal(modalHTML, modalId)
  const modalBody = modalEl.querySelector('.modal-body')

  modalEl.addEventListener('show.bs.modal', (event) => {
    const triggerEl = event.relatedTarget
    const taskId = triggerEl?.dataset.taskId

    if (!taskId) {
      console.warn('El elemento que abrió el modal no trae data-task-id')
      return
    }

    const task = taskManager.getTaskById(taskId)

    if (!task) {
      console.warn('No se encontró la tarea a editar')
      return
    }

    modalBody.innerHTML = Form(task)

    const formEl = modalBody.querySelector('#taskForm')

    formEl.onsubmit = (submitEvent) => {
      submitEvent.preventDefault()
      const formData = new FormData(formEl)
      const updatedData = Object.fromEntries(formData.entries())
      taskManager.updateTask(taskId, updatedData)
      triggerToast('Tarea actualizada correctamente', 'success')
      renderFilters()
      // eslint-disable-next-line no-undef
      const modalInstance = bootstrap.Modal.getInstance(modalEl)
      modalInstance?.hide()
    }
  })
}
