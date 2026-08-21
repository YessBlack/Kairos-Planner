import { Form } from '../components/layout/Form.js'
import { Modal } from '../components/ui/Modal.js'
import { mountModal } from '../utils/mountModal.js'

export const renderModalEdit = () => {
  const modalId = 'modalEditTask'

  const modalHTML = Modal({
    id: modalId,
    title: 'Editar Tarea',
    children: Form('task')
  })

  mountModal(modalHTML, modalId)

  const btnEditTask = document.getElementById('btnEditTask')
  btnEditTask.addEventListener('submit', event => {
    event.preventDefault()

    // TODO: Funcionalidad para editar
  })
}
