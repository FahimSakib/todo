import TodoList from '@/Components/TodoList'
import Notodo from '@/Components/NoTodo'
import TodoForm from '@/Components/TodoForm'
import UseLocalStorage from '@/Hooks/UseLocalStorage'
import { useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import toast from 'react-hot-toast'

const Todo = () => {
  const { data } = usePage().props
  const [todos, setTodos] = useState(data)
  const [name, setName] = UseLocalStorage('name', '')

  const deleteTodo = (id) => {
    Inertia.delete(`todo/${id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setTodos(todos.filter((todo) => todo.id !== id))
        toast.success('Todo Successfully deleted')
      },
      onError: (data) => {
        toast.error(data.error)
      },
    })
  }

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.is_complete = !todo.is_complete
      }
      return todo
    })
    Inertia.put(
      `todo-check/${id}`,
      {},
      {
        preserveScroll: true,
      }
    )
    setTodos(updatedTodos)
  }

  const markAsEditing = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.is_editing = true
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const updateTodo = (event, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.is_editing = false
          return todo
        }

        todo.title = event.target.value
        const data = event.target.value
        Inertia.put(`todo/${id}`, { title: data }, { preserveScroll: true })
        todo.is_editing = false
        toast.success('Item updated successfully')
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const CancleEdit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.is_editing = false
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const remaining = () => todos.filter((todo) => !todo.is_complete).length

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.is_complete))
  }

  const checkAll = (type) => {
    const updatedTodos = todos.map((todo) => {
      todo.is_complete = true
      return todo
    })
    Inertia.put(`todo-check-all/${'check'}`, {}, { preserveScroll: true })
    setTodos(updatedTodos)
  }

  const unCheckAll = () => {
    const updatedTodos = todos.map((todo) => {
      todo.is_complete = false
      return todo
    })
    console.log(updatedTodos)
    Inertia.put(`todo-check-all/${'uncheck'}`, {}, { preserveScroll: true })
    setTodos(updatedTodos)
  }

  const trashItems = (id) => {
    if (id === 'all') {
      Inertia.put(
        `todo-trash/${id}`,
        {},
        {
          preserveScroll: true,
        }
      )
      const updatedTodos = todos.map((todo) => {
        if (todo.is_complete && !todo.is_trashed) {
          todo.is_trashed = true
        }
        return todo
      })
      setTodos(updatedTodos)
    } else {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.is_trashed = !todo.is_trashed
        }
        return todo
      })
      Inertia.put(
        `todo-trash/${id}`,
        {},
        {
          preserveScroll: true,
        }
      )
      setTodos(updatedTodos)
    }
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
        <TodoForm setTodos={setTodos} />

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
            unCheckAll={unCheckAll}
            trashItems={trashItems}
          />
        ) : (
          <Notodo />
        )}
      </div>
    </div>
  )
}

export default Todo
