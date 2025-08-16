import axios from 'axios'

// Change this to your backend URL when ready
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})

// Example requests you can adapt later:
export const ItemsAPI = {
  // Replace these mocks with real API calls later
  async list({ type, q, category }) {
    const data = await import('../mock/items.json')
    let items = data.default
    if (type) items = items.filter(i => i.type === type)
    if (category && category !== 'all') items = items.filter(i => i.category === category)
    if (q) {
      const s = q.toLowerCase()
      items = items.filter(i =>
        i.title.toLowerCase().includes(s) ||
        i.description.toLowerCase().includes(s) ||
        i.location.toLowerCase().includes(s)
      )
    }
    return items
  },
  async detail(id) {
    const data = await import('../mock/items.json')
    return data.default.find(i => String(i.id) === String(id))
  },
  async create(payload) {
    // Mock create: save into localStorage
    const data = JSON.parse(localStorage.getItem('findit_items') || '[]')
    const next = { id: Date.now(), ...payload }
    data.push(next)
    localStorage.setItem('findit_items', JSON.stringify(data))
    return next
  }
}
