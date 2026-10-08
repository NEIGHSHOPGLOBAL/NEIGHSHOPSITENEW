import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api'

export const api = axios.create({ baseURL: apiBaseUrl })

export default api
