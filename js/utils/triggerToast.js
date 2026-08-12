export const triggerToast = (mensaje, tipo = 'success') => {
  const colores = {
    success: '#50E3C2',
    error: '#fd397a',
    warning: '#F5A623',
    info: '#4A90E2'
  }

  const color = colores[tipo] || colores.info

  // eslint-disable-next-line no-undef
  Swal.fire({
    toast: true,
    position: 'bottom',
    icon: tipo,
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.style.border = '1px solid #e5e7eb'
      toast.style.borderRadius = '16px'

      const barra = toast.querySelector('.swal2-timer-progress-bar')
      if (barra) {
        barra.style.background = color
      }

      const icono = toast.querySelector('.swal2-icon')
      if (icono) {
        icono.style.borderColor = color
        icono.style.color = color

        toast.querySelectorAll('.swal2-success-ring').forEach(el => {
          el.style.borderColor = color
        })
        toast.querySelectorAll('.swal2-success-line-tip, .swal2-success-line-long').forEach(el => {
          el.style.backgroundColor = color
        })
        toast.querySelectorAll('.swal2-x-mark-line-left, .swal2-x-mark-line-right').forEach(el => {
          el.style.backgroundColor = color
        })
      }
    }
  })
}
