export const getStatusMarkup = (task) => {
  if (task.completed) {
    return `<span class="status-badge status-badge-success">${task.statusText}</span>`
  }

  if (task.canceled) {
    return `<span class="status-badge status-badge-danger">${task.statusText}</span>`
  }

  if (task.statusText) {
    return `<span class="fw-semibold text-${task.statusTextColor}">${task.statusText}</span>`
  }

  return ''
}
