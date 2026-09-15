import { Header } from '../components/layout/Header.js'

export const renderHeader = () => {
  const container = document.getElementById('header')
  container.innerHTML = Header()
}
