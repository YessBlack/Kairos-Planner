export const seedTasks = [
  {
    id: crypto.randomUUID(),
    deadline: '2026-09-05',
    description: 'Diseñar la estructura de la base de datos para el módulo de reservas, incluyendo relaciones entre usuarios, clases y horarios.',
    status: 'not-started',
    title: 'Modelar base de datos de reservas',
    completed: false,
    canceled: false,
    subtasks: [
      { id: crypto.randomUUID(), text: 'Definir entidades principales', done: false },
      { id: crypto.randomUUID(), text: 'Definir relaciones y llaves foráneas', done: false },
      { id: crypto.randomUUID(), text: 'Crear diagrama entidad-relación', done: false }
    ]
  },
  {
    id: crypto.randomUUID(),
    deadline: '2026-09-02',
    description: 'Escribir las pruebas unitarias para el servicio de tareas, cubriendo agregar, editar y eliminar.',
    status: 'in-progress',
    title: 'Pruebas unitarias del TaskManager',
    completed: false,
    canceled: false,
    subtasks: [
      { id: crypto.randomUUID(), text: 'Probar addTask', done: true },
      { id: crypto.randomUUID(), text: 'Probar updateTask', done: false },
      { id: crypto.randomUUID(), text: 'Probar deleteTask', done: false }
    ]
  },
  {
    id: crypto.randomUUID(),
    deadline: '2026-08-30',
    description: 'Revisar y responder los comentarios pendientes del último Pull Request antes de hacer merge a main.',
    status: 'completed',
    title: 'Revisar comentarios del Pull Request',
    completed: true,
    canceled: false,
    subtasks: []
  },
  {
    id: crypto.randomUUID(),
    deadline: '2026-09-04',
    description: 'Preparar el ambiente de despliegue en el servidor de pruebas, incluyendo variables de entorno y configuración de base de datos.',
    status: 'cancelled',
    title: 'Configurar ambiente de staging',
    completed: false,
    canceled: true,
    subtasks: [
      { id: crypto.randomUUID(), text: 'Configurar variables de entorno', done: false },
      { id: crypto.randomUUID(), text: 'Conectar base de datos de pruebas', done: false }
    ]
  }
]
