import { TaskCard } from '../components/tasks/TaskCard.js'
import { taskManager } from '../services/instances.js'
import { refreshIcons } from '../utils/refreshIcons.js'

export const renderTasks = () => {
  const tasks = taskManager.getTasks()
  const container = document.getElementById('taskList')
  container.innerHTML = tasks.map(TaskCard).join('')
  refreshIcons()
}
