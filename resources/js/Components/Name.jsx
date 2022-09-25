import { Inertia } from '@inertiajs/inertia'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Name = ({ userName, setUserName }) => {
  const [nameInput, setNameInput] = useState({})
  const [nameEditing, setNameEditing] = useState(false)

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setNameInput({ [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (Object.keys(nameInput).length === 0) {
      return toast.error('Please type something to save!')
    }
    if (nameInput.name.trim().length !== 0) {
      Inertia.post('name', nameInput, {
        onSuccess: (data) => {
            console.log(data.props.name)
          setUserName(data.props.name)
          toast.success('Name added successfully')
        },
        preserveScroll: true,
      })
    } else {
      toast.error('Please type something to save!')
    }
    setNameInput('')
  }

  const updateName = (event, id) => {
    if (event.target.value.trim().length === 0) {
      setNameEditing(false)
      return userName.name
    }else if(event.target.value === userName.name){
        setNameEditing(false)
        return userName.name
    }
    userName.name = event.target.value
    const name = event.target.value
    Inertia.put(`name/${id}`, { name: name }, { preserveScroll: true })
    setNameEditing(false)
    toast.success('Name updated successfully')
    return userName.name
  }

  return (
    <div className="name-container">
      {userName === null ? (
        <div>
          {' '}
          <h2>Enter Your Name</h2>
          <form action="#" onSubmit={handleSubmit}>
            <input
              type="text"
              className="todo-input"
              value={nameInput.name || ''}
              onChange={handleInput}
              name="name"
              placeholder="Enter your name"
            />
          </form>
        </div>
      ) : (
        <p className="name-label">
          {!nameEditing ? (
             <span onDoubleClick={() => setNameEditing(true)}>Hello, <span className='user-name'>{userName.name}</span></span>
          ) : (
            <input
              type="text"
              defaultValue={userName.name}
              className="todo-item-input"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setNameEditing(false)
                } else if (event.key === 'Enter') {
                  updateName(event, userName.id)
                }
              }}
              onBlur={() => updateName(event, userName.id)}
              autoFocus
            />
          )}
        </p>
      )}
    </div>
  )
}

export default Name
