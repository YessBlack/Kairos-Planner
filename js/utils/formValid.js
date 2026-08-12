import { triggerToast } from './triggerToast.js'

export const validFormAddTask = (data) => {
  if (!data.name || data.name.trim() === '') {
    triggerToast('El nombre no puede estar vacío.', 'error')
    return false
  }

  if (!data.description || data.description.trim() === '') {
    triggerToast('La descripción no puede estar vacía.', 'error')
    return false
  }

  if (!data.deadline) {
    triggerToast('Debes ingresar una fecha de entrega.', 'error')
    return false
  }

  const deadlineDate = new Date(data.deadline)

  if (isNaN(deadlineDate.getTime())) {
    triggerToast('La fecha de entrega no es válida.', 'error')
    return false
  }

  const todayStr = new Date().toLocaleDateString('en-CA')

  if (data.deadline < todayStr) {
    triggerToast('La fecha de entrega no puede ser anterior a hoy.', 'error')
    return false
  }

  if (!data.status) {
    triggerToast('Debes seleccionar un estado.', 'error')
    return false
  }

  return true
}
