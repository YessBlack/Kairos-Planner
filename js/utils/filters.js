import { taskManager } from '../services/instances.js'
import { getTaskStatus } from './taskUtils.js'
import { TASK_STATUS } from '../constants/taskConstants.js'

const pct = (count, total) => (total ? Math.round((count / total) * 100) : 0)

export const getFilters = () => {
  const tasks = taskManager.getTasks()
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
      type: TASK_STATUS.NOT_STARTED,
      title: 'No iniciadas',
      text: `Tienes ${countByType[TASK_STATUS.NOT_STARTED] || 0} Tareas activas no iniciadas lo que corresponde a ${pct(countByType[TASK_STATUS.NOT_STARTED] || 0, total)}%`,
      count: countByType[TASK_STATUS.NOT_STARTED] || 0,
      percent: pct(countByType[TASK_STATUS.NOT_STARTED] || 0, total)
    },
    {
      type: TASK_STATUS.IN_PROGRESS,
      title: 'En progreso',
      text: `Tienes ${countByType[TASK_STATUS.IN_PROGRESS] || 0} Tareas activas en progreso lo que corresponde a ${pct(countByType[TASK_STATUS.IN_PROGRESS] || 0, total)}%`,
      count: countByType[TASK_STATUS.IN_PROGRESS] || 0,
      percent: pct(countByType[TASK_STATUS.IN_PROGRESS] || 0, total)
    },
    {
      type: TASK_STATUS.COMPLETED,
      title: 'Completadas',
      text: `Tienes ${countByType[TASK_STATUS.COMPLETED] || 0} Tareas completadas lo que corresponde a ${pct(countByType[TASK_STATUS.COMPLETED] || 0, total)}%`,
      count: countByType[TASK_STATUS.COMPLETED] || 0,
      percent: pct(countByType[TASK_STATUS.COMPLETED] || 0, total)
    },
    {
      type: TASK_STATUS.CANCELLED,
      title: 'Canceladas',
      text: `Tienes ${countByType[TASK_STATUS.CANCELLED] || 0} Tareas canceladas lo que corresponde a ${pct(countByType[TASK_STATUS.CANCELLED] || 0, total)}%`,
      count: countByType[TASK_STATUS.CANCELLED] || 0,
      percent: pct(countByType[TASK_STATUS.CANCELLED] || 0, total)
    }
  ]
}
