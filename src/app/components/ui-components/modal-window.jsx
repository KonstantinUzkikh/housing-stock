import ReactDOM from 'react-dom'
import styles from '@ui/modal.module.css'

const ModalWindow = ({ isOpen, onClose, portal, children }) => {

  return isOpen
    ? ReactDOM.createPortal(
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
          {children}
        </div>
      </div>,
      document.getElementById(portal)
    )
    : null
}

export default ModalWindow
