import { refreshTaskList, renderFilters } from './views/renderFilters.js'
import { renderForm } from './views/renderForm.js'
import { renderHeader } from './views/renderHeader.js'
import { renderModalDelete } from './views/renderModalDelete.js'
import { renderModalEdit } from './views/renderModalEdit.js'
import { initSubtaskModal } from './views/renderModalSubtaks.js'
import { renderCalendar } from './views/renderCalendar.js'
import { taskManager } from './services/instances.js'

const init = async () => {
  renderHeader()
  renderForm()
  renderCalendar()
  renderFilters()
  initSubtaskModal(refreshTaskList)
  renderModalEdit()
  renderModalDelete()
  await taskManager.loadTasks()
  renderFilters()

  // eslint-disable-next-line no-undef
  lucide.createIcons()
}

init()
