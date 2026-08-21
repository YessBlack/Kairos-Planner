import { tasks } from './task.js'

export const getTaskStatus = (task) => {
  if (task.canceled) return 'cancelled'
  if (task.completed) return 'completed'
  if (task.percent === 0) return 'no-started'
  return 'in-progress'
}

const pct = (count, total) => (total ? Math.round((count / total) * 100) : 0)

export const getFilters = () => {
  const total = tasks.length
  const countByType = tasks.reduce((acc, task) => {
    const status = getTaskStatus(task)
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  return [
    {
      type: 'all',
      title: 'Todas',
      text: `Tienes ${total} Tareas activas en total lo que corresponde al 100%`,
      count: total,
      percent: 100
    },
    {
      type: 'no-started',
      title: 'No iniciadas',
      text: `Tienes ${countByType['no-started'] || 0} Tareas activas no iniciadas lo que corresponde a ${pct(countByType['no-started'] || 0, total)}%`,
      count: countByType['no-started'] || 0,
      percent: pct(countByType['no-started'] || 0, total)
    },
    {
      type: 'in-progress',
      title: 'En progreso',
      text: `Tienes ${countByType['in-progress'] || 0} Tareas activas en progreso lo que corresponde a ${pct(countByType['in-progress'] || 0, total)}%`,
      count: countByType['in-progress'] || 0,
      percent: pct(countByType['in-progress'] || 0, total)
    },
    {
      type: 'completed',
      title: 'Completadas',
      text: `Tienes ${countByType.completed || 0} Tareas completadas lo que corresponde a ${pct(countByType.completed || 0, total)}%`,
      count: countByType.completed || 0,
      percent: pct(countByType.completed || 0, total)
    },
    {
      type: 'cancelled',
      title: 'Canceladas',
      text: `Tienes ${countByType.cancelled || 0} Tareas canceladas lo que corresponde a ${pct(countByType.cancelled || 0, total)}%`,
      count: countByType.cancelled || 0,
      percent: pct(countByType.cancelled || 0, total)
    }
  ]
}
