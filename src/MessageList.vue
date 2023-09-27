<template>
  <div id="app" class="container" :class="{ 'menu-open': !menuOpen }">
    <div class="burger-menu" @click="toggleMenu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <!-- List of Items -->
    <div class="items-list" :class="{ 'active': menuOpen }">
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
        <p><strong>Abteilungen:</strong> {{ items[selectedItem].abteilungen }}</p>
        <p><strong>Auftrag:</strong> {{ items[selectedItem].auftrag }}</p>
        <p><strong>Baugruppe:</strong> {{ items[selectedItem].baugruppe }}</p>
        <p><strong>Grund:</strong> {{ items[selectedItem].grund }}</p>
        <p><strong>Zeitpunkt:</strong> {{ items[selectedItem].zeitstempel }} Uhr</p>
        <!-- <img v-if="items[selectedItem].image" :src="items[selectedItem].image" alt="Bild" /> -->
        <!-- Placeholder or Thumbnail Display -->
        <div v-for="(image, index) in items[selectedItem].images" :key="index" class="thumbnail-container">
          <div v-if="items[selectedItem].thumbnails && items[selectedItem].thumbnails[index]" class="thumbnail">
            <img :src="items[selectedItem].thumbnails[index]" @click="openImage(items[selectedItem].photos[index])" alt="Thumbnail" />
          </div>
          <button v-else class="thumbnail-placeholder" @click="openImage(items[selectedItem].photos[index])">{{ image }}</button>
        </div>

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
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      selectedItem: null,
      statuses: ["Abgeschickt", "Empfangen", "in Bearbeitung", "Abgeschlossen"],
      menuOpen: false
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:4000/Meldungen_Liste/MG1');
      const filenames = response.data;
      const promises = filenames.map(async (filename) => {
        try {
          const contentResponse = await axios.get(`http://localhost:4000/Meldungen/${filename}`);
          const item = contentResponse.data;
          console.log('item.images:', item.images); // Log item.images directly
          // const thumbnails = item.images ? item.images.map(imageName => `http://localhost:4000/thumbnail/${imageName}`) : [];
          const photos = item.images ? item.images.map(imageName => `http://localhost:4000/photo/${imageName}`) : [];
          this.items.push({
            title: `${item.Grund} ${item.Montageplatz} ${new Date(item.Zeitstempel).toLocaleString()}`,
            content: item.Text,
            // thumbnails,
            photos,
            // image: null, // Array mit Bildnamen, wenn Array, dann Thumbnails abrufen vom Server
            status: item.Status,
            abteilungen: item.Abteilungen.join(", "),
            auftrag: item.Auftrag,
            baugruppe: item.Baugruppe,
            grund: item.Grund.join(", "),
            zeitstempel: new Date(item.Zeitstempel).toLocaleString()
          });
          // log the URLs to the console
          // console.log('Thumbnails URLs:', thumbnails);
          console.log('Photos URLs:', photos);
        } catch (error) {
          console.error(`Error fetching content for ${filename}:`, error);
        }
      });
      await Promise.all(promises);
    } catch (error) {
      console.error('Error fetching filenames:', error);
    }
  },

  methods: {
    selectItem(index) {
      this.selectedItem = index;
      this.menuOpen = false;
    },
    closeItem() {
      this.selectedItem = null;
    },
    nextItem() {
      if (this.selectedItem < this.items.length - 1) {
        this.selectedItem++;
      }
    },
    toggleMenu() { 
      this.menuOpen = !this.menuOpen;
    },
    openImage(imageUrl) {
      window.open(imageUrl, '_blank');
    }
  },
};
</script>

<style>
.container {
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: row; /* children are laid out left-to-right */
}

.container.menu-open .content-area {
  margin-left: -150px; /* pushes the content area to the right when menu is open */
}

.thumbnail-container {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}

.thumbnail-container img {
  max-width: 100px;
  max-height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.thumbnail {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
}

.thumbnail img {
  display: block;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.thumbnail-placeholder {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
  text-align: center;
  line-height: 100px;
  color: #000;
}

.burger-menu {
  display: block;
  cursor: pointer;
  position: fixed; /* Make the burger menu fixed */
  top: 100px;
  left: 10px;
  z-index: 10; /* Ensure it's above other elements */
}

.burger-menu .bar {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 5px 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 69px;
  max-width: 250px;
  overflow-y: auto;
  border-right: 1px solid #ccc;
  transition: max-height 0.3s ease-in-out;
  max-height: 0; /* Hide the menu by default */
  width: 150px; /* or whatever fixed width you want */
  flex-shrink: 0; /* prevent it from shrinking */
}

.items-list.active {
  max-height: 500px;  
  display: flex;
  flex-direction: column;
}


.item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.item.active {
  background-color: #f5f5f5;
}

.item-hover {
  background-color: #f2f2f2;
}

.content-area {
  flex: 1;
  padding: 20px;
  position: relative; /* Ensure it has a positioning context */
  z-index: 5; /* This ensures it's below the burger menu */
  flex-grow: 300; /* allows this area to grow and take up available space */
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

/* Mini Mobile Styles */
@media (max-width: 319px) {
  .container {
    font-size: 10px;
  }

  .content-area {
    padding: 10px;
  }

  .content-display {
    font-size: 10px;
  }

  .burger-menu {
    top: 130px;
    left: 10px;
  }

  .status-circle {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    margin-left: 0px;
  }

  .status-text {
    font-size: 7px;
    width: 80px;
  }

  .status-circle:not(:last-child)::after {
    width: calc(150%); /* An Abstand zwischen Punkten anpassen */
    height: 1px;
  }

  .status-circle.before-active:not(:last-child)::after {
    height: 2px;
  }
}

/* Mobile styles */
@media (min-width: 320px) and (max-width: 767px) {
  .container {
    font-size: 10px;
  }

  .content-area {
    padding: 10px;
  }

  .content-display {
    font-size: 10px;
  }

  .status-circle {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    margin-left: 0px;
  }

  .status-text {
    font-size: 7px;
    width: 80px;
  }

  .status-circle:not(:last-child)::after {
    width: calc(150%); /* An Abstand zwischen Punkten anpassen */
    height: 1px;
  }

  .status-circle.before-active:not(:last-child)::after {
    height: 2px;
  }
}

/* Tablet styles */
@media (min-width: 768px) {
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
    font-size: 14px;
  }

  .status-indicators-container {
    padding-top: 40px;
  }

  .message-container {
    margin-bottom: 40px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .status-circle {
    width: 50px;
    height: 50px;
    margin: 30px;
  }

  .status-text {
    font-size: 16px;
    width: 150px;
  }

  .status-indicators-container {
    padding-top: 60px;
  }

  .message-container {
    margin-bottom: 60px;
  }

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
}
</style>
