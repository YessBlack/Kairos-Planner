import { filters } from '../__mock/filters.js'
import { FilterCard } from '../components/FilterCard.js'

export const renderFilters = () => {
  const container = document.getElementById('filters')
  container.innerHTML = filters.map(FilterCard).join('')
  attachFilterEvents(container)
}

const attachFilterEvents = (container) => {
  container.querySelectorAll('.filter').forEach((filterEl) => {
    filterEl.addEventListener('click', () => {
      container.querySelectorAll('.filter').forEach((el) => el.classList.remove('active'))

      filterEl.classList.add('active')

      const type = filterEl.dataset.filterType
      handleFilterClick(type)
    })
  })
}

const handleFilterClick = (type) => {
  console.log('Filtro seleccionado:', type)
}
