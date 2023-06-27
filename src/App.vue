<template>
  <div>
  <form-wizard @on-complete="onComplete"
               @on-loading="setLoading"
               @on-validate="handleValidation"
               @on-change="tabChange"
               @on-error="handleErrorMessage" title="SAM-KI-Nachricht" subtitle="Stand 20.4.22 (Beta v0.1.2)" shape="tab" color="#006da0"
               back-button-text="Zurück"
               next-button-text="Weiter"
               finish-button-text="Einreichen">
    <tab-content title="Auswahl der Abteilung" :selected="true" :before-change="validate">
      <div class="form-group">
        <div>
          <drag-selector v-model="AuswahlAbteilungen" @change="changeAbteilung" class="drag-selector" ref="dragAbteilungen">
            <drag-selector-item-c v-for="(item, index) in RepertoireAbteilungen"
                                :value="item"
                                :key="index" class="drag-selector__item" :clear="clearAuswahlAbteilungen" :ref="'abt' + item">
                {{ item }}
            </drag-selector-item-c>
          </drag-selector>
        </div>

        <ModalComponent v-model="showModalEinst" title="Einstellungen" @before-close="einstellungenSpeichern" @before-open="modellSelectedSetzen">
          Montageplatz: <input type="text" id="inputBoxHost" :placeholder='montageplatz' v-model='montageplatz'><br>
          Host für Modelle: <input type="text" id="inputBoxHost" :placeholder='modelhost' v-model='modelhost'><br>
          Informationsmodell:
          <select v-model="selected" id="modellSelect">
            <option v-for="Modellname in Modelle" :key="Modellname" :value="Modellname">
              {{Modellname}}
            </option>
          </select>
          <!--<br><button type="button" class="button" @click="showModalEinst=false" style="float: right;">
            Schließen
          </button-->
        </ModalComponent>
      </div>
    </tab-content>
    <tab-content title="Grund der Kommunikation" :before-change="validate2" ref="tabgdk">
      <div class="form-group">
        <!-- <drag-selector-s v-model="AuswahlGrund" @change="changeGrund" class="drag-selector" id="selectorGrund" :clear="clearAuswahlGrund"> -->
        <drag-selector v-model="AuswahlGrund" @change="changeGrund" class="drag-selector" id="selectorGrund">
          <drag-selector-item-c v-for="(item, index) in MoeglicheGruende"
                              :value="item"
                              :key="index" class="drag-selector__item" :clear="clearAuswahlGrund" :ref="'gdk' + item">
              {{ item }}
          </drag-selector-item-c>
        </drag-selector>
      </div>
    </tab-content>

    <tab-content title="Anlagen" :before-change="validateAnlagen" ref="tabanlagen">
      <div>
        <table class="center">
          <tr>
            <div class="btn-group" v-if="displayScan">
              <div style="background-color:lightblue; width: 150px; height: 100px; float:left;font-size:24px;text-align:center;vertical-align: middle;padding-top:35px">Auftrag</div>
              <div style="background-color:white; width: 200px; height: 100px; float:left;font-size:24px;text-align:center;vertical-align: middle;">
               <p> {{ auftrag }} </p>
              </div>
              <button id="auftrag_scan" @click="scanAuftrag"><span>&#128269;</span></button>
              <button id="auftrag_edit" @click="showModalA=true" style="color:black;"><span>&#9998;</span></button>
              <button id="auftrag_rem" @click="auftrag='';">
                <span v-if="auftrag==''" style="color:grey;">&#215;</span>
                <span v-if="auftrag!=''" style="color:red;">&#215;</span>
              </button>
            </div>
          </tr>
          <ModalComponent v-model="showModalA" title="Auftrag" @after-open="textboxfokus('Auftrag')">
            <input id="Auftrag" type="text" class="form-control" v-model="auftrag" />
          </ModalComponent>
          <div class="container" v-if="!displayScan">
            <div class="barcode-scanner--area--container">
              <div class="relative" style="justify-content:center;display:flex;font-size:18px">
                <p>Auf Code ausrichten.</p><br>
              </div>
              <div class="relative" style="justify-content:center;display:flex;font-size:24px">
                <button id="auftrag_scan_ende" @click="scanEnde" style="width:200px;height:50px;"><span style="color:red;font-size:24px">Abbrechen</span></button>
              </div>
              <!-- div class="square">
                <div class="barcode-scanner--area--outer">
                  <div class="barcode-scanner--area--inner"></div>
                </div>
              </!-->
            </div>
          </div>
          

          <tr>
            <div class="btn-group" v-if="displayScan">
              <div style="background-color:lightblue; width: 150px; height: 100px; float:left;font-size:24px;text-align:center;vertical-align: middle;padding-top:35px">Baugruppe</div>
              <div style="background-color:white; width: 200px; height: 100px; float:left;font-size:24px;text-align:center;vertical-align: middle;">
               <p> {{ baugruppe }} </p>
              </div>
              <button id="bgruppe_scan" @click="scanBaugruppe"><span>&#128269;</span></button>
              <button id="bgruppe_edit" @click="showModalB=true" style="color:black;"><span>&#9998;</span></button>
              <button id="bgruppe_rem" @click="baugruppe='';">
                <span v-if="baugruppe==''" style="color:grey;">&#215;</span>
                <span v-if="baugruppe!=''" style="color:red;">&#215;</span>
              </button>
            </div>
          </tr>
          <ModalComponent v-model="showModalB" title="Baugruppe" @after-open="textboxfokus('Baugruppe')">
            <input id="Baugruppe" type="text" class="form-control" v-model="baugruppe" />
          </ModalComponent>

       <!-- FOTO -->
        <tr>
        <div class="btn-group" v-if="displayScan">
          <div style="background-color:lightblue; width: 150px; height: 100px; float:left;font-size:24px;text-align:center;vertical-align: middle;padding-top:35px;">Foto</div>
          <input id="bild" type="file" accept="image/*" capture="camera" style="display:none;" @change="onImageChange" />
          <button id="bild_vorschau" @click="showModalBVorschau=true" style="font-size:24px;width:200px">
            <span v-if="!imageData" style="color:lightgrey;">Vorschau</span>
            <img v-if="imageData" :src="imageData" style="max-width:100%;max-height:100%;">
          </button>
          <button id="bild_add" onclick="document.getElementById('bild').click();" style="color:green;"><span>&#128247;</span></button>
          <!-- button id="bild_edit" :disabled="!imageData" @click="showModalBEditor=true" style="color:grey;"><span>&#9998;</span></button-->
          <button id="bild_edit" :disabled="!imageData" @click="showModalBEditor=true" style="color:grey;"><span>&#9998;</span></button>
          <button id="bild_rem" :disabled="!imageData" @click="removeImage" style="color:grey;"><span>&#215;</span></button>
        </div>
        </tr>
        <ModalComponent v-model="showModalBVorschau" title="Foto" modal-class="modal-gross">
          <img style="max-width:100%;max-height:100%;" :src="imageData" />
        </ModalComponent>
        <ModalComponent v-model="showModalBEditor" title="Freies Markieren" modal-class="modal-gross" @after-open="initializeCanvas">
          <div ref="editorContainer">
            <button @click="cancelEditing" style="border-radius: 5px;background-color: #006da0;border: none;color: white;padding: 8px 16px;text-align: center;text-decoration: none;display: inline-block;font-size: 14px;margin-bottom: 20px;">Unmarkiert übernehmen</button>
            <button @click="saveEdits" style="border-radius: 5px;background-color: #006da0;border: none;color: white;padding: 8px 16px;text-align: center;text-decoration: none;display: inline-block;font-size: 14px;margin-bottom: 20px;float: right;">Markiert übernehmen</button>
            <br>
            <div class="color-selector" style="display:flex;justify-content: center;align-items: center;">
              <span style="margin-right:5px">Farbwahl:</span>
              <button
                v-for="color in colors"
                :key="color"
                :style="{ backgroundColor: color }"
                :class="{ 
                  selected: color === selectedColor, 
                  dark: darkColors.includes(color) && color === selectedColor,
                  light: lightColors.includes(color) && color === selectedColor
                }"
                @click="selectedColor = color"
              ></button>
            </div>
            
            
            <canvas ref="canvas" 
              @mousedown="startDrawing"
              @mousemove="draw"
              @mouseup="stopDrawing"
              @mouseleave="stopDrawing"
              @touchstart.prevent="startDrawing"
              @touchmove.prevent="draw"
              @touchend.prevent="stopDrawing"
              @touchcancel.prevent="stopDrawing"
              style="float: left; border: none; max-width:100%;max-height:100%;"></canvas>
          </div>
          
        </ModalComponent>


        <!-- VIDEO -->
        <!--tr>
        <div class="btn-group" v-if="displayScan">
          <div style="background-color:lightblue; width: 150px; height: 100px; float:left;font-size:24px;text-align:center;vertical-align: middle;padding-top:35px">Video</div>
          <button id="video_vorschau" :disabled="!videoUrl" @click="showModalVVorschau=true" style="font-size:24px;width:200px">
            <span v-if="videoUrl" style="color:black;">Vorschau</span> 
            <span v-if="!videoUrl" style="color:lightgrey;">Vorschau</span>
          </button>
          <button id="video_add" @click="showModalVVorschau=true"><span>&#128247;</span></button>
          <button id="video_leer" disabled=true></button>
          <button id="video_rem" :disabled="!videoUrl" @click="removeVideo">
            <span v-if="videoUrl" style="color:red;">&#215;</span> 
            <span v-if="!videoUrl" style="color:grey;">&#215;</span>
          </button>
        </div>
        </!--tr>
        <ModalComponent v-model="showModalVVorschau" title="Video" @before-open="openVideo" @before-close="endVideo" modal-class="modal-flex">
          <div style="text-align: center;">
            <video ref="videoRec" width="640" height="auto" autoplay muted playsinline controls data-wf-ignore="true" data-object-fit="cover" />
            <br>

            <button class="button btn-video" v-if="!isRecording && !isFinished" @click="record">
              <span style="color:red;">⬤</span>
            </button>
            <button class="button btn-video" v-if="isRecording && !isFinished" @click="stop">
              <span>◼</span>
            </button>
            <button class="button btn-video" @click="resetVideo" v-if="isFinished">
              <span style="color:red;">&#10006;</span>
            </button>
          </div>
        </ModalComponent -->

        <tr>
          <div class="btn-group" v-if="displayScan">
            <div style="background-color:lightblue; width: 150px; height: 100px; float:left;font-size:24px;text-align:center;vertical-align: middle;padding-top:35px">Freitext</div>
            <button id="freitext_vorschau" @click="showModalF=true" style="font-size:24px;width:200px">
              <span v-if="freitext" style="color:black;font-size:8px;white-space: pre-wrap;line-height:1">{{freitext}}</span> 
              <span v-if="!freitext" style="color:lightgrey;">Vorschau</span> 
            </button>
            <button id="text_leer" disabled></button>
            <button id="text_add" @click="showModalF=true" style="color:black;"><span>&#9998;</span></button>            
            <button id="text_rem" @click="freitext='';">
              <span v-if="freitext==''" style="color:grey;">&#215;</span>
              <span v-if="freitext!=''" style="color:red;">&#215;</span>
            </button>
          </div>
        </tr>
        <ModalComponent v-model="showModalF" title="Freitext" @after-open="textboxfokus('freitextbox')">
          <textarea class="form-control"
            placeholder="Freitext"
            v-model="freitext"
            style="height:80px; width:400px;"
            id="freitextbox"
          ></textarea>
        </ModalComponent>
        </table>
      </div>
    </tab-content>

    <tab-content title="Auswahl Verantwortlicher" :before-change="validate3">
      <div class="form-group">
        <div>
          <drag-selector v-model="AuswahlVerantwortliche" @change="changeVerantwortlicher" class="drag-selector">
              <drag-selector-item-c v-for="(item, index) in MoeglicheVerantwortliche"
                                  :value="item"
                                  :key="index" class="drag-selector__item" :clear="clearAuswahlVerantwortliche" :ref="'ver' + item">
                  {{ item }}
              </drag-selector-item-c>
          </drag-selector>
        </div>
      </div>
    </tab-content>

    <tab-content title="Zusammenfassung">
      <div class="form-group">
        <table>
          <tr>
            <td>Betroffene Abteilungen:</td>
            <td>{{BetroffeneAbteilungen}}</td>
          </tr>
          <tr>
            <td>Gewählte Gründe:</td>
            <td>{{GewaehlteGruende}}</td>
          </tr>
          <tr>
            <td>Gewählte Verantwortliche:</td>
            <td>{{GewaehlteVerantwortliche}}</td>
          </tr>
          <tr>
            <td>Montageplatz:</td>
            <td>{{ montageplatz }}</td>
          </tr>
          <tr>
            <td>Baugruppe:</td>
            <td>{{ baugruppe }}</td>
          </tr>
          <tr>
            <td>Auftrag:</td>
            <td>{{ auftrag }}</td>
          </tr>
        </table>

        <!-- Zeigt Freitext an, falls vorhanden -->
        <div v-if="freitext">
          <p>Freitext: {{ freitext }}</p>
        </div>

        <!-- Zeigt Bilder in der Uebersicht an -->
        <div v-if="imageData">
          <img :src="imageData" style="max-width:30%">
        </div>

        <!-- Zeigt Video an, ob Video hochgeladen wurde -->
        <!-- div v-if="videoUrl">
          <video ref="videoPlayer" :src="videoUrl" width="640" height="480" autoplay loop muted playsinline />
        </!-->
      </div>
    </tab-content>

    <button id="finishbtn" class="wizard-btn" style="background-color: rgb(35, 204, 239); border-color: rgb(35, 204, 239); color: white;box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3)" slot="finish">
      Melden
      <pulse-loader :loading="loading" :color="spinner.color" :size="spinner.size"></pulse-loader>
    </button>
    
  </form-wizard>

    <div style="text-align:center" v-if="displayScan">
      <button type="button" class="button" @click="showModalEinst=true" style="background-color: transparent;">
        <img src="./assets/feld_einstellungen3.png" style="height:50px;width:50px;border-radius:50%;box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3)">
      </button>
      <button type="button" class="button" @click="showModalLizenz=true" style="background-color: transparent;">
        <img src="./assets/feld_info.png" style="height:50px;width:50px;border-radius:50%;box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3)">
      </button>
       <button type="button" class="button" @click="showModalProblem=true" style="background-color: transparent;">
        <img src="./assets/feld_idee.png" style="height:50px;width:50px;border-radius:50%;box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3)">
      </button>
    </div>

    <ModalComponent v-model="showModalLizenz" title="Informationen und Lizenzen">
      Implementierung im Förderprojekt SAM-KI<br>
      (c) 2023 Fraunhofer Institut für Produktionstechnik<br>und Automatisierung (FhG IPA)<br>
      <textarea class="textbox" name="note">
        Vue.js

        VueDragSelector

        VueModal

        SendIntent

        Capacitor

        VueFormWizard
        https://github.com/BinarCode/vue-form-wizard
        MIT License
        Copyright (c) 2017 Cristi Jora
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </textarea>
    </ModalComponent>
     <ModalComponent v-model="showModalProblem" title="Problem oder Feedback melden" modal-class="modal-problem" v-on:click.self="cancelProblemReport">
      <div>
        <label for="problemDescription" style="display: block; margin-bottom: 10px;">Beschreibung:</label>
        <textarea id="problemDescription" v-model="problemDescription" style="display: block; resize: none; width: 98%; height: 200px; margin-bottom: 20px;"></textarea>
      </div>
      <button @click.stop="cancelProblemReport" class="button">Abbrechen</button>
      <button @click.stop="reportProblem" class="button" style="float: right;">Problem melden</button>
    </ModalComponent>
  </div>
</template>
<script>
//import { json } from 'express/lib/response';

import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Vue from "vue";
import { Preferences } from '@capacitor/preferences';
import { ImageEditor } from '@toast-ui/vue-image-editor';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Filesystem } from '@capacitor/filesystem';

export default {
  name: "App",
  components: {
    PulseLoader
  },
  mixins: [],
  data() {
    return {
      imageBase64: '',
      uri: '',
      loading: false,
      imageData: [],
      selectedImages: [],
      video: null,
      montageplatz: '',
      baugruppe: '',
      auftrag: '',
      name: '',
      freitext: "",
      selected: [],
      showModal: false,
      showModalV: false,
      showModalF: false,
      showModalB: false,
      showModalBScan: false,
      showModalA: false,
      showModalAScan: false,
      showModalEinst: false,
      showModalVVorschau: false,
      showModalBVorschau: false,
      showModalBEditor: false,
      showModalProblem: false,
      problemDescription: '',
      displayScan: true,
      AuswahlAbteilungen: [],
      BetroffeneAbteilungen: '',
      AuswahlGrund: [],
      GewaehlteGruende: '',
      AuswahlVerantwortliche: [],
      GewaehlteVerantwortliche: '',
      RepertoireAbteilungen: [
        'Elektronik'
      ],
      RepertoireGruende: {
        'Elektronik': ['Fehler Ladeelektronik', 'Fehler Modbus']
      },
      RepertoireVerantwortliche: {
        'Elektronik': ['Test Person']
      },
      MoeglicheGruende: [],
      MoeglicheVerantwortliche: [],
      clearAuswahlAbteilungen: false,
      clearAuswahlGrund: false,
      clearAuswahlVerantwortliche: false,
      spinner: {
        color: 'white',
        size: '30px',
        margin: '2px',
        radius: '100%'
      },
      modelhost: '',
      tmp_modelhost: '',
      modellidentifikation: '',
      tmp_modellidentifikation: '',
      showModalLizenz: false,
      Modell: {},
      Modelle: [],
      pref: {},
      useDefaultUI: true,
      bildpfad: "",
      queryInput: {
        montageplatz: '',
        baugruppe: '',
        auftrag: '',
        freitext: '',
        AuswahlAbteilungen: [],
        AuswahlGrund: [],
        AuswahlVerantwortliche: [],
        photo: '',
        video: '',
        report: ''
      },
      isRecording: false, // recording mode identifier
      isFinished: false, // finished recording - action buttons indicator
      recorder: null, // component wide MediaRecorder
      videoUrl: null, // link to video - assigned when done writing video file
      stream: null,
      // Canvas
      canvas: null,
      ctx: null,
      img: new Image(),
      isDrawing: false,
      editMode: false,
      colors: ['red', 'yellow', 'green', 'blue', 'white', 'black'],
      lightColors: ['red', 'yellow', 'white'],
      darkColors: ['green', 'blue', 'black'],
      selectedColor: 'red', // Default selected color
      // Canvas Ende
    };
  },
  async beforeMount(){
    console.log("Funktion beforeMount");
    this.initialisieren();
    this.queriesAbfragen();
  },
  watch: {
    showModalBEditor(newValue) {
      if (newValue) {
        if (this.$refs.canvas) {
          this.initializeCanvas();
        } else {
          this.$nextTick(() => {
            this.initializeCanvas();
          });
        }
      } else {
        this.stopDrawing();
      }
    },
    imageData(newImageData, oldImageData) {
      if (newImageData !== oldImageData && newImageData != null) {
        this.showModalBEditor = true;
      }
    },
  },
  mounted() {
    console.log("Funktion mounted");
    /*const items = this.$capacitor.getIntent().getAction().getItems();
    for (let i = 0; i < items.length; i++)
    {
      const item = items[i];
      const uri = item.getUri();
      const mimeType = item.getType();
    }*/
  },
  methods: {
    openVideo() {
      console.log("Funktion openVideo");
      this.$refs.videoRec.setAttribute('autoplay', '');
      this.$refs.videoRec.setAttribute('muted', '');
      this.$refs.videoRec.setAttribute('playsinline', '');

      if (this.videoUrl != null)
      {
        this.initPlayer();
      } else {
        this.resetVideo();
      }
    },
    initPlayer() {
      console.log("Funktion initPlayer");
      //this.$refs.videoRec.autoplay = true;
      this.$refs.videoRec.controls = true;
      this.$refs.videoRec.src = this.videoUrl;
      this.$refs.videoRec.srcObject = null;
    },
    resetVideo() {
      console.log("Funktion resetVideo");
      this.isFinished = false;
      this.isRecording = false;
      this.isLoading = true;
      this.videoUrl = null;
      //this.$refs.videoRec.controls = false;
      //this.$refs.videoRec.autoplay = true;

      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        })
        .then(this.gotStream)
        .catch(() => (this.isValid = false));
    },
    // start recoording
    record() {
      console.log("Funktion record");
      this.recorder.start();
      console.log("Funktion start");
      this.isRecording = true;
      console.log("Funktion isRecording");
      this.$refs.videoRec.controls = false;
      console.log("Funktion controls");
      setTimeout(this.stop, 6000);
      console.log("Funktion setTimeout");
    },
    // stop recording
    stop() {
      console.log("Funktion stop");
      this.recorder.stop()
      this.isRecording = false;
      this.isFinished = true;
      //this.$refs.videoRec.load();
    },
    // reset video diaply and emit video file url
    endVideo() {
      console.log("Funktion endVideo");
      this.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    },
    // initialize MediaRecorder and video element source
    gotStream(mediaStream) {
      console.log("Funktion gotStream");
      this.recorder = new MediaRecorder(mediaStream, {
        mimeType: "video/mp4", //video/webm unter nicht-ios!!
        //audioBitsPerSecond: 128000
      });
      this.recorder.prepare();
      if (mediaStream == null) console.log("mediastream ist null");
      if (this.recorder == null) console.log("recorder ist null");
      this.recorder.ondataavailable = this.videoDataHandler;
      this.$refs.videoRec.src = null;
      this.$refs.videoRec.srcObject = mediaStream;
      this.stream = mediaStream;
    },
    // handle sending data for writing using the given WebSocket
    videoDataHandler(event) {
      this.$refs.videoRec.src = null;
      this.videoUrl = window.URL.createObjectURL(event.data);
      this.$refs.videoRec.src = this.videoUrl;
      this.$refs.videoRec.srcObject = null;
      this.initPlayer();
      /*this.$refs.videoPlayer.src = this.videoUrl;
      this.$refs.videoPlayer.srcObject = null;
      this.$refs.videoPlayer.load();*/
    },
    queriesAbfragen() {
      /*console.log("Funktion queriesAbfragen");
      var queries = this.$route.query;
      var keys = Object.keys(queries);

      if (keys.length > 0)
      {
        if (keys.includes('montageplatz')) this.montageplatz = queries['montageplatz'];
        if (keys.includes('baugruppe')) this.montageplatz = queries['baugruppe'];
        if (keys.includes('auftrag')) this.montageplatz = queries['auftrag'];
        if (keys.includes('freitext')) this.montageplatz = queries['freitext'];
        if (keys.includes('photo')) {
          const readFilePath = async () => {
            const contents = await Filesystem.readFile({
              path: queries['photo']
            });

            console.log('data:', contents);
          };
        }
      }*/
    },
    textboxfokus (id) {
      console.log("textboxfokus " + id);
      document.getElementById(id).focus();
    },
    async afterOpenScan () {
      console.log("Funktion afterOpenScan");
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      BarcodeScanner.showBackground();

      if (result.hasContent) {
        this.auftrag = result.content;
      }
    },
    async scanAuftrag () {
      console.log("Funktion scanAuftrag");
      this.displayScan = false;
      var body = document.getElementsByTagName('body')[0];
      body.style.backgroundImage = 'none';

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      this.displayScan = true;
      body.style.backgroundImage = 'url(Logo_kombiniert.png)';

      if (result.hasContent) {
        this.auftrag = result.content;
      }
    },
    async scanBaugruppe () {
      console.log("Funktion scanBaugruppe");
      this.displayScan = false;
      var body = document.getElementsByTagName('body')[0];
      body.style.backgroundImage = 'none';

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      this.displayScan = true;
      body.style.backgroundImage = 'url(Logo_kombiniert.png)';

      if (result.hasContent) {
        this.baugruppe = result.content;
      }
    },
    async scanEnde () {
      console.log("Funktion scanEnde");
      await BarcodeScanner.stopScan(); // start scanning and wait for a result

      var body = document.getElementsByTagName('body')[0];
      body.style.backgroundImage = 'url(Logo_kombiniert.png)';

      this.displayScan = true;
    },
    dataURLtoFile: function (dataurl, filename) {
      console.log("Funktion dataURLtoFile");
      var arr = dataurl.split(','), 
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);

      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, {type:mime});
    },
    removeImage () {
      console.log("Funktion removeImage");
      var bild = document.getElementById('bild');
      bild.value = "";

      var e = {};
      e.target = {};
      e.target.files = null;
      this.onImageChange(e);
    },
    removeImages() {
      // Sort in descending order to avoid messing up the indices when splicing
      this.selectedImages.sort((a, b) => b - a);
      this.selectedImages.forEach(index => {
        this.imageData.splice(index, 1);
      });
      this.selectedImages = [];
    },
    removeVideo() {
      console.log("Funktion removeVideo");
      this.video = null;
    },
    onImageChange(e) {
      console.log("Funktion onImageChange");
      var addButton = document.getElementById('bild_add');
      var editButton = document.getElementById('bild_edit');
      var remButton = document.getElementById('bild_rem');

      const files = e.target.files;
      this.imageData = null;

      if (files) {
        addButton.style.color="grey";
        editButton.style.color="black";
        remButton.style.color="red";

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageData = reader.result;
            // this.imageData.push(reader.result);
            this.img.src = this.imageData;
          };
          this.bildpfad = file;
        }
      } else {
        addButton.style.color="green";
        editButton.style.color="grey";
        remButton.style.color="grey";
      }
    },
    imageNachEditor() {
      this.$refs.tuiImageEditor.invoke('loadImageFromFile', this.bildpfad, 'image');
    },
    imageAusEditorSpeichern() {
      var dataURL = this.$refs.tuiImageEditor.invoke('toDataURL');
      var parseFile = this.dataURLtoFile(dataURL, 'image');
      this.bildpfad = parseFile;
    },
    // Canvas
    initializeCanvas() {
      if (!this.imageData) {
        return;
      }

      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");

      // Create a new image object
      let img = new Image();

      // When the image has loaded, draw it on the canvas
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.editMode = true;
      };

      // Start loading the image
      img.src = this.imageData;
    },
    getEventCoords(e) {
      const event = e.type.startsWith('touch') ? e.touches[0] : e;
      const rect = this.canvas.getBoundingClientRect();
      // Calculate the scale factor
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;

      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
      };
    },
    startDrawing(e) {
      if (!this.editMode) return;
      this.isDrawing = true;
      this.ctx.strokeStyle = this.selectedColor;
      this.ctx.beginPath();
      const coords = this.getEventCoords(e);
      this.ctx.moveTo(coords.x, coords.y);
    },
    draw(e) {
      if (!this.isDrawing) return;
      const coords = this.getEventCoords(e);
      this.ctx.lineWidth = 8;
      this.ctx.lineTo(coords.x, coords.y);      
      this.ctx.stroke();
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    saveEdits() {
      this.imageData = this.canvas.toDataURL("image/jpeg", 0.7);
      this.$nextTick(() => {
        this.showModalBEditor = false;
      });
      this.editMode = false;
    },
    drawImageOnCanvas() {
      const img = this.$refs.imageInModal;
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    },
    saveImage() {
      const link = document.createElement("a");
      link.href = this.canvas.toDataURL("image/jpeg", 0.7);
      link.download = "edited-image.jpeg";
      link.click();
    },
    cancelEditing() {
      this.showModalBEditor = false;
      this.editMode = false;
    },
    // Canvas Ende
    // Problemmeldung
    reportProblem() {
      //var host = this.modelhost;//'http://' + window.location.hostname;
      var host = 'http://127.0.0.1:4000'; // Host auf Port 4000 geändert, da sonst CORS Fehler
      let content = {
        description: this.problemDescription
      };

      axios({
        method: 'post',
        url: host + '/feedback',
        data: content
      }).then((response) => {
          if (response.status == 200) {
              alert("Erfolgreich gemeldet!");
              this.showModalProblem = false;
              this.problemDescription = '';
          } else {
              alert("Melden fehlgeschlagen!");
          }
      }).catch((error) => {
          alert("Melden fehlgeschlagen! " + error);
      });
    },
    cancelProblemReport() {
      this.showModalProblem = false;
      this.problemDescription = '';
    },
    // Problemmeldung Ende
    hostGeaendert() {
      console.log("Funktion hostGeaendert");
      this.AuswahlAbteilungen = [];
      this.AuswahlGrund = [];
      this.AuswahlVerantwortliche = [];
      this.clearAuswahlAbteilungen = !this.clearAuswahlAbteilungen;
      this.changeAbteilung();

      var vm = this;

      axios.get(this.modelhost +'/Modelle')
      .then(function (response){
        console.log("axios.get Modelle");
        vm.Modelle = response.data;
        console.log(vm.Modelle);
      })
      .catch(function (error) {
        console.log("axios.get Fehler: " + error.message);
      })
      .finally(function(){ });

      //wenn aktuelle modellidentifikation nicht enthalten ist, muss die liste und die auswahl ebenfalls aktualisiert werden
    },
    async einstellungHolen (key, standard)
    {
      console.log("Funktion einstellungHolen");
      console.log("Einstellung holen: " + key);
      const preferences = await Preferences.keys();
      console.log("existierende Einstellungen: " + preferences.toString());
      if (preferences.keys.includes(key))
      {
        const r = (await Preferences.get({key: key})).value;
        console.log("Einstellung vorhanden, Wert: " + r);
        return r;
      }
      console.log("Einstellung nicht vorhanden, Standardwert: " + standard);
      return standard;
    },
    async einstellungenPruefen(key, value)
    {
      console.log("Funktion einstellungenPruefen");
      const preferences = await Preferences.keys();
      if (!preferences.keys.includes(key))
      {
        await Preferences.set({
          key: key,
          value: value
        })
      }
    },
    async initialisieren()
    {
      console.log("Funktion initialisieren");
      const status = BarcodeScanner.checkPermission({ force: true });
      //BarcodeScanner.prepare();

      await this.einstellungenPruefen('host', 'http://' + window.location.hostname + ':4000');
      await this.einstellungenPruefen('modellidentifikation', 'Beispielmodell.json');
      await this.einstellungenPruefen('montageplatz', 'Beispielplatz');

      this.modelhost = await this.einstellungHolen('host', 'http://' + window.location.hostname + ':4000');
      this.modellidentifikation = await this.einstellungHolen('modellidentifikation', 'Beispielmodell.json');
      this.montageplatz = await this.einstellungHolen('montageplatz', 'Beispielplatz');

      this.hostGeaendert();
      this.modellInitialisieren();
    },
    anderesmodell() {
      console.log("funktion anderesmodell");
      this.modellInitialisieren();
    },
    modellInitialisieren() {
      console.log("funktion modellInitialisieren");

      var vm = this;

      if (this.modellidentifikation == '')
      {
        console.log("modellidentifikation leer");
      } else {
        axios.get(this.modelhost +'/Modelle/' + this.modellidentifikation)
        .then(function (response){
          console.log(response.data);
          vm.Modell = response.data;
          vm.RepertoireAbteilungen = response.data.RepertoireAbteilungen;
          vm.RepertoireGruende = response.data.RepertoireGruende;
          vm.RepertoireVerantwortliche = response.data.RepertoireVerantwortliche;
          vm.Ziele = vm.Modell.VerantwortlicheAdressen;
        });
      }
    },
    modellSelectedSetzen()
    {
      //this.tmp_modelhost = this.modelhost;
      var modellSelect = document.getElementById('modellSelect');

      for(var i = 0; i < modellSelect.options.length; i++)
      {
        if(modellSelect.options[i].value == this.modellidentifikation)
        {
          modellSelect.options.selectedIndex = i;
          break;
        }
      }
    },
    modelleInitialisieren()
    {
      var vm = this;

      axios.get(this.modelhost +'/Modelle/' + this.modellidentifikation)
      .then(function (response){
        console.log(response.data);
        vm.Modell = response.data;
        vm.RepertoireAbteilungen = response.data.RepertoireAbteilungen;
        vm.RepertoireGruende = response.data.RepertoireGruende;
        vm.RepertoireVerantwortliche = response.data.RepertoireVerantwortliche;
        vm.Ziele = vm.Modell.VerantwortlicheAdressen;

        Vue.nextTick(() => { 
          const params = new URLSearchParams(window.location.search);

          var ref_shortened = [];
          for (var ref in vm.$refs)
          {
            if (ref.length > 3)
            {
              ref_shortened.push(ref.substring(3));
            }
          }

          if(params.has('abt'))
          {
            const abt_query = params.get('abt');
            const abt_array = abt_query.split(";");
            abt_array.forEach(element => {
              if(Array.prototype.includes.call(ref_shortened, element))
              {
                vm.$refs['abt' + element][0].handleClick();
                vm.AuswahlAbteilungen.push(element);
              }
            });
          }
          if(params.has('gdk'))
          {
            const gdk_query = params.get('gdk');
            const gdk_array = gdk_query.split(";");
            gdk_array.forEach(element => {
              if(Array.prototype.includes.call(ref_shortened, element))
              {
                vm.$refs['gdk' + element][0].handleClick();
                vm.AuswahlGrund.push(element);
              }
            });
          }
          if(params.has('ver'))
          {
            const ver_query = params.get('ver');
            const ver_array = ver_query.split(";");
            ver_array.forEach(element => {
              if(Array.prototype.includes.call(ref_shortened, element))
              {
                vm.$refs['ver' + element][0].handleClick();
                vm.AuswahlVerantwortliche.push(element);
              }
            });
          }
        });
      })
      .finally(function(){ });
    },
    async einstellungenSpeichern(event)
    {
      console.log("einstellungenSpeichern: ");
      
      console.log("montageplatz: " + this.montageplatz);
      if (this.modelhost != this.tmp_modelhost)
      {
        console.log("Speichere modelhost: " + this.modelhost);
        await Preferences.set({
          key: 'host',
          value: this.modelhost
        });
        this.hostGeaendert();
      } else {
        console.log("modelhost unverändert");
      }
      
      await Preferences.set({
        key: 'montageplatz',
        value: this.montageplatz
      });
      var modellSelect = document.getElementById('modellSelect');
      try {
        var val = modellSelect.options[modellSelect.options.selectedIndex].value;
        if (val != this.modellidentifikation)
        {
          this.modellidentifikation = val;
          console.log("modellidentifikation: " + val);
          await Preferences.set({
            key: 'modellidentifikation',
            value: val
          });
          this.modellInitialisieren();
        }
      } catch {
        await Preferences.set({
          key: 'modellidentifikation',
          value: this.modellidentifikation
        });
      }
      
    },
    onVideoChange(e) {
      const file = e.target.files[0];
      console.log(String(file.duration));
      this.video = file;
    },
    onComplete() {
      var host = this.modelhost;//'http://' + window.location.hostname;

      var content = {
        Modellidentifikation: this.modellidentifikation,
        AuswahlVerantwortliche: this.AuswahlVerantwortliche,
        Abteilungen: this.AuswahlAbteilungen,
        Grund: this.AuswahlGrund,
        Text: this.freitext,
        Montageplatz: this.montageplatz,
        Baugruppe: this.baugruppe,
        Auftrag: this.auftrag,
      };

      if (this.imageData != null)
      {
        content.Bild = this.imageData;
      }

      /*if (this.video != null)
      {
        content.Video = this.video;
      }*/

      this.loading = true;
      document.getElementById("finishbtn").disabled = true;

      var vm = this;

      axios({
        method: 'post',
        url: host + '/send',
        data: content
      }).then(function (response) {
        if (response.status == 200) {
          alert("Erfolgreich gemeldet!");

          vm.AuswahlAbteilungen = [];
          vm.AuswahlGrund = [];
          vm.AuswahlVerantwortliche = [];

          window.location.reload(true);
        } else {
          alert("Melden fehlgeschlagen!");
        }
      }).catch(error => {
        alert("Melden fehlgeschlagen!" + error);
      }).finally(() => {
        this.loading = false;
        document.getElementById("finishbtn").disabled = false;
      });
    },
    setLoading: function(value) {
      console.log("setLoading");
      
    },
    tabChange: function(tab1, tab2)
    {
      if (tab2 == 1)
      {
        if (this.MoeglicheGruende.length == 1)
        {
          var grund = this.MoeglicheGruende[0];
          var r1 = this.$refs['gdk' + grund];
          r1[0].handleClick();
        }
      }
      if (tab2 == 3)
      {
        if (this.MoeglicheVerantwortliche.length == 1)
        {
          var verant = this.MoeglicheVerantwortliche[0];
          var r2 = this.$refs['ver' + verant];
          r2[0].handleClick();
          //r[0].handleSelectChange(true);
          //r[0].selected = true;
          //this.AuswahlVerantwortliche = [this.MoeglicheVerantwortliche[0]];
        }
      }
      console.log("tabChange");
    },
    handleValidation: function(isValid, tabIndex) {
      console.log('Tab: '+tabIndex+ ' valid: '+isValid);
    },
    handleErrorMessage: function(errorMsg) {
      this.errorMsg = errorMsg;
      console.log("Error: " + this.errorMsg);
    },
    changeAbteilung()
    {
      console.log(Date.now() + ": changeAbteilung");

      this.BetroffeneAbteilungen = "";
      this.AuswahlAbteilungen.forEach(element => {
        this.BetroffeneAbteilungen = this.BetroffeneAbteilungen + ", " + element;
      });
      if (this.BetroffeneAbteilungen != "") this.BetroffeneAbteilungen = this.BetroffeneAbteilungen.substring(2);

      this.AuswahlGrund = [];
      this.clearAuswahlGrund = !this.clearAuswahlGrund;
      this.MoeglicheGruende.splice(0);
      this.AuswahlAbteilungen.forEach(element => {
        this.RepertoireGruende[element].forEach(element2 => {
          this.MoeglicheGruende.splice(0, 0, element2);
        })
      });

      this.changeGrund();
    },
    changeGrund(){
      console.log(Date.now() + ": changeGrund");

      this.GewaehlteGruende = "";
      this.AuswahlGrund.forEach(element => {
        this.GewaehlteGruende = this.GewaehlteGruende + ", " + element;
      });
      if (this.GewaehlteGruende != "") this.GewaehlteGruende = this.GewaehlteGruende.substring(2);

      this.AuswahlVerantwortliche = [];
      this.clearAuswahlVerantwortliche = !this.clearAuswahlVerantwortliche;
      this.MoeglicheVerantwortliche.splice(0);
      this.AuswahlAbteilungen.forEach(element => {
        this.RepertoireVerantwortliche[element].forEach(element2 => {
          this.MoeglicheVerantwortliche.splice(0, 0, element2);
        })
      });

      /*if (this.MoeglicheVerantwortliche.length == 1)
      {
        var verant = this.MoeglicheVerantwortliche[0];
        var r = this.$refs['ver' + verant];
        //r.handleClick();
        //r[0].handleSelectChange(true);
        r[0].selected = true;
        this.$forceUpdate();
        this.AuswahlVerantwortliche = [this.MoeglicheVerantwortliche[0]];
        console.log(this.AuswahlVerantwortliche);
      }*/

      this.changeVerantwortlicher();
    },
    changeVerantwortlicher(){
      console.log(Date.now() + ": changeVerantwortlicher");

      this.GewaehlteVerantwortliche = "";
      this.AuswahlVerantwortliche.forEach(element => {
        this.GewaehlteVerantwortliche = this.GewaehlteVerantwortliche + ", " + element;
      });
      if (this.GewaehlteVerantwortliche != "") this.GewaehlteVerantwortliche = this.GewaehlteVerantwortliche.substring(2);
    },
    validate () {
      return new Promise((resolve, reject) => {
        if (this.AuswahlAbteilungen.length)
        {
          resolve(true);
        } else {
          alert("Mindestens eine Abteilung auswählen!");
          reject(false);
        }
      }).catch((error) => {
        console.log("validate error: " + error);
      });
    },
    validate2 () {
      return new Promise((resolve, reject) => {
        if (this.AuswahlGrund.length)
        {
          resolve(true);
        } else {
          alert("Grund auswählen!");
          reject(false);
        }
      }).catch((error) => {
        console.log("validate error2: " + error);
      });
    },
    validate3 () {
      console.log("validate3");
      return new Promise((resolve, reject) => {
        if (this.AuswahlVerantwortliche.length)
        {
          resolve(true);
        } else {
          alert("Verantwortliche auswählen!");
          reject(false);
        }
      }).catch((error) => {
        console.log("validate error3: " + error);
      });
    },
    validateAnlagen() {
      console.log("validateAnlagen");
      return new Promise((resolve, reject) => {
        if (this.displayScan)
        {
          resolve(true);
        } else {
          reject(false);
        }
      }).catch((error) => {
        console.log("validateAnlagen error: " + error);
      });
    },
    oeffneVerantwortlicher: function(value)
    {
      console.log("oeffneVerantwortlicher");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}

#editorContainer canvas {
  max-width: 100%;
  height: auto;
}

.color-selector {
  height: 40px;
  padding-bottom: 10px; /* add space below the color buttons */
  padding-left: 10px;
  padding-right: 10px;
  margin:auto;
}

.color-selector button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-left: 6px;
  margin-right: 6px;
  transition: all 0.3s ease; /* Smooth size change */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Shadow for unselected buttons */
  display: inline-block;
}

.color-selector .selected {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Shadow for selected buttons */
}

.color-selector .selected.light {
  border: 2px solid #000; /* Black border for light colors */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 0 1px #000; /* Add a black ring around the white border */
}

.color-selector .selected.dark {
  border: 2px solid #fff; /* White border for dark colors */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 0 1px #000; /* Add a black ring around the white border */
}

.color-selector button:last-child {
  margin-right: 0;
}


.btn-group button {
  background-color: white; /* Green background */
  border: 1px solid white; /* Green border */
  color: white; /* White text */
  padding: 0px 0px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
  text-align: center;
  display: inline;
  vertical-align: middle;
  font-size:72px;
  height:100px;
  width:100px;
  padding-bottom: 10px;
  border-radius: 5px;
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Add a background color on hover */
.btn-group button:active:hover {
  background-color: lightblue;
}

/* Selected Images */
.selected {
  border: 2px solid red;
}

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  display: flex;
}
.relative {
  position: relative;
  z-index: 1;
}
.square {
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}
.square:after {
  content: '';
  top: 0;
  display: block;
  padding-bottom: 100%;
}
.square > div {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.surround-cover {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.5);
}
.barcode-scanner--area--container {
  width: 90%;
  max-width: min(700px, 100vh);
  margin: auto;
}
.barcode-scanner--area--outer {
  display: flex;
  border-radius: 1em;
}
.barcode-scanner--area--inner {
  width: 100%;
  margin: 1rem;
  border: 2px solid #fff;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 0.5),
    inset 0px 0px 2px 1px rgb(0 0 0 / 0.5);
  border-radius: 1rem;
}

.modal-gross {
  max-width: 800px;
  display: flex;
  flex-direction: column;
}

.modal-flex {
  max-width: 800px;
  display: flex;
  flex-direction: column;
}

</style>
