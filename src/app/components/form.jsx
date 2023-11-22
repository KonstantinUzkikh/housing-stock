import styles from '@app/page.module.css'
import { useFormAndValidation } from '@hooks/useFormAndValidation.js'
import Button from '@ui/button.jsx'

const Form = ({
  residentData,
  action,
  setAction,
  setResidentData,
  onCloseForm,
}) => {

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    name: residentData.name,
    email: residentData.email,
    phone: residentData.phone,
  })

  const onSubmit = (evt) => {
    evt.preventDefault()
    if (
      values.name !== residentData.name ||
      values.email !== residentData.email ||
      values.phone !== residentData.phone
    ) {
      if (action === 'pre-add') {
        setResidentData({
          id: 0,
          name: values.name,
          phone: values.phone,
          email: values.email,
          bindId: 0,
        })
        setAction('add')
      }
    }
    onCloseForm()
  }

  return (
    <div className={styles.formBox}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h3 className={styles.cardTitle}>
          Введите / отредактируйте данные
        </h3>
        <div className={styles.inputBox}>
          <label htmlFor='name'>Полное имя</label>
          <input
            type='text'
            name='name'
            id='name'
            value={values.name}
            onChange={handleChange}
            minLength={3}
            autoFocus
            required
            className={styles.inputStyle}
          />
          <span className={styles.errorStyle}>{errors.name}</span>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='email'>Электронная почта</label>
          <input
            type='email'
            name='email'
            id='email'
            value={values.email}
            onChange={handleChange}
            minLength={3}
            required
            className={styles.inputStyle}
          />
          <span className={styles.errorStyle}>{errors.email}</span>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='phone'>
            Телефон в формате +7(xxxxxxxxxх) или 8(xxxxxxxxxх)
          </label>
          <input
            type='tel'
            name='phone'
            id='phone'
            value={values.phone}
            onChange={handleChange}
            minLength={10}
            maxLength={10}
            required
            pattern='\d{10}$'
            className={`${styles.inputStyle} ${styles.textStyle}`}
          />
          <span className={styles.errorStyle}>{errors.phone}</span>
        </div>
        <div className={styles.buttonGroup}>
          <Button
            type='reset'
            className={styles.actionButton}
            onClick={onCloseForm}
          >
            Отменить
          </Button>
          <Button
            disabled={!isValid}
            type='submit'
            className={styles.actionButton}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
export default Form
