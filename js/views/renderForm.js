import { Form } from '../components/Form.js'
import { validFormAddTask } from '../utils/formValid.js'
import { triggerToast } from '../utils/triggerToast.js'

export const renderForm = () => {
  const form = document.getElementById('form')
  form.innerHTML = Form()

  const taskForm = document.querySelector('#taskForm')

  taskForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(taskForm)
    const data = Object.fromEntries(formData.entries())

    const esValido = validFormAddTask(data)

    if (esValido) {
      console.log('Formulario válido, procesando tarea...', data)
      // TODO: Enviar datos

      triggerToast('Tarea creada correctamente', 'success')
    }
  })
}
