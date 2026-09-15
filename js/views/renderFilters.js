import { Alert } from '../components/ui/Alert.js'
import { TaskCard } from '../components/tasks/TaskCard.js'
import { TaskHeader } from '../components/layout/TaskHeader.js'
import { FilterCard } from '../components/ui/FilterCard.js'
import { refreshIcons } from '../utils/refreshIcons.js'
import { fillSubtaskModal } from './renderModalSubtaks.js'
import { taskManager } from '../services/instances.js'
import { getFilters } from '../utils/filters.js'
import { getTaskStatus } from '../utils/taskUtils.js'
import { TASK_STATUS } from '../constants/taskConstants.js'
import { refreshCalendar } from './renderCalendar.js'

let searchTerm = ''
let sortDirection = 'date-asc'
let currentFilter = 'all'

export const renderFilters = () => {
  const filtersContainer = document.getElementById('filters')
  const filters = getFilters().map((filter) => ({
    ...filter,
    defaultActive: filter.type === currentFilter
  }))

  filtersContainer.innerHTML = filters.map(FilterCard).join('')
  attachFilterEvents(filtersContainer)

  const header = document.getElementById('taskHeader')
  header.innerHTML = TaskHeader()

  attachTaskHeaderEvents(header)
  attachTaskListEvents()
  renderTasks()
}

const attachFilterEvents = (container) => {
  container.querySelectorAll('.filter').forEach((filterEl) => {
    filterEl.addEventListener('click', () => {
      container.querySelectorAll('.filter').forEach((element) => element.classList.remove('active'))
      filterEl.classList.add('active')
      currentFilter = filterEl.dataset.filterType
      renderTasks()
    })
  })
}

const attachTaskHeaderEvents = (header) => {
  const searchInput = header.querySelector('#taskSearchInput')
  const sortSelect = header.querySelector('#taskSortSelect')

  searchInput.value = searchTerm
  sortSelect.value = sortDirection

  searchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value.trim().toLowerCase()
    renderTasks()
  })

  sortSelect.addEventListener('change', (event) => {
    sortDirection = event.target.value
    renderTasks()
  })
}

const attachTaskListEvents = () => {
  const tasksContainer = document.getElementById('taskList')

  tasksContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('.btnOpenSubtasks')
    if (!btn) return

    const taskId = btn.dataset.taskId
    const tasks = taskManager.getTasks()
    const task = tasks.find((t) => t.id === taskId)

    fillSubtaskModal(task)
  })

  tasksContainer.addEventListener('change', (event) => {
    const checkbox = event.target.closest('.btnCompleteTask')
    if (!checkbox) return

    const taskId = checkbox.dataset.taskId
    toggleTaskCompleted(taskId, checkbox.checked)
  })
}

const renderTasks = () => {
  const tasks = taskManager.getTasks()

  const filtered = tasks
    .filter((task) => currentFilter === 'all' || getTaskStatus(task) === currentFilter)
    .filter((task) => {
      const searchableText = `${task.title} ${task.description}`.toLowerCase()
      return searchableText.includes(searchTerm)
    })
    .sort((first, second) => {
      const firstDate = first.deadline || ''
      const secondDate = second.deadline || ''
      return sortDirection === 'date-asc'
        ? firstDate.localeCompare(secondDate)
        : secondDate.localeCompare(firstDate)
    })

  const tasksContainer = document.getElementById('taskList')

  if (filtered.length === 0) {
    tasksContainer.innerHTML = Alert({
      type: 'info',
      title: 'No hay tareas que coincidan',
      text: 'Prueba con otro término de búsqueda para encontrar una tarea.',
      icon: 'inbox'
    })
  } else {
    tasksContainer.innerHTML = filtered.map(TaskCard).join('')
  }

  refreshIcons()
  refreshCalendar()
}

const toggleTaskCompleted = (taskId, isCompleted) => {
  const tasks = taskManager.getTasks()
  const task = tasks.find((t) => t.id === taskId)
  if (!task) return

  task.completed = isCompleted

  if (isCompleted) {
    task.subtasks = task.subtasks.map((sub) => ({ ...sub, done: true }))
    task.status = TASK_STATUS.COMPLETED
  } else {
    task.status = TASK_STATUS.NOT_STARTED
  }

  renderFilters()
}

export const refreshTaskList = () => {
  renderTasks()
  refreshIcons()
}
