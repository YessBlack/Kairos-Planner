export const FilterCard = (filter) => {
  const filterClass = filter.type.toLowerCase().replace('_', '-')

  return `
    <div class="filter d-flex align-items-center gap-3 ${filterClass} ${filter.defaultActive ? 'active' : ''}" data-filter-type="${filter.type}" style="--filter-percent: ${filter.percent}%;">
      <div class="filter-body">
        <h5 class="filter-title">${filter.title}</h5>
        <p class="filter-text">${filter.text}</p>
      </div>
      <span class="filter-count">${filter.count}</span>
    </div>
  `
}
