export function updateFavs ({ commit }, id) {
  commit('updateFavs', id)
}

export function addToFavs ({ commit }, id) {
  commit('addToFavs', id)
}

export function removeFromFavs ({ commit }, id) {
  commit('removeFromFavs', id)
}
