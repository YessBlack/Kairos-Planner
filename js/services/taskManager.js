/* eslint-disable space-before-function-paren */
import { TASK_STATUS } from '../constants/taskConstants.js'

const API_URL = 'https://kairos-planner-api.onrender.com/api/tasks'

const toTaskRequestPayload = (task) => ({
  title: task.title,
  description: task.description || '',
  deadline: task.deadline || null,
  status: task.status || TASK_STATUS.NOT_STARTED,
  subtasks: (task.subtasks || []).map(({ text, done }) => ({ text, done }))
})

const hasTaskId = (task, taskId) => String(task.id) === String(taskId)

export class TaskManager {
  constructor() {
    this.tasks = []
  }

  async _request(path = '', options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(errorBody || `Error en la petición: ${response.status}`)
    }

    if (response.status === 204) return null
    return response.json()
  }

  async loadTasks() {
    try {
      this.tasks = await this._request()
      return this.tasks
    } catch (err) {
      this.tasks = []
      return []
    }
  }

  getTasks() {
    return [...this.tasks]
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => hasTaskId(task, taskId))
  }

  async addTask(task) {
    const taskData = toTaskRequestPayload(task)

    const created = await this._request('', {
      method: 'POST',
      body: JSON.stringify(taskData)
    })

    this.tasks.push(created)
    return created
  }

  async updateTask(taskId, updatedData) {
    const taskSearch = this.tasks.find((task) => hasTaskId(task, taskId))

    if (!taskSearch) {
      return null
    }

    const payload = toTaskRequestPayload({ ...taskSearch, ...updatedData })

    const updatedTask = await this._request(`/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })

    const taskIndex = this.tasks.findIndex((task) => hasTaskId(task, taskId))
    this.tasks[taskIndex] = updatedTask
    return updatedTask
  }

  async deleteTask(taskId) {
    await this._request(`/${taskId}`, { method: 'DELETE' })
    this.tasks = this.tasks.filter((task) => !hasTaskId(task, taskId))
  }
}
