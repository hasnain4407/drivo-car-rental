import AdminTabs from '../../components/AdminTabs'
import { useAuth } from '../../context/AuthContext'

const ManageUsers = () => {
  const { user: me, users, setRole, toggleBlock } = useAuth()

  const act = (message, fn) => {
    if (window.confirm(message)) fn()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Manage users</h1>
      <AdminTabs />

      {(
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {users.map((u) => {
                const self = u.id === me.id
                const nextRole = u.role === 'admin' ? 'user' : 'admin'
                return (
                  <tr key={u.id}>
                    <td className="p-3 font-semibold">{u.name}{self && <span className="ml-2 text-xs font-normal text-zinc-500">(you)</span>}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${u.blocked ? 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'}`}>
                        {u.blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="space-x-2 p-3 text-right">
                      <button disabled={self} onClick={() => act(`Make ${u.name} ${nextRole === 'admin' ? 'an admin' : 'a normal user'}?`, () => setRole(u.id, nextRole))} className="btn-outline !px-3 !py-1.5">
                        {u.role === 'admin' ? 'Remove admin' : 'Make admin'}
                      </button>
                      <button disabled={self} onClick={() => act(`${u.blocked ? 'Unblock' : 'Block'} ${u.name}?`, () => toggleBlock(u.id))} className="btn-outline !px-3 !py-1.5">
                        {u.blocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageUsers
