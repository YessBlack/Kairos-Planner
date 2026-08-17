export const tasks = [
  {
    id: 'task-1',
    title: 'Revisar reporte mensual de ventas',
    category: 'Digital Product Design',
    status: 'warning',
    dateLabel: 'Due: Oct 24',
    statusText: '• Vencimiento mañana',
    statusTextColor: 'warning',
    completed: false,
    canceled: false,
    subtasks: [
      { id: 'sub-1-1', text: 'Exportar datos de ventas', done: true },
      { id: 'sub-1-2', text: 'Comparar con mes anterior', done: true },
      { id: 'sub-1-3', text: 'Preparar gráficos', done: false },
      { id: 'sub-1-4', text: 'Enviar a dirección', done: false },
      { id: 'sub-1-5', text: 'Revisar comentarios finales', done: false }
    ]
  },
  {
    id: 'task-2',
    title: 'Preparar slides para la reunión',
    category: 'Digital Product Design',
    status: 'info',
    dateLabel: 'Due: Oct 26',
    statusText: null,
    statusTextColor: null,
    completed: false,
    canceled: false,
    subtasks: [
      { id: 'sub-2-1', text: 'Definir estructura', done: true },
      { id: 'sub-2-2', text: 'Diseñar portada', done: true },
      { id: 'sub-2-3', text: 'Agregar datos clave', done: true },
      { id: 'sub-2-4', text: 'Revisión con equipo', done: false }
    ]
  },
  {
    id: 'task-3',
    title: 'Comprar suministros de oficina',
    category: 'Digital Product Design',
    status: 'danger',
    dateLabel: 'Due: Oct 20',
    statusText: '• Atrasado',
    statusTextColor: 'danger',
    completed: false,
    canceled: false,
    subtasks: [
      { id: 'sub-3-1', text: 'Hacer lista de faltantes', done: true },
      { id: 'sub-3-2', text: 'Cotizar proveedores', done: false }
    ]
  },
  {
    id: 'task-4',
    title: 'Rediseño de Landing Page',
    category: 'Web Development',
    status: 'success',
    dateLabel: 'Completed: Oct 22',
    statusText: 'COMPLETED',
    statusTextColor: null,
    completed: true,
    canceled: false,
    subtasks: [
      { id: 'sub-4-1', text: 'Wireframes', done: true },
      { id: 'sub-4-2', text: 'Diseño visual', done: true },
      { id: 'sub-4-3', text: 'Implementación', done: true }
    ]
  },
  {
    id: 'task-5',
    title: 'Investigación de Mercado',
    category: 'Marketing',
    status: 'danger',
    dateLabel: 'Canceled: Oct 21',
    statusText: 'CANCELED',
    statusTextColor: null,
    completed: false,
    canceled: true,
    subtasks: [
      { id: 'sub-5-1', text: 'Definir competidores', done: true },
      { id: 'sub-5-2', text: 'Encuestas a usuarios', done: false }
    ]
  }
]
