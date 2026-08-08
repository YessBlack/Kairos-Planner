export const Form = () => {
  return `
    <form class="d-flex flex-column gap-3 form">
    <legend class="formTitle">Nueva Tarea</legend>

    <div class="group d-flex flex-column">
      <label for="name" class="fw-semibold">Nombre</label>
      <input type="text" id="name" placeholder="¿Qué necesitas hacer?" class="p-2 border rounded-2">
    </div>

    <div class="group d-flex flex-column">
      <label for="description" class="fw-semibold">Descripción</label>
      <textarea class="p-2 border rounded-2" name="description" id="description"
        placeholder="Añade detalles adicionales..."></textarea>
    </div>

    <div class="group d-flex flex-column">
      <label for="description" class="fw-semibold">Estado</label>
      <select name="select" class="p-2 p-2 border rounded-2">
        <option value="noStarted">No Empezado</option>
        <option value="value2" selected>En Progreso</option>
        <option value="value3">Completado</option>
        <option value="value3">Cancelado</option>
      </select>
    </div>

    <div class="group d-flex flex-column">
      <label for="deadline" class="fw-semibold">Fecha de vencimiento</label>
      <input type="date" class="p-2 p-2 border rounded-2" id="deadline" placeholder="mm/dd/yyyy">
    </div>

    <button type="submit" class="btn btnAdd">
      <i data-lucide="plus" width="16" height="16"></i>
      <span>Agregar tarea</span>
    </button>

  </form>
  `
}
