import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'
import toast from 'react-hot-toast'

const TodoForm = ({ setTodos }) => {
  const [todoInput, setTodoInput] = useState({})

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setTodoInput({ [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (Object.keys(todoInput).length === 0) {
      return toast.error('Please type something to save!')
    }
    if (todoInput.title.trim().length !== 0) {
      Inertia.post('todo', todoInput, {
        onSuccess: (data) => {
          setTodos(data.props.result)
          toast.success('Todo added successfully')
        },
      })
    } else {
      toast.error('Please type something to save!')
    }
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
