import { Calendar } from '../components/layout/Calendar.js'
import { TASK_STATUS } from '../constants/taskConstants.js'
import { taskManager } from '../services/instances.js'
import { capitalize, eventColors, getWeekRange, parseDate, viewLabels } from '../utils/calendarUtils.js'
import { formatDeadline } from '../utils/dateUtils.js'
import { getTaskStatus } from '../utils/taskUtils.js'

let calendar = null

const updateAgendaStatus = (tasks) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { start, end } = getWeekRange(today)

  const activeTasks = tasks.filter((task) => {
    const status = task.status
    return status !== TASK_STATUS.COMPLETED && status !== TASK_STATUS.CANCELLED && !task.completed && !task.canceled
  })

  const tasksThisWeek = activeTasks.filter((task) => {
    const deadline = parseDate(task.deadline)
    return deadline && deadline >= start && deadline <= end
  })

  const overdueTasks = activeTasks.filter((task) => {
    const deadline = parseDate(task.deadline)
    return deadline && deadline < today
  })

  const nextTask = activeTasks
    .map((task) => ({ task, deadline: parseDate(task.deadline) }))
    .filter(({ deadline }) => deadline && deadline >= today)
    .sort((first, second) => first.deadline - second.deadline)[0]

  document.getElementById('nextDeadline').textContent = nextTask
    ? `${nextTask.task.title} (${formatDeadline(nextTask.deadline)})`
    : 'Sin próximas tareas'

  document.getElementById('activeTasksCount').textContent = `${tasksThisWeek.length} ${tasksThisWeek.length === 1 ? 'tarea' : 'tareas'}`
  document.getElementById('overdueTasksCount').textContent = `${overdueTasks.length} ${overdueTasks.length === 1 ? 'tarea' : 'tareas'}`
}

const getEventStyle = (task) => {
  const status = getTaskStatus(task)

  if (status === TASK_STATUS.CANCELLED) {
    return { color: eventColors.cancelled, classNames: ['is-cancelled', 'event-cancelled'] }
  }

  if (status === TASK_STATUS.COMPLETED) {
    return { color: eventColors.completed, classNames: ['event-completed'] }
  }

  const deadline = parseDate(task.deadline)
  const today = new Date()

  today.setHours(0, 0, 0, 0)

  if (deadline < today) return { color: eventColors.overdue, classNames: ['event-overdue'] }
  if (status === TASK_STATUS.NOT_STARTED) return { color: eventColors.upcoming, classNames: ['event-upcoming'] }
  if (deadline.getTime() === today.getTime()) return { color: eventColors.today, classNames: ['event-today'] }

  return { color: eventColors.upcoming, classNames: ['event-upcoming'] }
}

const getEvents = (tasks) => {
  return tasks
    .filter((task) => task.deadline)
    .map((task) => ({
      id: task.id,
      title: task.title,
      start: task.deadline,
      ...getEventStyle(task)
    }))
}

export const refreshCalendar = () => {
  const tasks = taskManager.getTasks()
  updateAgendaStatus(tasks)

  if (!calendar) return

  calendar.removeAllEvents()
  calendar.addEventSource(getEvents(tasks))
}

export const renderCalendar = () => {
  const container = document.getElementById('agenda')

  container.innerHTML = Calendar()

  const calendarEl = container.querySelector('#calendar')
  const wrapper = container.querySelector('#calendarWrapper')
  const toggleBtn = container.querySelector('#toggleBtn')
  const toggleLabel = container.querySelector('#toggleLabel')
  const monthLabel = container.querySelector('#monthLabel')
  const viewBadge = container.querySelector('#viewBadge')
  const viewButtons = container.querySelectorAll('.view-switch-btn')
  let isExpanded = false

  const currentMonth = new Date().toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  })

  monthLabel.textContent = capitalize(currentMonth)

  const initCalendar = () => {
    if (calendar) return

    calendar = new window.FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: false,
      locale: 'es',
      height: 'auto',
      events: getEvents(taskManager.getTasks()),
      datesSet: (info) => {
        monthLabel.textContent = capitalize(info.view.title)
      }
    })

    calendar.render()
  }

  updateAgendaStatus(taskManager.getTasks())

  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded
    toggleLabel.textContent = isExpanded ? 'Minimizar' : 'Expandir'
    toggleBtn.setAttribute('aria-expanded', String(isExpanded))

    if (isExpanded) {
      initCalendar()
      wrapper.classList.add('expanded')
      toggleBtn.classList.add('is-expanded')
      setTimeout(() => calendar && calendar.updateSize(), 50)
    } else {
      wrapper.classList.remove('expanded')
      toggleBtn.classList.remove('is-expanded')
    }
  })

  container.querySelector('#prevBtn').addEventListener('click', () => {
    if (calendar) calendar.prev()
  })

  container.querySelector('#nextBtn').addEventListener('click', () => {
    if (calendar) calendar.next()
  })

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const viewName = button.dataset.view
      viewButtons.forEach((item) => item.classList.remove('active'))
      button.classList.add('active')
      viewBadge.textContent = viewLabels[viewName]

      if (!isExpanded) toggleBtn.click()
      if (calendar) calendar.changeView(viewName)
    })
  })
}
