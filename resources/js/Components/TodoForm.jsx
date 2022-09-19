import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'

const TodoForm = ({ setTodos }) => {
  const [todoInput, setTodoInput] = useState('')

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setTodoInput({ [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    if (todoInput.title.trim().length === 0) {
      return
    }
    Inertia.post('todo', todoInput, {
      onSuccess: (data) => {
        setTodos(data.props.result)
      },
    })
    setTodoInput('')
  }

  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          onChange={handleInput}
          value={todoInput.title || ''}
          placeholder="What do you need to do?"
          name="title"
        />
      </form>
    </div>
  )
}

export default TodoForm
