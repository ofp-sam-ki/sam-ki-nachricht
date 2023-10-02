<template>
  <div>
    <button v-if="!showNewMessage" class="button" @click="showNewMessage = true">Neue Meldung</button>
    <button v-if="!showMessageList" class="button" @click="showMessageList = true">Zustand abfragen</button>

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

<style>
.button {
  margin: 10px;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  border-width: 2px;
  background-color: #2e6a9c;
  cursor: pointer;
  color: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.button:hover {
    background-color: #3d7ebc;
}

.button:active {
  background-color: #1e4a6c; /* Change the background color on click */
  box-shadow: none; /* Remove the box shadow on click */
}

/* Mini Mobile Styles */
@media (max-width: 319px) {
  body {
    margin-left: 0px;
    margin-right: 0px;
  }
}

</style>