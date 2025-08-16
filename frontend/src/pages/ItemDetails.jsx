import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemsAPI } from '../services/api.js'

export default function ItemDetails() {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    (async () => {
      const data = await ItemsAPI.detail(id)
      setItem(data)
    })()
  }, [id])

  if (!item) return <div>Loading...</div>

  return (
    <article className="grid md:grid-cols-2 gap-6">
      <img src={item.image} alt={item.title} className="w-full h-80 object-cover rounded-2xl" />
      <div className="space-y-3">
        <div className="text-xs text-gray-500">{item.type.toUpperCase()} • {item.category}</div>
        <h1 className="text-3xl font-bold">{item.title}</h1>
        <p className="text-gray-700">{item.description}</p>
        <div className="text-sm text-gray-500">Date: {item.date}</div>
        <div className="text-sm text-gray-500">Location: {item.location}</div>
        <div className="pt-4">
          <button className="btn btn-primary">Contact poster</button>
        </div>
      </div>
    </article>
  )
}
