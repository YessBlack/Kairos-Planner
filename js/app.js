import { getDateNow } from './utils/dateUtils.js'
import { renderFilters } from './views/renderFilters.js'
import { renderForm } from './views/renderForm.js'
import { renderHeader } from './views/renderHeader.js'
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

  // eslint-disable-next-line no-undef
  lucide.createIcons()
}

init()
