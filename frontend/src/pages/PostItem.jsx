import { useState } from 'react'
import { ItemsAPI } from '../services/api.js'
import { useNavigate } from 'react-router-dom'

export default function PostItem() {
  const [form, setForm] = useState({
    type: 'lost',
    title: '',
    description: '',
    category: 'Other',
    date: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function update(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const item = await ItemsAPI.create(form)
      alert('Item posted (mock). In real app this goes to backend.')
      navigate(`/items/${item.id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-2xl mx-auto card p-6 space-y-4">
      <h1 className="text-2xl font-bold">Post an item</h1>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Type</label>
            <select className="input" name="type" value={form.type} onChange={update}>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" name="category" value={form.category} onChange={update}>
              <option>Electronics</option>
              <option>ID Card</option>
              <option>Wallet</option>
              <option>Keys</option>
              <option>Bag</option>
              <option>Pet</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Title</label>
          <input className="input" name="title" value={form.title} onChange={update} placeholder="Lost black wallet" required />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input h-28" name="description" value={form.description} onChange={update} placeholder="Brand, color, unique marks..." required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Date</label>
            <input type="date" className="input" name="date" value={form.date} onChange={update} required />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" name="location" value={form.location} onChange={update} placeholder="Campus library" required />
          </div>
        </div>
        <div>
          <label className="label">Image URL (optional)</label>
          <input className="input" name="image" value={form.image} onChange={update} placeholder="https://..." />
        </div>
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Posting...' : 'Post item'}</button>
      </form>
    </section>
  )
}
