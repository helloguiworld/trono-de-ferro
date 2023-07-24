<template>
  <q-page class="flex characters">
    <div class="characters-list">
      <CharacterCard
        v-for="character in characters"
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

export default {
  name: 'PageIndex',
  components: {
    CharacterCard
  },
  data () {
    return {
      characters: []
    }
  },
  computed: {
    favs () {
      return this.$store.state.characters.favs
    }
  },
  methods: {
    async fetchCharacters () {
      const response = await gotServices.fetchCharacters()
      this.characters = response
      console.log(response)
    }
  },
  mounted () {
    this.fetchCharacters()
    // this.favs = this.$store.state.characters.favs
  }
}
</script>

<style lang="scss" scoped>
  .characters-list {
    flex: 1;
    // border: 3px solid pink;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
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
