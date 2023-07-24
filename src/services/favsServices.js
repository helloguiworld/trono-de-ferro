import api from '.'

export async function getFavsList () {
  return api.get('favs/list/')
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export async function postFav (characterId) {
  return api.post('favs/', { character_id: characterId })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export async function deleteFav (characterId) {
  return api.delete(`favs/${characterId}/`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export async function isFav (characterId) {
  return api.get(`isfav/${characterId}/`)
    .then(function (response) {
      if (response.status === 200) return response.data.is_fav
      else return false
    })
    .catch(function () {
      return false
    })
}

export default {
  getFavsList,
  postFav,
  deleteFav,
  isFav
}
