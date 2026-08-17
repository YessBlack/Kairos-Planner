import { filters, getTaskStatus } from '../__mock/filters.js'
import { tasks } from '../__mock/task.js'
import { Alert } from '../components/Alert.js'
import { TaskCard } from '../components/CardTask.js'
import { FilterCard } from '../components/FilterCard.js'
import { refreshIcons } from '../utils/refreshIcons.js'
import { fillSubtaskModal } from './renderModalSubtaks.js'

let currentFilter = 'all'

export const renderFilters = () => {
  const container = document.getElementById('filters')
  container.innerHTML = filters.map(FilterCard).join('')
  attachFilterEvents(container)
  attachTaskListEvents()

  renderTasks('all')
}

const attachFilterEvents = (container) => {
  container.querySelectorAll('.filter').forEach((filterEl) => {
    filterEl.addEventListener('click', () => {
      container.querySelectorAll('.filter').forEach((el) => el.classList.remove('active'))
      filterEl.classList.add('active')

      const type = filterEl.dataset.filterType
      handleFilterClick(type)
    })
  })
}

const attachTaskListEvents = () => {
  const tasksContainer = document.getElementById('taskList')

  tasksContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('.btnOpenSubtasks')

    if (!btn) return

    const taskId = btn.dataset.taskId
    const task = tasks.find((t) => t.id === taskId)

    fillSubtaskModal(task)
  })
}

const handleFilterClick = (type) => {
  currentFilter = type
  renderTasks(currentFilter)
}

const renderTasks = (type) => {
  const filtered = type === 'all'
    ? tasks
    : tasks.filter((task) => getTaskStatus(task) === type)

  const tasksContainer = document.getElementById('taskList')

  if (filtered.length === 0) {
    tasksContainer.innerHTML = Alert({
      type: 'info',
      title: 'No hay tareas con este estado',
      text: 'Cuando agregues o actualices tareas que coincidan con este filtro, aparecerán aquí.',
      icon: 'inbox'
    })
  } else {
    tasksContainer.innerHTML = filtered.map(TaskCard).join('')
  }

  refreshIcons()
}

export const refreshTaskList = () => {
  renderTasks(currentFilter)
}
