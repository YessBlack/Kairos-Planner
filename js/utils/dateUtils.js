export const getDateNow = () => {
  const date = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}

export const formatDeadline = (deadline) => {
  if (!deadline) return 'Sin fecha'
  const date = new Date(deadline)
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}
