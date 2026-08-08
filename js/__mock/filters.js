export const filters = [
  {
    type: 'all',
    title: 'Todas',
    text: 'Tienes 10 Tareas activas no iniciadas lo que corresponde a 10%',
    count: 10,
    percent: 100,
    defaultActive: true
  },
  {
    type: 'no-started',
    title: 'No iniciadas',
    text: 'Tienes 10 Tareas activas no iniciadas lo que corresponde a 10%',
    count: 10,
    percent: 10
  },
  {
    type: 'in-progress',
    title: 'En progreso',
    text: 'Tienes 10 Tareas activas en progreso lo que corresponde a 10%',
    count: 10,
    percent: 45
  },
  {
    type: 'completed',
    title: 'Completadas',
    text: 'Tienes 10 Tareas completadas lo que corresponde a 100%',
    count: 10,
    percent: 100
  },
  {
    type: 'cancelled',
    title: 'Canceladas',
    text: 'Tienes 10 Tareas canceladas lo que corresponde a 20%',
    count: 10,
    percent: 20
  }
]
