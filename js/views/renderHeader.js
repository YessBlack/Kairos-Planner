import { Header } from '../components/Header.js'

export const renderHeader = () => {
  const container = document.getElementById('header')
  container.innerHTML = Header()
}
