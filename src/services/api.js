const config = {
  baseUrl: 'https://dispex.org/api/vtest',
  headers: {
    // authorization: '',
    'Content-Type': 'application/json'
  }
}

const endpoints = {
  housingStock: '/HousingStock',
  clients: '/HousingStock/clients',
  streets: '/request/streets',
  houses: '/request/houses',
  flats: '/request/house_flats',
  addClient: '/HousingStock/client',
  bindClient: '/HousingStock/bind_client',
}

export function checkEmpty(resp) {
  if (resp?.trim() !== '') {
    return JSON.parse(resp)
  }
  else return null
}

export function checkResponse(resp) {
  if (resp.ok) {
    if (resp.status === 200) {
      return resp.text()
    }
    else return null
  }
  return Promise.reject(`Ошибка: ${resp.status}`)
}

export function request(url, methodValue, bodyValue) {
  const options = {
    method: `${methodValue}`,
    headers: config.headers,
  }
  if (bodyValue !== undefined) { options.body = JSON.stringify(bodyValue) }
  return fetch(url, options).then(checkResponse).then(checkEmpty)
}

export function fetchHousingStock(streetId, houseId) {
  return request(`${config.baseUrl}${endpoints.housingStock}?streetId=${streetId}&houseId=${houseId}`, 'GET')
}

export function fetchClients(addressId) {
  return request(`${config.baseUrl}${endpoints.clients}?addressId=${addressId}`, 'GET')
}

export function fetchStreets() {
  return request(`${config.baseUrl}${endpoints.streets}`, 'GET')
}

export function fetchHouses(streetId) {
  return request(`${config.baseUrl}${endpoints.houses}/${streetId}`, 'GET')
}

export function fetchFlats(houseId) {
  return request(`${config.baseUrl}${endpoints.flats}/${houseId}`, 'GET')
}

export function fetchAddClient(clientData) {
  return request(`${config.baseUrl}${endpoints.addClient}`, 'POST', {
    Id: clientData.id,  // не используется
    Name: clientData.name,
    Phone: clientData.phone,
    Email: clientData.email,
    BindId: clientData.bindId // не используется
  })
}

export function fetchDeleteClient(clientId) {
  return request(`${config.baseUrl}${endpoints.bindClient}/${clientId}`, 'DELETE')
}

export function fetchBindClient(clientData) {
  return request(`${config.baseUrl}${endpoints.bindClient}`, 'PUT', {
    AddressId: clientData.AddressId,
    ClientId: clientData.ClientId
  })
}
