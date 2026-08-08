import { Form } from '../components/Form.js'

export const renderForm = () => {
  const form = document.getElementById('form')
  form.innerHTML = Form()
}
