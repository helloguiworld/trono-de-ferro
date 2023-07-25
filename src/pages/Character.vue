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
        <div :class="`comment${hasNewComment ? ' has-new-comment' : ''}`">
          <p>Comentário</p>
          <textarea name="comment" id="comment" rows="4" placeholder="Escreva um comentário" v-model="comment"></textarea>
          <div class="buttons">
            <button :class="`button restore${hasNewComment ? ' shown' : ''}`" @click="() => this.comment = this.savedComment">Restaurar</button>
            <button class="button delete" @click="() => this.comment = ''">Apagar</button>
            <button class="button" @click="saveNewComment()">Salvar</button>
          </div>
          <!-- <p>Saved: {{ savedComment }}</p> -->
          <!-- <p>{{ comment }}</p> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import gotServices from 'src/services/gotServices'
import commentsServices from 'src/services/commentsServices'

export default {
  name: 'PageCharacter',
  data () {
    return {
      character: null,
      savedComment: '',
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
    hasNewComment () {
      return this.comment !== this.savedComment
    }
  },
  methods: {
    async fetchData () {
      let response, comments

      response = await gotServices.fetchCharacterById(this.characterId)
      this.character = response
      console.log(response)

      response = await commentsServices.getComments()
      if (response.status === 200) {
        comments = response.data.reduce((acc, item) => {
          acc[item.character_id] = item.comment
          return acc
        }, {})
        this.$store.commit('characters/setComments', comments)

        const characterComment = comments[this.character.id]
        if (characterComment) {
          this.savedComment = characterComment
          this.comment = characterComment
        }
      }
    },
    async saveNewComment () {
      let response

      if (this.savedComment) {
        if (!this.comment) {
          // apaga
          response = await commentsServices.deleteComment(this.character.id)
          if (response.status === 204) {
            this.savedComment = ''
            this.$store.commit('characters/removeComment', this.character.id)
          }
        } else if (this.comment !== this.savedComment) {
          // atualiza
          response = await commentsServices.patchComment(this.character.id, this.comment)
          if (response.status === 200) {
            this.savedComment = this.comment
            this.$store.commit('characters/updateComment', { id: this.character.id, comment: this.comment })
          }
        }
      } else if (this.comment) {
        // cria
        response = await commentsServices.postComment(this.character.id, this.comment)
        if (response.status === 201) {
          this.savedComment = this.comment
          this.$store.commit('characters/addComment', { id: this.character.id, comment: this.comment })
        }
      }
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
  // gap: 20px;

  & img {
    width: 30%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    margin: 0 20px 0 0;
    border-radius: 5px;
  }

  & .texts {
    // border: 1px solid red;
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // gap: 10px;

    & p {
      margin: 0 0 10px;
    }

    & .name {
      margin: 0;
      display: flex;
      align-items: center;
      // gap: 10px;

      & .first-name {
        font-size: 38px;
        font-weight: bold;
        margin-right: 10px;
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
      display: flex;
      flex-direction: column;
      // gap: 5px;
      transition: .3s;

      &.has-new-comment {
        background-color: #fff9d8;
        border: 1px solid #fff2a9;
      }

      & p {
        font-size: 14px;
        font-weight: bold;
        margin: 0 0 5px;
      }

      & textarea {
        resize: none;
        width: 100%;
        padding: 5px 10px;
        margin-bottom: 5px;
      }

      & .buttons {
        display: flex;
        justify-content: flex-end;
        // gap: 5px;
      }

      & button {
        cursor: pointer;
        font-weight: bold;
        text-decoration: none;
        text-align: center;
        padding: 5px 10px;
        border: 1px solid transparent;
        border-radius: 4px;
        margin-left: 5px;
        transition: .3s;
        background-color: #3085d4;
        color: #e2efff;

        &:hover {
          background-color: #04499e;
        }

        &.delete {
          background-color: #e73737;
          color: #ffd7d7;

          &:hover {
            background-color: #bb1515;
          }
        }

        &.restore {
          background-color: #e7a937;
          color: #fff3dc;
          visibility: hidden;
          opacity: 0;

          &.shown {
            visibility: visible;
            opacity: 1;
          }

          &:hover {
            background-color: #b47c13;
          }
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
      height: calc(100vw - 40px);
      max-height: 80vh;
      margin: 0 0 10px 0;
    }
  }
}
</style>
