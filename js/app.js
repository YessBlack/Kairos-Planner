import { getDateNow } from './utils/dateUtils.js'
import { renderFilters } from './views/renderFilters.js'
import { renderForm } from './views/renderForm.js'
import { renderHeader } from './views/renderHeader.js'
import { renderModalDelete } from './views/renderModalDelete.js'
import { renderModalEdit } from './views/renderModalEdit.js'
import { renderSubtaskForm } from './views/renderModalSubtaks.js'
import { renderTasks } from './views/renderTasks.js'

const renderDateNowHeader = () => {
  const currentDate = document.getElementById('current-date')
  currentDate.textContent = getDateNow()
}

const init = () => {
  renderHeader()
  renderDateNowHeader()
  renderForm()
  renderTasks()
  renderFilters()
  renderModalEdit()
  renderModalDelete()
  renderSubtaskForm()

  // eslint-disable-next-line no-undef
  lucide.createIcons()
}

init()
