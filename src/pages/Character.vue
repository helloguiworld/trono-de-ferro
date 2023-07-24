<template>
  <q-page class="flex justify-center character">
    <div v-if="character" class="character-infos">
      <!-- <p>{{ character }}</p> -->
      <img :src="character.imageUrl" alt="character photo">
      <div class="texts">
        <div class="name">
          <p class="first-name">{{ character.firstName }}</p>
          <p class="last-name">{{ character.lastName }}</p>
        </div>
        <p class="title"><b>Title:</b> {{ character.title }}</p>
        <p class="tag family">{{ character.family }}</p>
        <p class="tag id">ID {{ character.id }}</p>
        <p v-if="isFav" class="tag favorite">FAVORITADO<q-icon name="star" /></p>
        <div class="comment">
          <p>Comentário</p>
          <textarea name="comment" id="comment" rows="4" placeholder="Escreva um comentário" v-model="comment"></textarea>
          <button class="button" @click="saveNewComment()">Salvar</button>
          <p>{{ savedComment }}</p>
          <p>{{ comment }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import gotServices from 'src/services/gotServices'

export default {
  name: 'PageCharacter',
  data () {
    return {
      character: null,
      comment: ''
    }
  },
  computed: {
    characterId () {
      return this.$route.params.id
    },
    isFav () {
      return this.$store.state.characters.favs.includes(this.character.id)
    },
    savedComment () {
      return this.$store.state.characters.comments[this.character.id]
    }
  },
  methods: {
    async fetchData () {
      const response = await gotServices.fetchCharacterById(this.characterId)
      this.character = response
      console.log(response)

      const savedComment = this.savedComment
      if (savedComment) this.comment = savedComment
    },
    saveNewComment () {
      this.$store.commit('characters/updateComments', { id: this.character.id, newComment: this.comment })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.character-infos {
  max-width: 1000px;
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 20px;

  & img {
    width: 30%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 5px;
  }

  & .texts {
    // border: 1px solid red;
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    & p {
      margin: 0;
    }

    & .name {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;

      & .first-name {
        font-size: 38px;
        font-weight: bold;
      }

      & .last-name {
        font-size: 28px;
      }
    }

    & .title {
      font-size: 18px;
    }

    & .tag {
      font-size: 16px;
      background-color: #d8d8d8;
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid #adadad;
      display: flex;
      justify-content: center;
      align-items: center;

      &.id {
        font-size: 12px;
        font-weight: bold;
        background-color: #b9ffb6;
        border-color: #558f53;
      }

      &.favorite {
        font-size: 12px;
        font-weight: bold;
        background-color: #fcff67;
        color: #5c5e00;
        letter-spacing: 2px;
      }
    }

    & .comment {
      align-self: stretch;
      margin-top: 10px;
      background-color: #ecf6ff;
      border: 1px solid #a9d7ff;
      padding: 10px;
      border-radius: 5px;

      & p {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      & textarea {
        resize: none;
        width: 100%;
        padding: 5px 10px;
      }

      & button {
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
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .character-infos {
    flex-direction: column;

    & img {
      width: 100%;
    }
  }
}
</style>
