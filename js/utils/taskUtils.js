const STATUS_LABELS = {
  cancelled: { label: 'Cancelada', className: 'status-badge-danger' },
  completed: { label: 'Completada', className: 'status-badge-success' },
  'no-started': { label: 'No iniciada', className: 'status-badge-secondary' },
  'in-progress': { label: 'En progreso', className: 'status-badge-info' }
}

export const getTaskStatus = (task) => {
  if (task.canceled) return 'cancelled'
  if (task.completed) return 'completed'
  if (task.percent === 0) return 'no-started'
  return 'in-progress'
}

export const getStatusBadge = (task) => {
  const status = getTaskStatus(task)
  const { label, className } = STATUS_LABELS[status]
  return `<span class="status-badge ${className}">${label}</span>`
}

export const getUrgencyMarkup = (task) => {
  const status = getTaskStatus(task)
  if (status !== 'in-progress' || !task.statusText) return ''
  return `<span class="text-${task.statusTextColor}">${task.statusText}</span>`
}

export const getTaskProgress = (task) => {
  const total = task.subtasks.length
  const done = task.subtasks.filter((s) => s.done).length
  const percent = total ? Math.round((done / total) * 100) : 0
  return { total, done, percent }
}
