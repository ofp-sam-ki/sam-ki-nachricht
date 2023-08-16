<template>
  <div id="app" class="container">
    <!-- List of Items -->
    <div class="items-list">
      <div 
        v-for="(item, index) in items" 
        :key="item.id" 
        class="item" 
        :class="{ active: selectedItem === index }"
        @click="selectItem(index)"
      >
        {{ item.title }}
      </div>
    </div>

    <!-- Content Display and Status Bar -->
    <div class="content-area">
      <div class="content-display" v-if="selectedItem !== null">
        <h3>{{ items[selectedItem].title }}</h3>
        <p>{{ items[selectedItem].content }}</p>
        <img v-if="items[selectedItem].image" :src="items[selectedItem].image" alt="content image" />
      </div>

      <!-- Status Indicators -->
      <div class="status-bar-container">
        <div 
          v-for="(status, index) in statuses" 
          :key="status" 
          :class="[
            'status-circle', 
            { 
              active: items[selectedItem]?.status === status,
              'before-active': selectedItem !== null && index < statuses.indexOf(items[selectedItem].status)
            }
          ]"
        ></div>
        <div 
          v-for="(status, index) in statuses.slice(0, -1)" 
          :key="status + '-' + statuses[index + 1]"
          class="status-bar-line"
        ></div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Meldung 5", content: "Inhalt der Meldung 5", image: null, status: "Abgeschickt" },
        { title: "Meldung 6", content: "Inhalt der Meldung 6", image: null, status: "Empfangen" },
        { title: "Meldung 7", content: "Inhalt der Meldung 7", image: null, status: "in Bearbeitung" },
        { title: "Meldung 8", content: "Inhalt der Meldung 8", image: null, status: "Abgeschlossen" },
      ],
      selectedItem: null,
      statuses: ["Abgeschickt", "Empfangen", "in Bearbeitung", "Abgeschlossen"]
    };
  },
  methods: {
    selectItem(index) {
      this.selectedItem = index;
    },
    closeItem() {
      this.selectedItem = null;
    },
    nextItem() {
      if (this.selectedItem < this.items.length - 1) {
        this.selectedItem++;
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
}

.items-list {
  flex: 1;
  max-width: 250px;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}

.item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.item.active {
  background-color: #f5f5f5;
}

.content-area {
  flex: 3;
  padding: 20px;
}

.status-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.status-container {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 20px;
}

.status-circle {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #ccc;
}

.status-circle:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%; /* Start from the right edge of the circle */
  width: calc((100% - 20px) + 10px); /* Adjust based on spacing between circles */
  height: 2px;
  background-color: lightgrey;
  transform: translateY(-50%); /* Center the line vertically */
  z-index: -1; /* To ensure lines appear below the circles */
}

.status-circle.active {
  background-color: #007bff;
  border-color: #007bff;
}

.status-bar-line {
  flex: 1;
  height: 2px;
  background-color: #ccc;
}

.status-circle.before-active {
  background-color: grey;
  border-color: grey;
}

.status-circle.before-active:not(:last-child)::after {
  background-color: grey;
  height: 4px; /* Make the line thicker */
}
</style>
