import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { ItemsAPI } from '../services/api.js'

export default function Found() {
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({ q: '', category: 'all' })

  useEffect(() => {
    (async () => {
      const list = await ItemsAPI.list({ type: 'found', ...filters })
      setItems(list)
    })()
  }, [filters])

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Found items</h1>
      <SearchBar onChange={setFilters} initial={filters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => <ItemCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}
