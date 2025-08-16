import { Link } from 'react-router-dom'

export default function ItemCard({ item }) {
  return (
    <div className="card overflow-hidden">
      <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
      <div className="p-4 space-y-2">
        <div className="text-xs text-gray-500">{item.type.toUpperCase()} • {item.category}</div>
        <Link to={`/items/${item.id}`} className="block text-lg font-semibold hover:underline">{item.title}</Link>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        <div className="text-xs text-gray-500">Date: {item.date} • Location: {item.location}</div>
      </div>
    </div>
  )
}
