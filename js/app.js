import { TaskManager } from './services/taskManager.js'
import { refreshTaskList, renderFilters } from './views/renderFilters.js'
import { renderForm } from './views/renderForm.js'
import { renderHeader } from './views/renderHeader.js'
import { renderModalDelete } from './views/renderModalDelete.js'
import { renderModalEdit } from './views/renderModalEdit.js'
import { initSubtaskModal } from './views/renderModalSubtaks.js'

// Prueba tarea 4 - Parte 1
const taskManager = new TaskManager()
console.log(taskManager.tasks)

const init = () => {
  renderHeader()
  renderForm()
  renderFilters()
  initSubtaskModal(refreshTaskList)
  renderModalEdit()
  renderModalDelete()

  // eslint-disable-next-line no-undef
  lucide.createIcons()
}

init()
