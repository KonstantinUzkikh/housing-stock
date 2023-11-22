import { useState, useEffect } from 'react'
import {
  fetchFlats,
  fetchHousingStock,
  fetchClients,
  fetchAddClient,
  fetchBindClient,
  fetchDeleteClient,
} from '@services/api.js'
import styles from '@app/page.module.css'
import Button from '@ui/button.jsx'
import ModalWindow from '@ui/modal-window.jsx'
import Residents from '@components/residents.jsx'
import Form from '@components/form.jsx'

const Flat = ({ clients, setClients }) => {
  const [flats, setFlats] = useState([])
  const [flatItem, setFlatItem] = useState(null)
  const [loadData, setLoadData] = useState(false)
  const [isLoadedAddressID, setIsLoadedAddressID] = useState(false)
  const [isLoadedClientsData, setIsLoadedClientsData] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenForm, setOpenForm] = useState(false)
  const [residentData, setResidentData] = useState(null)
  const [action, setAction] = useState()

  const getClients = async (addressId) => {
    const clientsData = await fetchClients(addressId)
    clientsData
      ? setClients((prev) => ({
          ...prev,
          residents: clientsData.map((it) => {
            return { data: it, isSelected: false }
          }),
        }))
      : setClients((prev) => ({ ...prev, residents: [] }))
  }

  useEffect(() => {
    const getFlats = async () => {
      const flats = await fetchFlats(clients.houseId)
      setFlats(flats)
    }
    getFlats()
  }, [clients.houseId])

  const handleClickFlat = (selectedFlatItem) => {
    setFlatItem(selectedFlatItem)
    setClients({
      ...clients,
      flatId: selectedFlatItem.id,
      flatName: selectedFlatItem.flat,
    })
    setLoadData(true)
  }

  useEffect(() => {
    if (!loadData) return
    const getFlatData = async (flatId, flat) => {
      const housingStock = await fetchHousingStock(
        clients.streetId,
        clients.houseId,
      )
      const address = housingStock.filter(
        (it) => it.houseId === clients.houseId && it.flat === flat,
      )[0]
      if (address) {
        setClients({
          ...clients,
          flatName: flat,
          flatId,
          addressId: address.addressId,
        })
        setIsLoadedAddressID(true)
      }
    }
    getFlatData(flatItem.id, flatItem.flat)
  }, [loadData])

  useEffect(() => {
    if (clients.addressId > 0) {
      getClients(clients.addressId)
      setIsLoadedClientsData(true)
    }
  }, [isLoadedAddressID])

  useEffect(() => {
    if (isLoadedClientsData) {
      setOpenModal(true)
    }
  }, [isLoadedClientsData])

  const onCloseModal = () => {
    setIsLoadedClientsData(false)
    setIsLoadedAddressID(false)
    setFlatItem(null)
    setClients((prev) => ({
      ...prev,
      flat: '',
      flatId: 0,
      addressId: 0,
      residents: [],
    }))
    setLoadData(false)
    setOpenModal(false)
  }

  useEffect(() => {
    if (residentData === null) return
    const fetchResident = async () => {
      switch (action) {
        case 'add':
          {
            const response = await fetchAddClient(residentData)
            if ((response.result = 'Ok')) {
              await fetchBindClient({
                AddressId: clients.addressId,
                ClientId: response.id,
              })
              await getClients(clients.addressId)
              setAction('no-action')
            }
          }
          break
        case 'delete':
          {
            const response = await fetchDeleteClient(residentData.bindId)
            await getClients(clients.addressId)
            setResidentData(null)
            setAction('no-action')
          }
          break
        default:
          null
      }
    }
    fetchResident()
  }, [residentData])

  return (
    <div
      className={`${styles.containerButtons} ${styles.containerFlat}`}
    >
      {flats.length > 0 &&
        flats.map((item) => {
          return (
            <div key={item.id}>
              <Button
                onClick={() => handleClickFlat(item)}
                className={`${styles.buttonLine} ${styles.buttonFlat}`}
              >
                <span>{`Квартира - ${item.name}`}</span>
              </Button>
            </div>
          )
        })}
      {isOpenModal && (
        <ModalWindow
          isOpen={isOpenModal}
          onClose={onCloseModal}
          portal={'modal'}
        >
          <Residents
            clients={clients}
            setClients={setClients}
            onOpenForm={() => setOpenForm(true)}
            setAction={setAction}
            setResidentData={setResidentData}
          />
        </ModalWindow>
      )}
      {isOpenForm && (
        <ModalWindow
          isOpen={isOpenForm}
          onClose={() => setOpenForm(false)}
          portal={'form'}
        >
          <Form
            residentData={residentData}
            action={action}
            setAction={setAction}
            setResidentData={setResidentData}
            onCloseForm={() => setOpenForm(false)}
          />
        </ModalWindow>
      )}
    </div>
  )
}

export default Flat
