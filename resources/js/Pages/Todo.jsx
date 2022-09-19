import TodoList from '@/Components/TodoList'
import Notodo from '@/Components/NoTodo'
import TodoForm from '@/Components/TodoForm'
import UseLocalStorage from '@/Hooks/UseLocalStorage'

const Todo = () => {
  const [todos, setTodos] = UseLocalStorage('todos', [])

  const [idForTodo, setIdForTodo] = UseLocalStorage('idForTodo', 1)
  const [name, setName] = UseLocalStorage('name', '')

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
        isEditing: false,
      },
    ])

    setIdForTodo((preIdForTodo) => preIdForTodo + 1)
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id))

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const markAsEditing = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const updateTodo = (event, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false
          return todo
        }
        todo.title = event.target.value
        todo.isEditing = false
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const CancleEdit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const remaining = () => todos.filter((todo) => !todo.isComplete).length

  const clearCompleted = () => setTodos(todos.filter((todo) => !todo.isComplete))

  const checkAll = () => {
    const updatedTodos = todos.map((todo) => {
      todo.isComplete = true
      return todo
    })

    setTodos(updatedTodos)
  }

  const todosFiltered = (filter) => {
    if (filter === 'all') {
      return todos
    } else if (filter === 'active') {
      return todos.filter((todo) => !todo.isComplete)
    } else if (filter === 'complete') {
      return todos.filter((todo) => todo.isComplete)
    }
  }

  const unCheckAll = () => {
    const updatedTodos = todos.map((todo) => {
      todo.isComplete = false
      return todo
    })

    setTodos(updatedTodos)
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>Enter Your Name</h2>
          <form action="#">
            <input
              type="text"
              className="todo-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            CancleEdit={CancleEdit}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            checkAll={checkAll}
            todosFiltered={todosFiltered}
            unCheckAll={unCheckAll}
            test="ggg"
            a="gg"
          />
        ) : (
          <Notodo />
        )}
      </div>
    </div>
  )
}

export default Todo
