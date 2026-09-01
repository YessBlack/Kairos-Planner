/* eslint-disable space-before-function-paren */
import { seedTasks } from '../__mock/task.js'
import { TASK_STATUS } from '../constants/taskConstants.js'

const STORAGE_KEY = 'tasks'

export class TaskManager {
  constructor(currentId = 1) {
    this.tasks = this._loadTasks()
    this.currentId = currentId
  }

  _loadTasks() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)

      this._saveTasksTo(seedTasks)
      return seedTasks
    } catch {
      return []
    }
  }

  _saveTasksTo(data) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  _saveTasks() {
    this._saveTasksTo(this.tasks)
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
    this._saveTasks()
    return taskData
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)
    this._saveTasks()
  }
}
