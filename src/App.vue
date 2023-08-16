<template>
  <div>
    <button @click="showNewMessage = true">Neue Meldung</button>
    <button @click="showMessageList = true">Zustand abfragen</button>

    <div v-if="showNewMessage">
      <NewMessageForm />
    </div>

    <div v-if="showMessageList">
      <MessageList />
    </div>
  </div>
</template>

<script>
import NewMessageForm from './NewMessageForm.vue'
import MessageList from './MessageList.vue'

export default {
  components: {
    NewMessageForm,
    MessageList
  },
  data() {
    return {
      showNewMessage: false,
      showMessageList: false
    }
  },
  watch: {
    showNewMessage(newValue) {
      if (newValue) {
        this.showMessageList = false
      }
    },
    showMessageList(newValue) {
      if (newValue) {
        this.showNewMessage = false
      }
    }
  }
}
</script>