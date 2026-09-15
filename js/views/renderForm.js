import { Form } from '../components/layout/Form.js'
import { taskManager } from '../services/instances.js'
import { validFormAddTask } from '../utils/formValid.js'
import { triggerToast } from '../utils/triggerToast.js'
import { renderFilters } from './renderFilters.js'

export const renderForm = () => {
  const form = document.getElementById('form')
  form.innerHTML = Form()

  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const todayStr = `${year}-${month}-${day}`

  const deadlineInput = document.getElementById('deadline')
  if (deadlineInput) {
    deadlineInput.min = todayStr
  }

  const taskForm = document.querySelector('#taskForm')

  taskForm.addEventListener('submit', async event => {
    event.preventDefault()

    const formData = new FormData(taskForm)
    const data = Object.fromEntries(formData.entries())

    const esValido = validFormAddTask(data)

    if (esValido) {
      try {
        await taskManager.addTask(data)
        renderFilters()
        event.target.reset()
        triggerToast('Tarea creada correctamente', 'success')
      } catch (error) {
        triggerToast(`No se pudo crear la tarea: ${error.message}`, 'error')
      }
    }
  })
}
