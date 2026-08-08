import { tasks } from '../__mock/task.js'
import { TaskCard } from '../components/CardTask.js'

export const renderTasks = () => {
  const container = document.getElementById('taskList')
  container.innerHTML = tasks.map(TaskCard).join('')
}
