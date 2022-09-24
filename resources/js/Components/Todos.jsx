import toast from 'react-hot-toast'
import Back from './Icons/Back'
import Close from './Icons/Close'

const Todos = ({
  todosFiltered,
  filter,
  completeTodo,
  markAsEditing,
  CancleEdit,
  updateTodo,
  setShowModal,
  setId,
  setType,
  trashItems,
}) => {
  const handleModal = (id, type) => {
    setShowModal(true)
    setId(id)
    setType(type)
  }

  const restore = (id,type) => {
    trashItems(id)
    toast.success('Item restored successfully')
    completeTodo(id,type)
  }

  return (
    <>
      <ul className="todo-list">
        {todosFiltered(filter)
          .map((todo) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                {filter !== 'trash' && (
                  <input
                    type="checkbox"
                    checked={todo.is_complete ? true : false}
                    onChange={() => completeTodo(todo.id)}
                  />
                )}
                {!todo.is_editing ? (
                  filter !== 'trash' ? (
                    <span
                      className={`todo-item-label ${todo.is_complete ? 'line-through' : ''}`}
                      onDoubleClick={() => markAsEditing(todo.id)}
                    >
                      {todo.title}
                    </span>
                  ) : (
                    <span className={'todo-item-label'}>{todo.title}</span>
                  )
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
              {filter === 'trash' ? (
                <div>
                  <button
                    onClick={() => {
                      restore(todo.id, 'restore')
                    }}
                    className="x-button"
                  >
                    <Back />
                  </button>
                  <button
                    onClick={() => {
                      handleModal(todo.id, 'delete')
                    }}
                    className="x-button"
                  >
                    <Close />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleModal(todo.id, 'trash')
                  }}
                  className="x-button"
                >
                  <Close />
                </button>
              )}
            </li>
          ))
          .reverse()}
      </ul>
    </>
  )
}

export default Todos
