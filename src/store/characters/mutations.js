export function addToFavs (state, id) {
  if (!state.favs.includes(id)) {
    state.favs = [...state.favs, id]
  }
}

export function removeFromFavs (state, id) {
  state.favs = state.favs.filter((favId) => favId !== id)
}

export function setFavs (state, favs) {
  state.favs = favs
}

export function updateFavs (state, id) {
  if (!state.favs.includes(id)) {
    state.favs = [...state.favs, id]
  } else {
    state.favs = state.favs.filter((favId) => favId !== id)
  }
}

export function addComment (state, { id, comment }) {
  // state.comments = { ...state.comments, [id]: comment }
  state.comments[id] = comment
}

export function removeComment (state, id) {
  const { [id]: commentToRemove, ...newComments } = state.comments
  state.comments = newComments
  // const newComments = state.comments
  // delete newComments[id]
  // state.comments = newComments
}

export function setComments (state, comments) {
  state.comments = comments
}

export function updateComment (state, { id, comment }) {
  if (id in state.comments) {
    state.comments[id] = comment
  } else {
    state.comments = { ...state.comments, [id]: comment }
  }
}
