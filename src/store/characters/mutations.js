export function addToFavs (state, id) {
  if (!state.favs.includes(id)) {
    state.favs = [...state.favs, id]
  }
}

export function removeFromFavs (state, id) {
  state.favs = state.favs.filter((favId) => favId !== id)
}

export function updateFavs (state, id) {
  if (!state.favs.includes(id)) {
    state.favs = [...state.favs, id]
  } else {
    state.favs = state.favs.filter((favId) => favId !== id)
  }
}

export function updateComments (state, { id, newComment }) {
  console.log(id, newComment)
  const comments = { ...state.comments }
  comments[id] = newComment
  state.comments = comments
}
