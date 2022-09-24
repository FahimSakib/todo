export default function Notodo({ filter }) {
  const message = () => {
    if (filter === 'all') {
      return <p>No todo available! Add new or restore from trash.</p>
    }
    if (filter === 'active') {
      return <p>No active todo available!</p>
    }
    if (filter === 'complete') {
      return <p>No completed todo available!</p>
    } else {
      return <p>Your trash is empty!</p>
    }
  }
  return <div className="no-todo-container">{message()}</div>
}
