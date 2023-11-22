import { useState, useEffect } from 'react'
import { fetchHouses } from '@services/api.js'
import styles from '@app/page.module.css'
import Button from '@ui/button.jsx'
import Flat from '@components/flat.jsx'

const Houses = ({ clients, setClients }) => {
  const [houses, setHouses] = useState([])

  useEffect(() => {
    const getHouses = async () => {
      const houses = await fetchHouses(clients.streetId)
      const temp = houses.map((house) => {
        return { house, isShow: false }
      })
      setHouses(temp)
    }
    getHouses()
  }, [])

  const handleClickHouse = (houseId) => {
    let houseName = ''
    const temp = houses.map((it) => {
      if (it.house.id === houseId) {
        it.isShow = !it.isShow
        houseName = it.house.name
      }
      return it
    })
    setHouses(temp)
    setClients({ ...clients, houseId, houseName })
  }

  return (
    <div
      className={`${styles.containerButtons} ${styles.containerHouse}`}
    >
      {houses.length > 0 &&
        houses.map((item) => {
          return (
            <div key={item.house.id}>
              <Button
                onClick={() => handleClickHouse(item.house.id)}
                className={`${styles.buttonLine} ${styles.buttonHouse}`}
              >
                <span>{`Дом - ${item.house.name}`}</span>
              </Button>
              {item.isShow && (
                <Flat clients={clients} setClients={setClients} />
              )}
            </div>
          )
        })}
    </div>
  )
}

export default Houses
