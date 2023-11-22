'use client'

import { useEffect, useState } from 'react'
import styles from '@app/page.module.css'
import { fetchStreets } from '@services/api.js'
import Button from '@ui/button.jsx'
import Houses from '@components/houses.jsx'

export default function Home() {
  const initClients = {
    addressId: 0,
    streetId: 0,
    streetName: '',
    houseId: 0,
    houseName: '',
    flatId: 0,
    flatName: '',
    residents: [],
  }
  const [streets, setStreets] = useState([])
  const [clients, setClients] = useState(initClients)

  useEffect(() => {
    const getStreets = async () => {
      const streets = await fetchStreets()
      const temp = streets.map((street) => {
        return { street, isShow: false }
      })
      setStreets(temp)
    }
    getStreets()
  }, [])

  const handleClickStreet = (streetId) => {
    let streetName =''
    const temp = streets.map((it) => {
      if (it.street.id === streetId) {
        it.isShow = !it.isShow
        streetName = it.street.nameWithPrefix
      }
      return it
    })
    setStreets(temp)
    setClients(initClients)
    setClients({...clients, streetId, streetName})
  }

  return (
    <main className={styles.main}>
      <h3>Жилищный фонд</h3>
      <div className={styles.containerButtons}>
        {streets.length > 0 &&
          streets.map((item) => {
            return (
              <div key={item.street.id}>
                <Button
                  onClick={() => handleClickStreet(item.street.id)}
                  className={`${styles.buttonLine} ${styles.buttonStreet}`}
                >
                  {item.street.nameWithPrefix}
                </Button>
                {item.isShow && (
                  <Houses
                    clients={clients}
                    setClients={setClients}
                  />
                )}
              </div>
            )
          })}
      </div>
    </main>
  )
}
