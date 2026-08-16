export const mountModal = (html, id) => {
  const existing = document.getElementById(id)

  if (existing) existing.remove()

  document.body.insertAdjacentHTML('beforeend', html)
  return document.getElementById(id)
}
