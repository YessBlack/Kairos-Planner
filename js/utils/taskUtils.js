import { TASK_STATUS } from '../constants/taskConstants.js'

const STATUS_LABELS = {
  [TASK_STATUS.CANCELLED]: { label: 'Cancelada', className: 'status-badge-danger' },
  [TASK_STATUS.COMPLETED]: { label: 'Completada', className: 'status-badge-success' },
  [TASK_STATUS.NOT_STARTED]: { label: 'No iniciada', className: 'status-badge-secondary' },
  [TASK_STATUS.IN_PROGRESS]: { label: 'En progreso', className: 'status-badge-info' }
}

export const getTaskStatus = (task) => {
  if (task.canceled) return TASK_STATUS.CANCELLED
  if (task.completed) return TASK_STATUS.COMPLETED

  if (task.status && Object.values(TASK_STATUS).includes(task.status)) {
    return task.status
  }

  const { done } = getTaskProgress(task)
  return done === 0 ? TASK_STATUS.NOT_STARTED : TASK_STATUS.IN_PROGRESS
}

export const getStatusBadge = (task) => {
  const status = getTaskStatus(task)
  const { label, className } = STATUS_LABELS[status]
  return `<span class="status-badge ${className}">${label}</span>`
}

export const getUrgencyMarkup = (task) => {
  const status = getTaskStatus(task)
  if (status === TASK_STATUS.COMPLETED || status === TASK_STATUS.CANCELLED || !task.deadline) return ''

  const now = new Date()
  const [year, month, day] = task.deadline.split('-').map(Number)
  const deadline = new Date(year, month - 1, day)

  now.setHours(0, 0, 0, 0)
  deadline.setHours(0, 0, 0, 0)

  const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return '<span class="text-danger">• Atrasado</span>'
  }

  if (diffDays === 0) {
    return '<span class="text-danger">• Vence hoy</span>'
  }

  if (diffDays === 1) {
    return '<span class="text-warning">• Vence mañana</span>'
  }

  return ''
}

export const getTaskProgress = (task) => {
  const total = task.subtasks.length
  const done = task.subtasks.filter((s) => s.done).length
  const percent = total ? Math.round((done / total) * 100) : 0
  return { total, done, percent }
}

export const getDateLabel = (task) => {
  const status = getTaskStatus(task)
  if (!task.deadline) return ''

  const [year, month, day] = task.deadline.split('-').map(Number)
  const deadline = new Date(year, month - 1, day)
  const formattedDate = deadline.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })

  if (status === TASK_STATUS.COMPLETED) {
    return `Completada: ${formattedDate}`
  }

  if (status === TASK_STATUS.CANCELLED) {
    return `Cancelada: ${formattedDate}`
  }

  return `Vencimiento: ${formattedDate}`
}
