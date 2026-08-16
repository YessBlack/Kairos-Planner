const defaultIcons = {
  primary: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  info: 'info',
  danger: 'circle-alert'
}

export const Alert = ({ type = 'info', text = '', title = '', icon } = {}) => {
  const iconName = icon || defaultIcons[type] || 'info'

  return `
    <div class="alert alert-${type} d-flex align-items-center gap-3 flex-column" role="alert">
      <span class="title-${type}">${title}</span>
      <div class="d-flex align-items-center gap-3">
        <i data-lucide="${iconName}" width="18" height="18" class="flex-shrink-0"></i>
        <div>${text}</div>
      </div>
    </div>
  `
}
