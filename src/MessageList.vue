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
      <div class="status-indicators-container">
        <div 
          v-for="(status, index) in statuses" 
          :key="index" 
          :class="[
            'status-circle', 
            { 
              active: items[selectedItem]?.status === status,
              'before-active': selectedItem !== null && index < statuses.indexOf(items[selectedItem].status)
            }
          ]"
          :style="{ marginLeft: index === 0 ? 0 : '10px' }">
          <span class="status-text">{{ status }}</span>
        </div>
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

.status-indicators-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 20px;
  padding-top: 50px;
}

.status-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ccc;
  display: inline-block;
  position: relative;
  margin: 60px;
}


.status-text {
  position: absolute;
  bottom: -2em; /* Abstand Text zu Punkten */
  left: 0;
  display: block;
  font-size: 12px;
  line-height: 1.5;
  width: 100px;
}

/* Aktives Element - blau */
.status-circle.active {
  background-color: #2e6b9c;
}

/* Aktives Element - Text fett */
.status-circle.active .status-text {
  font-weight: bold;
}

/* aktive Verbindungslinien - blau */
.status-circle:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%; /* An rechter Kante von Punkten starten */
  width: calc(100% + 40px); /* An Abstand zwischen Punkten anpassen */
  height: 2px;
  background-color: lightgrey;
  transform: translateY(-50%); /* Linie vertikal zentrieren */
}

/* vergangene Verbindungslinien - grau */
.status-circle.before-active:not(:last-child)::after {
  background-color: grey;
  height: 4px; /* Linie dicker machen */
}

/* vergangene Punkte */
.status-circle.before-active {
  background-color: grey;
  border-color: grey;
}
</style>
