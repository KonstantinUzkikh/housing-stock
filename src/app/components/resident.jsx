import styles from '@app/page.module.css'

const Resident = ({ resident }) => {
  return (
    <div className={`${styles.residentCard} ${resident.isSelected && styles.residentCardSelected}`}>
      <div className={styles.cardItem}>
        <span className={styles.itemTitle}>Полное имя:</span>
        <span className={styles.itemValue}>{resident.data.name}</span>
      </div>
      <div className={styles.cardItem}>
        <span className={styles.itemTitle}>Телефон:</span>
        <span className={styles.itemValue}>{resident.data.phone}</span>
      </div>
      <div className={styles.cardItem}>
        <span className={styles.itemTitle}>e-mail:</span>
        <span className={styles.itemValue}>{resident.data.email}</span>
      </div>
    </div>
  )
}

export default Resident
