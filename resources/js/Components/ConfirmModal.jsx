import React from 'react'
import toast from 'react-hot-toast'
import Close from './Icons/Close'

const ConfirmModal = ({ showModal, setShowModal, id, deleteTodo, type, trashItem }) => {
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
          <div>
            {type === 'trash' ? (
              <p>Move this item to Trash? </p>
            ) : (
              <p>are you sure you want to delete?</p>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              trashItem(id)
              setShowModal(false)
              toast((t) => (
                <span>
                  Item moved to trash. &nbsp;
                  <button className='button' onClick={() => {toast.dismiss(t.id); trashItem(id)}}>Undo</button>
                </span>
              ))
            }}
            className="confirm button"
          >
            Confirm
          </button>
          <button onClick={() => setShowModal(false)} className="cancel button">
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default ConfirmModal
