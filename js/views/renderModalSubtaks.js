import { Modal } from '../components/Modal.js'
import { SubtaskCard } from '../components/SubTask/SubtaskCard.js'
import { SubtaskForm } from '../components/SubTask/SubtaskForm.js'
import { mountModal } from '../utils/mountModal.js'
import { refreshIcons } from '../utils/refreshIcons.js'

export const renderSubtaskForm = () => {
  const modalId = 'staticBackdrop'

  const modalHTML = Modal({
    id: modalId,
    title: 'Agregar Subtareas',
    children: SubtaskForm('task')
  })

  mountModal(modalHTML, modalId)

  const form = document.querySelector('#subtaskForm')
  const input = document.querySelector('#subtaskInput')
  const list = document.querySelector('#subtaskList')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const text = input.value.trim()

    if (!text) return

    list.insertAdjacentHTML('beforeend', SubtaskCard(text))
    refreshIcons()

    input.value = ''
    input.focus()
  })

  list.addEventListener('click', (event) => {
    const btnRemove = event.target.closest('.btnRemoveSubtask')

    if (!btnRemove) return

    btnRemove.closest('li').remove()
  })
}
