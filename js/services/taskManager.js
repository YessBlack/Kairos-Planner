/* eslint-disable space-before-function-paren */
import { TASK_STATUS } from '../constants/taskConstants.js'

export class TaskManager {
  constructor(currentId = 1) {
    this.tasks = []
    this.currentId = currentId
  }

  getTasks() {
    return [...this.tasks]
  }

  addTask(task) {
    const isCancelled = task.status === TASK_STATUS.CANCELLED
    const isCompleted = task.status === TASK_STATUS.COMPLETED

    const taskData = {
      id: crypto.randomUUID(),
      deadline: task.deadline,
      description: task.description || '',
      status: task.status || TASK_STATUS.NOT_STARTED,
      title: task.title,
      completed: isCompleted,
      canceled: isCancelled,
      subtasks: []
    }

    this.tasks.push(taskData)
    return task
  }
}
