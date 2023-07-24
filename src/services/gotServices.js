async function fetchCharacters () {
  const url = 'https://thronesapi.com/api/v2/Characters'
  return await fetch(url)
    .then((data) => (data.json()))
    .then((response) => {
      // console.log(response)
      return response
    })
}

async function fetchCharacterById (id) {
  const url = `https://thronesapi.com/api/v2/Characters/${id}`
  return await fetch(url)
    .then((data) => (data.json()))
    .then((response) => {
      // console.log(response)
      return response
    })
}

export default {
  fetchCharacters,
  fetchCharacterById
}
