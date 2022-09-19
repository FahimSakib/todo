export default function Notodo({ filter }) {
  return (
    <div className="no-todo-container">
      <p>No {filter} Todo available! Add new...</p>
    </div>
  )
}
