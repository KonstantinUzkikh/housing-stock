import styles from '@app/page.module.css'
import Resident from '@components/resident.jsx'
import Button from '@ui/button.jsx'

const Residents = ({
  clients,
  setClients,
  onOpenForm,
  setAction,
  setResidentData,
}) => {
  const { addressId, residents, streetName, houseName, flatName } = clients
  const isDisabledAction =
    residents.length === 0 ||
    residents.filter((it) => it.isSelected === true).length === 0

  const onSelect = (residentId) => {
    const temp = residents.map((it) =>
      it.data.id === residentId
        ? { ...it, isSelected: !it.isSelected }
        : { ...it, isSelected: false },
    )
    setClients((prev) => ({ ...prev, residents: temp }))
  }

  const onHandle = (action) => {
    setAction(action)
    if (action === 'pre-add') {
      setResidentData({ id: 0, name: '', phone: '', email: '', bindId: 0 })
    } else {
      const temp = residents.filter((it) => it.isSelected === true)[0].data
      setResidentData(residents.filter((it) => it.isSelected === true)[0].data)
    }
    action !== 'delete' && onOpenForm()
  }

  return (
    <div className={styles.containerResidents}>
      {addressId && residents.length > 0 ? (
        <div className={styles.containerResidents}>
          <h4
            className={styles.cardTitle}
          >{`${streetName}, дом ${houseName}, квартира № ${flatName}`}</h4>
          <div className={styles.grid}>
            {residents.map((it, index) => (
              <Button
                key={index}
                onClick={() => onSelect(it.data.id)}
                className={styles.cardButton}
              >
                <Resident key={it.id} resident={residents[index]} />
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <h4>Жильцы не зарегистрированы</h4>
      )}
      <div className={styles.residentsButtonsBox}>
        <Button
          key='add'
          onClick={() => onHandle('pre-add')}
          className={styles.actionButton}
        >
          Добавить
        </Button>
        <Button
          key='delete'
          disabled={isDisabledAction}
          onClick={() => onHandle('delete')}
          className={styles.actionButton}
        >
          Удалить
        </Button>
      </div>
    </div>
  )
}

export default Residents
