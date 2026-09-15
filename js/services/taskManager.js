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

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId)
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

  updateTask(taskId, updatedData) {
    const taskSearch = this.tasks.find((task) => task.id === taskId)

    if (!taskSearch) {
      console.warn(`No se encontró la tarea con id: ${taskId}`)
      return null
    }

    const updatedTask = {
      ...taskSearch,
      ...updatedData
    }

    if (updatedData.status) {
      updatedTask.completed = updatedData.status === TASK_STATUS.COMPLETED
      updatedTask.canceled = updatedData.status === TASK_STATUS.CANCELLED
    }

    const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
    this.tasks[taskIndex] = updatedTask
    this._saveTasks()
    return updatedTask
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)
    this._saveTasks()
  }
}
