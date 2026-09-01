export const Form = (task = null) => {
  return `
    <form class="d-flex flex-column gap-3 form ${task ? 'without-border' : ''}" id="taskForm">
      ${task ? '' : '<legend class="formTitle">Nueva Tarea</legend>'}

      <div id="formAlert" class="alert alert-danger d-none" role="alert"></div>

      <div class="group d-flex flex-column">
        <label for="name" class="fw-semibold d-flex align-items-center gap-2">
          Nombre
          <span style="color: red; line-height: 1;">*</span>
        </label>
        <input type="text" id="name" name="title" placeholder="¿Qué necesitas hacer?" class="p-2 border rounded-2" value="${task?.title ?? ''}">
      </div>

      <div class="group d-flex flex-column">
        <label for="description" class="fw-semibold d-flex align-items-center gap-2">
          Descripción
          <span style="color: red; line-height: 1;">*</span>
        </label>
        <textarea class="p-2 border rounded-2" name="description" id="description"
          placeholder="Añade detalles adicionales...">${task?.description ?? ''}</textarea>
      </div>

      <div class="group d-flex flex-column">
        <label for="status" class="fw-semibold d-flex align-items-center gap-2">
          Estado
          <span style="color: red; line-height: 1;">*</span>
        </label>
        <select name="status" id="status" class="p-2 border rounded-2">
          <option value="not-started" ${!task || task.status === 'not-started' ? 'selected' : ''}>No Empezado</option>
          <option value="in-progress" ${task?.status === 'in-progress' ? 'selected' : ''}>En Progreso</option>
          <option value="completed" ${task?.status === 'completed' ? 'selected' : ''}>Completado</option>
          <option value="cancelled" ${task?.status === 'cancelled' ? 'selected' : ''}>Cancelado</option>
        </select>
        ${task
      ? ''
      : '<small class="form-text">Ten en cuenta que, por defecto la tarea queda en "No Empezado". Si no cambias el estado, se guardará así.</small>'}
      </div>

      <div class="group d-flex flex-column">
        <label for="deadline" class="fw-semibold d-flex align-items-center gap-2">
          Fecha de vencimiento
          <span style="color: red; line-height: 1;">*</span>
        </label>
        <input type="date" class="p-2 border rounded-2" id="deadline" name="deadline" placeholder="mm/dd/yyyy" min="" value="${task?.deadline ?? ''}">
      </div>

      <button type="submit" class="btn btnAdd" id="${task ? 'btnEditTask' : 'btnAddTask'}">
      ${!task
      ? '<i data-lucide="plus" width="16" height="16"></i>'
      : '<i data-lucide="pencil" width="16" height="16"></i>'}
        <span>${task ? 'Editar tarea' : 'Agregar tarea'}</span>
      </button>

  </form>
  `
}
