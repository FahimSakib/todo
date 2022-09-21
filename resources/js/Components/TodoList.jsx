import { useState } from 'react'
import FilterButton from './FilterButton'
import Notodo from './NoTodo'
import Todos from './Todos'
import ConfirmModal from '@/Components/ConfirmModal'

const TodoList = ({
  todos,
  completeTodo,
  markAsEditing,
  CancleEdit,
  updateTodo,
  deleteTodo,
  remaining,
  clearCompleted,
  checkAll,
  unCheckAll,
  trashItem,
}) => {
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState('')
  const [type, setType] = useState('')

  const todosFiltered = (filter) => {
    if (filter === 'all') {
      return todos.filter((todo) => !todo.is_trashed)
    } else if (filter === 'active') {
      return todos.filter((todo) => !todo.is_complete && !todo.is_trashed)
    } else if (filter === 'complete') {
      return todos.filter((todo) => todo.is_complete && !todo.is_trashed)
    } else if (filter === 'trash') {
      return todos.filter((todo) => todo.is_trashed)
    }
  }

  return (
    <>
      {todosFiltered(filter).length !== 0 ? (
        <Todos
          todosFiltered={todosFiltered}
          filter={filter}
          completeTodo={completeTodo}
          markAsEditing={markAsEditing}
          CancleEdit={CancleEdit}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          setShowModal={setShowModal}
          setId={setId}
          setType={setType}
        />
      ) : (
        <Notodo filter={filter} />
      )}
      {todosFiltered(filter).length !== 0 && (
        <div className="check-all-container">
          <div>
            {remaining() !== 0 && filter !== 'complete' ? (
              <div onClick={checkAll} className="button">
                Check All
              </div>
            ) : (
              <div onClick={unCheckAll} className="button">
                Uncheck All
              </div>
            )}
          </div>
          <span>{remaining()} items remaining</span>
        </div>
      )}
      <div className="other-buttons-container">
        <FilterButton setFilter={setFilter} todosFiltered={todosFiltered} filter={filter} />
        {todosFiltered(filter).length !== 0 && (
          <div>
            <button onClick={clearCompleted} className="button">
              Clear completed
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          id={id}
          deleteTodo={deleteTodo}
          type={type}
          trashItem={trashItem}
        />
      )}
    </>
  )
}

export default TodoList
