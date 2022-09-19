import { useState } from 'react'
import FilterButton from './FilterButton'
import Notodo from './NoTodo'
import Todos from './Todos'

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
  todosFiltered,
  unCheckAll,
  ...rest
}) => {
  // console.log(todosFiltered('complete'))
  // console.log(rest);
  // console.log(rest.test);
  // console.log(remaining());
  const [filter, setFilter] = useState('all')

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
    </>
  )
}

export default TodoList
