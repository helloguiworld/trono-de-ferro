export function getFavs (state) {
  return state.favs
}

export function isFav (state, id) {
  return state.favs.includes(id)
}
