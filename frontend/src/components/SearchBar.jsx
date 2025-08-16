import { useState } from 'react'

export default function SearchBar({ onChange, initial = {} }) {
  const [q, setQ] = useState(initial.q || '')
  const [category, setCategory] = useState(initial.category || 'all')

  function emit(next) {
    onChange?.(next)
  }

  return (
    <div className="card p-4 flex flex-col md:flex-row gap-3 md:items-end">
      <div className="flex-1">
        <label className="label">Search</label>
        <input className="input" placeholder="wallet, phone, ID card..."
          value={q} onChange={e => { setQ(e.target.value); emit({ q: e.target.value, category }) }} />
      </div>
      <div className="md:w-60">
        <label className="label">Category</label>
        <select className="input" value={category} onChange={e => { setCategory(e.target.value); emit({ q, category: e.target.value }) }}>
          <option value="all">All</option>
          <option>Electronics</option>
          <option>ID Card</option>
          <option>Wallet</option>
          <option>Keys</option>
          <option>Bag</option>
          <option>Pet</option>
          <option>Other</option>
        </select>
      </div>
      <div className="md:w-40">
        <button className="btn btn-primary w-full" onClick={() => emit({ q, category })}>Apply</button>
      </div>
    </div>
  )
}
