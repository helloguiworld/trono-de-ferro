<template>
  <div class="character-card">
    <div class="header">
      <p class="name">{{ name }}</p>
      <p class="title">{{ title }}</p>
    </div>
    <p v-if="family" class="family">{{ family.toUpperCase() }}</p>
    <img :src="photoUrl" alt="character photo">
    <div class="buttons">
      <button
        :class="`fav ${isFav ? 'is-fav' : ''}`"
        @click="updateFavs(id)"
      >
        <q-icon name="star" />
      </button>
      <!-- <button class="details">Visualizar</button> -->
      <router-link class="details" :to="{ path: `/character/${id}` }">Visualizar</router-link>
    </div>
  </div>
</template>

<script>
import favsServices from 'src/services/favsServices'

export default {
  props: ['id', 'name', 'title', 'family', 'photoUrl', 'isFav'],
  methods: {
    async updateFavs (id) {
      const isFav = await favsServices.isFav(id)
      if (isFav) {
        const response = await favsServices.deleteFav(id)
        if (response.status === 204) {
          this.$store.commit('characters/removeFromFavs', id)
        }
      } else {
        const response = await favsServices.postFav(id)
        if (response.status === 201) {
          this.$store.commit('characters/addToFavs', id)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.character-card {
  background-color: #e7e7e7;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  // gap: 10px;
  transition: .3s;

  &:hover {
    border-color: #3D0E03;
  }

  .header {
    flex: 1;
  }

  img {
    margin: 10px 0;
    width: 100%;
    height: 240px;
    // aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 5px;
  }

  .name {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }

  .title {
    font-size: 12px;
    margin: 0;
  }

  .family {
    background-color: #d8d8d8;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 2px;
    padding: 2px 5px;
    margin: 10px 0 0;
    border-radius: 4px;
    border: 1px solid #adadad;
    color: #383838;
  }

  .buttons {
    display: flex;
    // gap: 10px;
  }

  button, a {
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    transition: .3s;

    &.fav {
      color: #a5a5a5;
      font-size: 20px;
      padding: 5px;
      border: 1px solid transparent;
      border-color: #feffc8;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: #feffc8;
        color: #e7eb02;
      }

      &.is-fav {
        background-color: #e7eb02;
        color: #5c5e00;

        &:hover {
          background-color: #df5248;
        color: #ffd3d0;
        }
      }

    }

    &.details {
      flex: 1;
      background-color: #757575;
      color: #ffffff;

      &:hover {
        background-color: #383838;
      }
    }
  }
}
</style>
