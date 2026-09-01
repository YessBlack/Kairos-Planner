import { Alert } from '../components/ui/Alert.js'
import { Modal } from '../components/ui/Modal.js'
import { taskManager } from '../services/instances.js'
import { mountModal } from '../utils/mountModal.js'
import { triggerToast } from '../utils/triggerToast.js'
import { renderFilters } from './renderFilters.js'

export const renderModalDelete = () => {
  const modalId = 'modalDeleteTask'

  const htmlAlert = Alert({
    type: 'danger',
    text: 'Una vez eliminada, no podrás recuperarla y perderás todo su progreso y el de sus subtareas e información relacionada con esta tarea.',
    title: '¿Estás seguro de que deseas eliminar esta tarea?',
    icon: 'trash-2'
  })

  const buttonDelete = `
    <div class="d-flex flex-column">
      ${htmlAlert}
       <button type="button" class="btn btnDelete" id="btnDeleteTask">
        <i data-lucide="save" width="16" height="16"></i>
        <span>Sí seguro, eliminar</span>
      </button>
    </div>
  `

  const modalHTML = Modal({
    id: modalId,
    title: 'Eliminar Tarea',
    children: buttonDelete
  })

  const modalEl = mountModal(modalHTML, modalId)

  const btnDelete = modalEl.querySelector('#btnDeleteTask')

  if (!btnDelete) {
    console.warn('No se encontró el botón de eliminar en el modal')
    return
  }

  modalEl.addEventListener('show.bs.modal', (event) => {
    const triggerEl = event.relatedTarget
    const taskId = triggerEl?.dataset.taskId

    if (!taskId) {
      console.warn('El elemento que abrió el modal no trae data-task-id')
    }

    btnDelete.dataset.taskId = taskId
  })

  btnDelete.addEventListener('click', (event) => {
    const taskId = event.currentTarget.dataset.taskId
    taskManager.deleteTask(taskId)
    triggerToast('Tarea eliminada correctamente', 'success')
    renderFilters()

    // eslint-disable-next-line no-undef
    const modalInstance = bootstrap.Modal.getInstance(modalEl)
    modalInstance?.hide()
  })
}
