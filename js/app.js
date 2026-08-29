import { refreshTaskList, renderFilters } from './views/renderFilters.js'
import { renderForm } from './views/renderForm.js'
import { renderHeader } from './views/renderHeader.js'
import { renderModalDelete } from './views/renderModalDelete.js'
import { renderModalEdit } from './views/renderModalEdit.js'
import { initSubtaskModal } from './views/renderModalSubtaks.js'

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
