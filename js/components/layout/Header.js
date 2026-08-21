import { getDateNow } from '../../utils/dateUtils.js'

export const Header = () => {
  return `
    <div class="container d-flex justify-content-between align-items-center">
      <a href="#" class="d-flex align-items-center gap-3 text-decoration-none">
        <img src="img/logo.png" alt="Logo de Kairos Planner" class="logo">
        <div class="logo-text">
          <p class="mb-0">Kairos</p>
          <span class="fw-bold">PLANNER</span>
        </div>
      </a>
      <div class="date">
        <i data-lucide="calendar" width="20" height="20"></i>
        <span id="current-date">${getDateNow()}</span>
      </div>
    </div>
  `
}
