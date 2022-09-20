import React from 'react'
import Close from './Icons/Close'

const ConfirmModal = ({ setShowModal }) => {
  return (
    <>
      <div className="modal">
        <div className="modal-header">
          <button onClick={() => setShowModal(false)} className="x-button">
            <Close />
          </button>
        </div>
        <div className="modal-body"></div>
        <div className="modal-footer">
          <button className="cancel button">Cancel</button>
          <button className="confirm button">Confirm</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmModal
