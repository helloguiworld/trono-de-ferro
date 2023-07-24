import api from '.'

export async function getComments () {
  return api.get('comments/')
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export async function postComment (characterId, comment) {
  return api.post('comments/', { character_id: characterId, comment })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export async function getComment (characterId) {
  return api.get(`comments/${characterId}/`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export async function patchComment (characterId, newComment) {
  return api.patch(`comments/${characterId}/`, { comment: newComment })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export async function deleteComment (characterId) {
  return api.delete(`comments/${characterId}/`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response ? error.response : error
    })
}

export default {
  getComments,
  postComment,
  getComment,
  patchComment,
  deleteComment
}
