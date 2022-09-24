import React from 'react'
import toast from 'react-hot-toast'
import Close from './Icons/Close'

const ConfirmModal = ({ showModal, setShowModal, id, deleteTodo, type, trashItems }) => {
  const message = () => {
    if (id === 'all' && type=== 'trash') {
      return <p>Move completed items to Trash? </p>
    } else if(id === 'all' && type=== 'delete'){
      return <p>Are you sure you want to empty trash?</p>      
    } else if (type === 'trash') {
      return <p>Move this item to Trash? </p>      
    } else {
      return <p>are you sure you want to delete?</p>
    }
  }

  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          setShowModal(false)
        }}
        style={{ display: `${showModal ? 'block' : ''}` }}
      ></div>
      <div className="modal">
        <div className="modal-header">
          <button onClick={() => setShowModal(false)} className="x-button">
            <Close />
          </button>
        </div>
        <div className="modal-body">
          <div>{message()}</div>
        </div>
        <div className="modal-footer">
          {type === 'trash' ? (
            <button
              onClick={() => {
                trashItems(id)
                setShowModal(false)
                toast((t) => (
                  <span>
                    Item moved to trash. &nbsp;
                    <button
                      className="button"
                      onClick={() => {
                        toast.dismiss(t.id)
                        trashItems(id)
                      }}
                    >
                      Undo
                    </button>
                  </span>
                ))
              }}
              className="confirm button"
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={() => {
                deleteTodo(id)
                setShowModal(false)
              }}
              className="confirm button"
            >
              Confirm
            </button>
          )}
          <button onClick={() => setShowModal(false)} className="cancel button">
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default ConfirmModal
