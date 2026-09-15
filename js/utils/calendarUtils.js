export const viewLabels = {
  dayGridMonth: 'Vista Mes',
  timeGridWeek: 'Vista Semana',
  timeGridDay: 'Vista Día'
}

export const eventColors = {
  overdue: '#ef4444',
  today: '#f59e0b',
  upcoming: '#3b82f6',
  completed: '#16b981',
  cancelled: '#94a3b8'
}

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

export const parseDate = (dateString) => {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setHours(0, 0, 0, 0)
  return date
}

export const getWeekRange = (date) => {
  const start = new Date(date)
  const day = start.getDay() || 7
  start.setDate(start.getDate() - day + 1)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return { start, end }
}

export const formatDeadline = (date) => date.toLocaleDateString('es-ES', {
  weekday: 'short',
  day: 'numeric'
}).replace('.', '')
