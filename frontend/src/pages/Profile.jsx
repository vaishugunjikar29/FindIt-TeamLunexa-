import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user } = useAuth()
  if (!user) return <div>Please login to see your profile.</div>

  return (
    <section className="max-w-2xl mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="card p-4">
        <div className="font-semibold">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
      <p className="text-gray-600">This is a placeholder profile page. You can list your posted items here once the backend is connected.</p>
    </section>
  )
}
