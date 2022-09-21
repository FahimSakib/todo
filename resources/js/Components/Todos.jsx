import Close from './Icons/Close'

const Todos = ({
  todosFiltered,
  filter,
  completeTodo,
  markAsEditing,
  CancleEdit,
  updateTodo,
  setShowModal,
  setId
}) => {
  return (
    <>
      <ul className="todo-list">
        {todosFiltered(filter)
          .map((todo) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.is_complete ? true : false}
                  onChange={() => completeTodo(todo.id)}
                />
                {!todo.is_editing ? (
                  <span
                    className={`todo-item-label ${todo.is_complete ? 'line-through' : ''}`}
                    onDoubleClick={() => markAsEditing(todo.id)}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    defaultValue={todo.title}
                    className="todo-item-input"
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        CancleEdit(todo.id)
                      } else if (event.key === 'Enter') {
                        updateTodo(event, todo.id)
                      }
                    }}
                    onBlur={(event) => updateTodo(event, todo.id)}
                    autoFocus
                  />
                )}
              </div>
              {/* <button onClick={() => deleteTodo(todo.id)} className="x-button"> */}
              <button onClick={() => {setShowModal(true); setId(todo.id)}} className="x-button">
                <Close />
              </button>
            </li>
          ))
          .reverse()}
      </ul>
    </>
  )
}

export default Todos
