<template>
  <q-page class="flex column characters">
    <div class="options">
      <input type="text" placeholder="Busca por nome" v-model="searchText">
      <button type="button" :class="`favs${this.onlyFavs ? ' on' : ''}`" @click="() => this.onlyFavs = !this.onlyFavs">Favoritos</button>
    </div>
    <div class="characters-list">
      <CharacterCard
        v-for="character in filteredCharacters"
        :key="character.id"
        :id="character.id"
        :name="character.fullName"
        :title="character.title"
        :family="character.family"
        :photoUrl="character.imageUrl"
        :isFav="favs.includes(character.id)"
      />
    </div>
  </q-page>
</template>

<script>
import CharacterCard from 'components/CharacterCard.vue'
import gotServices from '../services/gotServices'
import favsServices from 'src/services/favsServices'

export default {
  name: 'PageIndex',
  components: {
    CharacterCard
  },
  data () {
    return {
      characters: [],
      onlyFavs: false,
      searchText: ''
    }
  },
  computed: {
    favs () {
      return this.$store.state.characters.favs
    },
    filteredCharacters () {
      let characters = this.characters

      if (this.onlyFavs) {
        characters = characters.filter(character => this.favs.includes(character.id))
      }

      if (this.searchText) {
        characters = characters.filter(character => character.fullName.toLowerCase().match(this.searchText.toLowerCase()))
      }

      return characters
    }
  },
  methods: {
    async fetchData () {
      let response

      response = await gotServices.fetchCharacters()
      this.characters = response
      console.log(response)

      response = await favsServices.getFavsList()
      if (response.status === 200) {
        this.$store.commit('characters/setFavs', response.data)
      }
    }
  },
  mounted () {
    this.fetchData()
    // this.favs = this.$store.state.characters.favs
  }
}
</script>

<style lang="scss" scoped>
  .options {
    // border: 2px solid red;
    padding: 10px;
    display: flex;
    align-items: center;
    // gap: 20px;

    & input {
      flex: 1;
      padding: 5px 10px;
      margin-right: 10px;
    }

    & p {
      margin: 0;
    }

    & button {
      align-self: stretch;
      cursor: pointer;
      font-weight: bold;
      text-decoration: none;
      text-align: center;
      padding: 5px 10px;
      border: 1px solid transparent;
      border-radius: 4px;
      transition: .3s;
      background-color: #3085d4;
      color: #e2efff;

      &:hover {
        background-color: #04499e;
      }

      &.favs {
        background-color: #feffcc;
        color: #6e6404;

        &:hover {
          border-color: #abad01;
        }

        &.on {
          background-color: #e7eb02;
          color: #5c5e00;

          &:hover {
            background-color: #ffe9e9;
            color: #660505;
            border-color: #9b5454;
          }
        }
      }
    }
  }
  .characters-list {
    // flex: 1;
    // border: 3px solid pink;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    overflow-y: auto;
  }

  @media screen and (max-width: 1023px) {
    .characters-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 767px) {
    .characters-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 680px) {
    .characters-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
