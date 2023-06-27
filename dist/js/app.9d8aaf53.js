(function(){"use strict";var e={2828:function(e,t,o){var n=o(9380),i=o(4406),a=o(144),l=function(){var e=this,t=e._self._c;return t("div",[t("form-wizard",{attrs:{title:"SAM-KI-Nachricht",subtitle:"Stand 20.4.22 (Beta v0.1.2)",shape:"tab",color:"#006da0","back-button-text":"Zurück","next-button-text":"Weiter","finish-button-text":"Einreichen"},on:{"on-complete":e.onComplete,"on-loading":e.setLoading,"on-validate":e.handleValidation,"on-change":e.tabChange,"on-error":e.handleErrorMessage}},[t("tab-content",{attrs:{title:"Auswahl der Abteilung",selected:!0,"before-change":e.validate}},[t("div",{staticClass:"form-group"},[t("div",[t("drag-selector",{ref:"dragAbteilungen",staticClass:"drag-selector",on:{change:e.changeAbteilung},model:{value:e.AuswahlAbteilungen,callback:function(t){e.AuswahlAbteilungen=t},expression:"AuswahlAbteilungen"}},e._l(e.RepertoireAbteilungen,(function(o,n){return t("drag-selector-item-c",{key:n,ref:"abt"+o,refInFor:!0,staticClass:"drag-selector__item",attrs:{value:o,clear:e.clearAuswahlAbteilungen}},[e._v(" "+e._s(o)+" ")])})),1)],1),t("ModalComponent",{attrs:{title:"Einstellungen"},on:{"before-close":e.einstellungenSpeichern,"before-open":e.modellSelectedSetzen},model:{value:e.showModalEinst,callback:function(t){e.showModalEinst=t},expression:"showModalEinst"}},[e._v(" Montageplatz: "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.montageplatz,expression:"montageplatz"}],attrs:{type:"text",id:"inputBoxHost",placeholder:e.montageplatz},domProps:{value:e.montageplatz},on:{input:function(t){t.target.composing||(e.montageplatz=t.target.value)}}}),t("br"),e._v(" Host für Modelle: "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.modelhost,expression:"modelhost"}],attrs:{type:"text",id:"inputBoxHost",placeholder:e.modelhost},domProps:{value:e.modelhost},on:{input:function(t){t.target.composing||(e.modelhost=t.target.value)}}}),t("br"),e._v(" Informationsmodell: "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{id:"modellSelect"},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selected=t.target.multiple?o:o[0]}}},e._l(e.Modelle,(function(o){return t("option",{key:o,domProps:{value:o}},[e._v(" "+e._s(o)+" ")])})),0)])],1)]),t("tab-content",{ref:"tabgdk",attrs:{title:"Grund der Kommunikation","before-change":e.validate2}},[t("div",{staticClass:"form-group"},[t("drag-selector",{staticClass:"drag-selector",attrs:{id:"selectorGrund"},on:{change:e.changeGrund},model:{value:e.AuswahlGrund,callback:function(t){e.AuswahlGrund=t},expression:"AuswahlGrund"}},e._l(e.MoeglicheGruende,(function(o,n){return t("drag-selector-item-c",{key:n,ref:"gdk"+o,refInFor:!0,staticClass:"drag-selector__item",attrs:{value:o,clear:e.clearAuswahlGrund}},[e._v(" "+e._s(o)+" ")])})),1)],1)]),t("tab-content",{ref:"tabanlagen",attrs:{title:"Anlagen","before-change":e.validateAnlagen}},[t("div",[t("table",{staticClass:"center"},[t("tr",[e.displayScan?t("div",{staticClass:"btn-group"},[t("div",{staticStyle:{"background-color":"lightblue",width:"150px",height:"100px",float:"left","font-size":"24px","text-align":"center","vertical-align":"middle","padding-top":"35px"}},[e._v("Auftrag")]),t("div",{staticStyle:{"background-color":"white",width:"200px",height:"100px",float:"left","font-size":"24px","text-align":"center","vertical-align":"middle"}},[t("p",[e._v(" "+e._s(e.auftrag)+" ")])]),t("button",{attrs:{id:"auftrag_scan"},on:{click:e.scanAuftrag}},[t("span",[e._v("🔍")])]),t("button",{staticStyle:{color:"black"},attrs:{id:"auftrag_edit"},on:{click:function(t){e.showModalA=!0}}},[t("span",[e._v("✎")])]),t("button",{attrs:{id:"auftrag_rem"},on:{click:function(t){e.auftrag=""}}},[""==e.auftrag?t("span",{staticStyle:{color:"grey"}},[e._v("×")]):e._e(),""!=e.auftrag?t("span",{staticStyle:{color:"red"}},[e._v("×")]):e._e()])]):e._e()]),t("ModalComponent",{attrs:{title:"Auftrag"},on:{"after-open":function(t){return e.textboxfokus("Auftrag")}},model:{value:e.showModalA,callback:function(t){e.showModalA=t},expression:"showModalA"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.auftrag,expression:"auftrag"}],staticClass:"form-control",attrs:{id:"Auftrag",type:"text"},domProps:{value:e.auftrag},on:{input:function(t){t.target.composing||(e.auftrag=t.target.value)}}})]),e.displayScan?e._e():t("div",{staticClass:"container"},[t("div",{staticClass:"barcode-scanner--area--container"},[t("div",{staticClass:"relative",staticStyle:{"justify-content":"center",display:"flex","font-size":"18px"}},[t("p",[e._v("Auf Code ausrichten.")]),t("br")]),t("div",{staticClass:"relative",staticStyle:{"justify-content":"center",display:"flex","font-size":"24px"}},[t("button",{staticStyle:{width:"200px",height:"50px"},attrs:{id:"auftrag_scan_ende"},on:{click:e.scanEnde}},[t("span",{staticStyle:{color:"red","font-size":"24px"}},[e._v("Abbrechen")])])])])]),t("tr",[e.displayScan?t("div",{staticClass:"btn-group"},[t("div",{staticStyle:{"background-color":"lightblue",width:"150px",height:"100px",float:"left","font-size":"24px","text-align":"center","vertical-align":"middle","padding-top":"35px"}},[e._v("Baugruppe")]),t("div",{staticStyle:{"background-color":"white",width:"200px",height:"100px",float:"left","font-size":"24px","text-align":"center","vertical-align":"middle"}},[t("p",[e._v(" "+e._s(e.baugruppe)+" ")])]),t("button",{attrs:{id:"bgruppe_scan"},on:{click:e.scanBaugruppe}},[t("span",[e._v("🔍")])]),t("button",{staticStyle:{color:"black"},attrs:{id:"bgruppe_edit"},on:{click:function(t){e.showModalB=!0}}},[t("span",[e._v("✎")])]),t("button",{attrs:{id:"bgruppe_rem"},on:{click:function(t){e.baugruppe=""}}},[""==e.baugruppe?t("span",{staticStyle:{color:"grey"}},[e._v("×")]):e._e(),""!=e.baugruppe?t("span",{staticStyle:{color:"red"}},[e._v("×")]):e._e()])]):e._e()]),t("ModalComponent",{attrs:{title:"Baugruppe"},on:{"after-open":function(t){return e.textboxfokus("Baugruppe")}},model:{value:e.showModalB,callback:function(t){e.showModalB=t},expression:"showModalB"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.baugruppe,expression:"baugruppe"}],staticClass:"form-control",attrs:{id:"Baugruppe",type:"text"},domProps:{value:e.baugruppe},on:{input:function(t){t.target.composing||(e.baugruppe=t.target.value)}}})]),t("tr",[e.displayScan?t("div",{staticClass:"btn-group"},[t("div",{staticStyle:{"background-color":"lightblue",width:"150px",height:"100px",float:"left","font-size":"24px","text-align":"center","vertical-align":"middle","padding-top":"35px"}},[e._v("Foto")]),t("input",{staticStyle:{display:"none"},attrs:{id:"bild",type:"file",accept:"image/*",capture:"camera",multiple:""},on:{change:e.onImageChange}}),t("button",{staticStyle:{"font-size":"24px",width:"200px"},attrs:{id:"bild_vorschau"},on:{click:function(t){e.showModalBVorschau=!0}}},[e.imageData?e._e():t("span",{staticStyle:{color:"lightgrey"}},[e._v("Vorschau")]),e.imageData?t("img",{staticStyle:{"max-width":"100%","max-height":"100%"},attrs:{src:e.imageData[0]}}):e._e()]),t("button",{staticStyle:{color:"green"},attrs:{id:"bild_add",onclick:"document.getElementById('bild').click();"}},[t("span",[e._v("📷")])]),t("button",{staticStyle:{color:"grey"},attrs:{id:"bild_edit",disabled:1!==e.selectedImages.length},on:{click:function(t){return e.openEditor(e.selectedImages[0])}}},[t("span",[e._v("✎")])]),t("button",{staticStyle:{color:"grey"},attrs:{id:"bild_rem",disabled:0===e.selectedImages.length},on:{click:e.removeImages}},[t("span",[e._v("×")])])]):e._e()]),t("ModalComponent",{attrs:{title:"Foto","modal-class":"modal-gross"},model:{value:e.showModalBVorschau,callback:function(t){e.showModalBVorschau=t},expression:"showModalBVorschau"}},[t("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},e._l(e.imageData,(function(o,n){return t("div",{key:n,staticStyle:{width:"33.33%"}},[t("img",{class:{selected:e.selectedImages.includes(n)},staticStyle:{"max-width":"100%","max-height":"100%"},attrs:{src:o},on:{click:function(t){return e.selectImage(n)}}})])})),0)]),t("ModalComponent",{attrs:{title:"Freies Markieren","modal-class":"modal-gross"},on:{"after-open":e.initializeCanvas},model:{value:e.showModalBEditor,callback:function(t){e.showModalBEditor=t},expression:"showModalBEditor"}},[t("div",{ref:"editorContainer"},[t("button",{staticStyle:{"border-radius":"5px","background-color":"#006da0",border:"none",color:"white",padding:"8px 16px","text-align":"center","text-decoration":"none",display:"inline-block","font-size":"14px","margin-bottom":"20px"},on:{click:e.cancelEditing}},[e._v("Unmarkiert übernehmen")]),t("button",{staticStyle:{"border-radius":"5px","background-color":"#006da0",border:"none",color:"white",padding:"8px 16px","text-align":"center","text-decoration":"none",display:"inline-block","font-size":"14px","margin-bottom":"20px",float:"right"},on:{click:e.saveEdits}},[e._v("Markiert übernehmen")]),t("br"),t("div",{staticClass:"color-selector",staticStyle:{display:"flex","justify-content":"center","align-items":"center"}},[t("span",{staticStyle:{"margin-right":"5px"}},[e._v("Farbwahl:")]),e._l(e.colors,(function(o){return t("button",{key:o,class:{selected:o===e.selectedColor,dark:e.darkColors.includes(o)&&o===e.selectedColor,light:e.lightColors.includes(o)&&o===e.selectedColor},style:{backgroundColor:o},on:{click:function(t){e.selectedColor=o}}})}))],2),t("canvas",{ref:"canvas",staticStyle:{float:"left",border:"none","max-width":"100%","max-height":"100%"},on:{mousedown:e.startDrawing,mousemove:e.draw,mouseup:e.stopDrawing,mouseleave:e.stopDrawing,touchstart:function(t){return t.preventDefault(),e.startDrawing.apply(null,arguments)},touchmove:function(t){return t.preventDefault(),e.draw.apply(null,arguments)},touchend:function(t){return t.preventDefault(),e.stopDrawing.apply(null,arguments)},touchcancel:function(t){return t.preventDefault(),e.stopDrawing.apply(null,arguments)}}})]),t("Carousel",e._b({attrs:{breakpoints:e.breakpoints},scopedSlots:e._u([{key:"addons",fn:function(){return[t("Navigation")]},proxy:!0}])},"Carousel",e.settings,!1),e._l(e.imageData,(function(o,n){return t("Slide",{key:n},[t("div",{staticClass:"carousel__item"},[t("img",{attrs:{src:o},on:{click:function(t){return e.selectImage(n)}}})])])})),1)],1),t("tr",[e.displayScan?t("div",{staticClass:"btn-group"},[t("div",{staticStyle:{"background-color":"lightblue",width:"150px",height:"100px",float:"left","font-size":"24px","text-align":"center","vertical-align":"middle","padding-top":"35px"}},[e._v("Freitext")]),t("button",{staticStyle:{"font-size":"24px",width:"200px"},attrs:{id:"freitext_vorschau"},on:{click:function(t){e.showModalF=!0}}},[e.freitext?t("span",{staticStyle:{color:"black","font-size":"8px","white-space":"pre-wrap","line-height":"1"}},[e._v(e._s(e.freitext))]):e._e(),e.freitext?e._e():t("span",{staticStyle:{color:"lightgrey"}},[e._v("Vorschau")])]),t("button",{attrs:{id:"text_leer",disabled:""}}),t("button",{staticStyle:{color:"black"},attrs:{id:"text_add"},on:{click:function(t){e.showModalF=!0}}},[t("span",[e._v("✎")])]),t("button",{attrs:{id:"text_rem"},on:{click:function(t){e.freitext=""}}},[""==e.freitext?t("span",{staticStyle:{color:"grey"}},[e._v("×")]):e._e(),""!=e.freitext?t("span",{staticStyle:{color:"red"}},[e._v("×")]):e._e()])]):e._e()]),t("ModalComponent",{attrs:{title:"Freitext"},on:{"after-open":function(t){return e.textboxfokus("freitextbox")}},model:{value:e.showModalF,callback:function(t){e.showModalF=t},expression:"showModalF"}},[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.freitext,expression:"freitext"}],staticClass:"form-control",staticStyle:{height:"80px",width:"400px"},attrs:{placeholder:"Freitext",id:"freitextbox"},domProps:{value:e.freitext},on:{input:function(t){t.target.composing||(e.freitext=t.target.value)}}})])],1)])]),t("tab-content",{attrs:{title:"Auswahl Verantwortlicher","before-change":e.validate3}},[t("div",{staticClass:"form-group"},[t("div",[t("drag-selector",{staticClass:"drag-selector",on:{change:e.changeVerantwortlicher},model:{value:e.AuswahlVerantwortliche,callback:function(t){e.AuswahlVerantwortliche=t},expression:"AuswahlVerantwortliche"}},e._l(e.MoeglicheVerantwortliche,(function(o,n){return t("drag-selector-item-c",{key:n,ref:"ver"+o,refInFor:!0,staticClass:"drag-selector__item",attrs:{value:o,clear:e.clearAuswahlVerantwortliche}},[e._v(" "+e._s(o)+" ")])})),1)],1)])]),t("tab-content",{attrs:{title:"Zusammenfassung"}},[t("div",{staticClass:"form-group"},[t("table",[t("tr",[t("td",[e._v("Betroffene Abteilungen:")]),t("td",[e._v(e._s(e.BetroffeneAbteilungen))])]),t("tr",[t("td",[e._v("Gewählte Gründe:")]),t("td",[e._v(e._s(e.GewaehlteGruende))])]),t("tr",[t("td",[e._v("Gewählte Verantwortliche:")]),t("td",[e._v(e._s(e.GewaehlteVerantwortliche))])]),t("tr",[t("td",[e._v("Montageplatz:")]),t("td",[e._v(e._s(e.montageplatz))])]),t("tr",[t("td",[e._v("Baugruppe:")]),t("td",[e._v(e._s(e.baugruppe))])]),t("tr",[t("td",[e._v("Auftrag:")]),t("td",[e._v(e._s(e.auftrag))])])]),e.freitext?t("div",[t("p",[e._v("Freitext: "+e._s(e.freitext))])]):e._e(),e.imageData?t("div",[t("img",{staticStyle:{"max-width":"30%"},attrs:{src:e.imageData}})]):e._e()])]),t("button",{staticClass:"wizard-btn",staticStyle:{"background-color":"rgb(35, 204, 239)","border-color":"rgb(35, 204, 239)",color:"white","box-shadow":"0px 8px 15px rgba(0, 0, 0, 0.3)"},attrs:{slot:"finish",id:"finishbtn"},slot:"finish"},[e._v(" Melden "),t("pulse-loader",{attrs:{loading:e.loading,color:e.spinner.color,size:e.spinner.size}})],1)],1),e.displayScan?t("div",{staticStyle:{"text-align":"center"}},[t("button",{staticClass:"button",staticStyle:{"background-color":"transparent"},attrs:{type:"button"},on:{click:function(t){e.showModalEinst=!0}}},[t("img",{staticStyle:{height:"50px",width:"50px","border-radius":"50%","box-shadow":"0px 8px 15px rgba(0, 0, 0, 0.3)"},attrs:{src:o(9411)}})]),t("button",{staticClass:"button",staticStyle:{"background-color":"transparent"},attrs:{type:"button"},on:{click:function(t){e.showModalLizenz=!0}}},[t("img",{staticStyle:{height:"50px",width:"50px","border-radius":"50%","box-shadow":"0px 8px 15px rgba(0, 0, 0, 0.3)"},attrs:{src:o(3881)}})]),t("button",{staticClass:"button",staticStyle:{"background-color":"transparent"},attrs:{type:"button"},on:{click:function(t){e.showModalProblem=!0}}},[t("img",{staticStyle:{height:"50px",width:"50px","border-radius":"50%","box-shadow":"0px 8px 15px rgba(0, 0, 0, 0.3)"},attrs:{src:o(2326)}})])]):e._e(),t("ModalComponent",{attrs:{title:"Informationen und Lizenzen"},model:{value:e.showModalLizenz,callback:function(t){e.showModalLizenz=t},expression:"showModalLizenz"}},[e._v(" Implementierung im Förderprojekt SAM-KI"),t("br"),e._v(" (c) 2023 Fraunhofer Institut für Produktionstechnik"),t("br"),e._v("und Automatisierung (FhG IPA)"),t("br"),t("textarea",{staticClass:"textbox",attrs:{name:"note"}},[e._v(' Vue.js VueDragSelector VueModal SendIntent Capacitor VueFormWizard https://github.com/BinarCode/vue-form-wizard MIT License Copyright (c) 2017 Cristi Jora Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. ')])]),t("ModalComponent",{attrs:{title:"Problem oder Feedback melden","modal-class":"modal-problem"},on:{click:function(t){return t.target!==t.currentTarget?null:e.cancelProblemReport.apply(null,arguments)}},model:{value:e.showModalProblem,callback:function(t){e.showModalProblem=t},expression:"showModalProblem"}},[t("div",[t("label",{staticStyle:{display:"block","margin-bottom":"10px"},attrs:{for:"problemDescription"}},[e._v("Beschreibung:")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.problemDescription,expression:"problemDescription"}],staticStyle:{display:"block",resize:"none",width:"98%",height:"200px","margin-bottom":"20px"},attrs:{id:"problemDescription"},domProps:{value:e.problemDescription},on:{input:function(t){t.target.composing||(e.problemDescription=t.target.value)}}})]),t("button",{staticClass:"button",on:{click:function(t){return t.stopPropagation(),e.cancelProblemReport.apply(null,arguments)}}},[e._v("Abbrechen")]),t("button",{staticClass:"button",staticStyle:{float:"right"},on:{click:function(t){return t.stopPropagation(),e.reportProblem.apply(null,arguments)}}},[e._v("Problem melden")])])],1)},r=[],s=o(9669),c=o.n(s),d=o(3845),h=o(4571),u=o(6693),g=o(7409),p={name:"App",components:{PulseLoader:d.Z,Carousel:g.Carousel,Slide:g.Slide},mixins:[],data(){return{imageBase64:"",uri:"",loading:!1,imageData:[],selectedImages:[],video:null,montageplatz:"",baugruppe:"",auftrag:"",name:"",freitext:"",selected:[],showModal:!1,showModalV:!1,showModalF:!1,showModalB:!1,showModalBScan:!1,showModalA:!1,showModalAScan:!1,showModalEinst:!1,showModalVVorschau:!1,showModalBVorschau:!1,showModalBEditor:!1,showModalProblem:!1,problemDescription:"",displayScan:!0,AuswahlAbteilungen:[],BetroffeneAbteilungen:"",AuswahlGrund:[],GewaehlteGruende:"",AuswahlVerantwortliche:[],GewaehlteVerantwortliche:"",RepertoireAbteilungen:["Elektronik"],RepertoireGruende:{Elektronik:["Fehler Ladeelektronik","Fehler Modbus"]},RepertoireVerantwortliche:{Elektronik:["Test Person"]},MoeglicheGruende:[],MoeglicheVerantwortliche:[],clearAuswahlAbteilungen:!1,clearAuswahlGrund:!1,clearAuswahlVerantwortliche:!1,spinner:{color:"white",size:"30px",margin:"2px",radius:"100%"},modelhost:"",tmp_modelhost:"",modellidentifikation:"",tmp_modellidentifikation:"",showModalLizenz:!1,Modell:{},Modelle:[],pref:{},useDefaultUI:!0,bildpfad:"",queryInput:{montageplatz:"",baugruppe:"",auftrag:"",freitext:"",AuswahlAbteilungen:[],AuswahlGrund:[],AuswahlVerantwortliche:[],photo:"",video:"",report:""},isRecording:!1,isFinished:!1,recorder:null,videoUrl:null,stream:null,canvas:null,ctx:null,img:new Image,isDrawing:!1,editMode:!1,colors:["red","yellow","green","blue","white","black"],lightColors:["red","yellow","white"],darkColors:["green","blue","black"],selectedColor:"red",settings:{itemsToShow:1,snapAlign:"center"},breakpoints:{700:{itemsToShow:3.5,snapAlign:"center"},1024:{itemsToShow:5,snapAlign:"start"}}}},async beforeMount(){console.log("Funktion beforeMount"),this.initialisieren(),this.queriesAbfragen()},watch:{showModalBEditor(e){e?this.$refs.canvas?this.initializeCanvas():this.$nextTick((()=>{this.initializeCanvas()})):this.stopDrawing()}},mounted(){console.log("Funktion mounted")},methods:{openVideo(){console.log("Funktion openVideo"),this.$refs.videoRec.setAttribute("autoplay",""),this.$refs.videoRec.setAttribute("muted",""),this.$refs.videoRec.setAttribute("playsinline",""),null!=this.videoUrl?this.initPlayer():this.resetVideo()},initPlayer(){console.log("Funktion initPlayer"),this.$refs.videoRec.controls=!0,this.$refs.videoRec.src=this.videoUrl,this.$refs.videoRec.srcObject=null},resetVideo(){console.log("Funktion resetVideo"),this.isFinished=!1,this.isRecording=!1,this.isLoading=!0,this.videoUrl=null,navigator.mediaDevices.getUserMedia({video:{width:{ideal:1280},height:{ideal:720}},audio:!1}).then(this.gotStream).catch((()=>this.isValid=!1))},record(){console.log("Funktion record"),this.recorder.start(),console.log("Funktion start"),this.isRecording=!0,console.log("Funktion isRecording"),this.$refs.videoRec.controls=!1,console.log("Funktion controls"),setTimeout(this.stop,6e3),console.log("Funktion setTimeout")},stop(){console.log("Funktion stop"),this.recorder.stop(),this.isRecording=!1,this.isFinished=!0},endVideo(){console.log("Funktion endVideo"),this.stream.getTracks().forEach((function(e){e.stop()}))},gotStream(e){console.log("Funktion gotStream"),this.recorder=new MediaRecorder(e,{mimeType:"video/mp4"}),this.recorder.prepare(),null==e&&console.log("mediastream ist null"),null==this.recorder&&console.log("recorder ist null"),this.recorder.ondataavailable=this.videoDataHandler,this.$refs.videoRec.src=null,this.$refs.videoRec.srcObject=e,this.stream=e},videoDataHandler(e){this.$refs.videoRec.src=null,this.videoUrl=window.URL.createObjectURL(e.data),this.$refs.videoRec.src=this.videoUrl,this.$refs.videoRec.srcObject=null,this.initPlayer()},queriesAbfragen(){},textboxfokus(e){console.log("textboxfokus "+e),document.getElementById(e).focus()},async afterOpenScan(){console.log("Funktion afterOpenScan");const e=await u.mR.startScan();u.mR.showBackground(),e.hasContent&&(this.auftrag=e.content)},async scanAuftrag(){console.log("Funktion scanAuftrag"),this.displayScan=!1;var e=document.getElementsByTagName("body")[0];e.style.backgroundImage="none";const t=await u.mR.startScan();this.displayScan=!0,e.style.backgroundImage="url(Logo_kombiniert.png)",t.hasContent&&(this.auftrag=t.content)},async scanBaugruppe(){console.log("Funktion scanBaugruppe"),this.displayScan=!1;var e=document.getElementsByTagName("body")[0];e.style.backgroundImage="none";const t=await u.mR.startScan();this.displayScan=!0,e.style.backgroundImage="url(Logo_kombiniert.png)",t.hasContent&&(this.baugruppe=t.content)},async scanEnde(){console.log("Funktion scanEnde"),await u.mR.stopScan();var e=document.getElementsByTagName("body")[0];e.style.backgroundImage="url(Logo_kombiniert.png)",this.displayScan=!0},dataURLtoFile:function(e,t){console.log("Funktion dataURLtoFile");var o=e.split(","),n=o[0].match(/:(.*?);/)[1],i=atob(o[1]),a=i.length,l=new Uint8Array(a);while(a--)l[a]=i.charCodeAt(a);return new File([l],t,{type:n})},removeImage(){console.log("Funktion removeImage");var e=document.getElementById("bild");e.value="";var t={target:{}};t.target.files=null,this.onImageChange(t)},removeImages(){this.selectedImages.sort(((e,t)=>t-e)),this.selectedImages.forEach((e=>{this.imageData.splice(e,1)})),this.selectedImages=[]},removeVideo(){console.log("Funktion removeVideo"),this.video=null},onImageChange(e){console.log("Funktion onImageChange");var t=document.getElementById("bild_add"),o=document.getElementById("bild_edit"),n=document.getElementById("bild_rem");const i=e.target.files;if(this.imageData=[],i){t.style.color="grey",o.style.color="black",n.style.color="red";for(let e=0;e<i.length;e++){const t=i[e],o=new FileReader;o.readAsDataURL(t),o.onload=()=>{this.imageData.push(o.result)},this.bildpfad=t}}else t.style.color="green",o.style.color="grey",n.style.color="grey"},selectImage(e){const t=this.selectedImages.indexOf(e);-1===t?this.selectedImages.push(e):this.selectedImages.splice(t,1)},openEditor(e){this.showModalBEditor&&this.saveEdits(),this.img.src=this.imageData[e],this.showModalBEditor=!0},initializeCanvas(){if(!this.imageData)return;this.canvas=this.$refs.canvas,this.ctx=this.canvas.getContext("2d");let e=new Image;e.onload=()=>{this.canvas.width=e.width,this.canvas.height=e.height,this.ctx.drawImage(e,0,0,this.canvas.width,this.canvas.height),this.editMode=!0},e.src=this.imageData},getEventCoords(e){const t=e.type.startsWith("touch")?e.touches[0]:e,o=this.canvas.getBoundingClientRect(),n=this.canvas.width/o.width,i=this.canvas.height/o.height;return{x:(t.clientX-o.left)*n,y:(t.clientY-o.top)*i}},startDrawing(e){if(!this.editMode)return;this.isDrawing=!0,this.ctx.strokeStyle=this.selectedColor,this.ctx.beginPath();const t=this.getEventCoords(e);this.ctx.moveTo(t.x,t.y)},draw(e){if(!this.isDrawing)return;const t=this.getEventCoords(e);this.ctx.lineWidth=8,this.ctx.lineTo(t.x,t.y),this.ctx.stroke()},stopDrawing(){this.isDrawing=!1},saveEdits(){this.imageData=this.canvas.toDataURL("image/jpeg",.7),this.$nextTick((()=>{this.showModalBEditor=!1})),this.editMode=!1},drawImageOnCanvas(){const e=this.$refs.imageInModal;this.ctx.drawImage(e,0,0,this.canvas.width,this.canvas.height)},saveImage(){const e=document.createElement("a");e.href=this.canvas.toDataURL("image/jpeg",.7),e.download="edited-image.jpeg",e.click()},cancelEditing(){this.showModalBEditor=!1,this.editMode=!1},reportProblem(){var e="http://127.0.0.1:4000";let t={description:this.problemDescription};c()({method:"post",url:e+"/feedback",data:t}).then((e=>{200==e.status?(alert("Erfolgreich gemeldet!"),this.showModalProblem=!1,this.problemDescription=""):alert("Melden fehlgeschlagen!")})).catch((e=>{alert("Melden fehlgeschlagen! "+e)}))},cancelProblemReport(){this.showModalProblem=!1,this.problemDescription=""},hostGeaendert(){console.log("Funktion hostGeaendert"),this.AuswahlAbteilungen=[],this.AuswahlGrund=[],this.AuswahlVerantwortliche=[],this.clearAuswahlAbteilungen=!this.clearAuswahlAbteilungen,this.changeAbteilung();var e=this;c().get(this.modelhost+"/Modelle").then((function(t){console.log("axios.get Modelle"),e.Modelle=t.data,console.log(e.Modelle)})).catch((function(e){console.log("axios.get Fehler: "+e.message)})).finally((function(){}))},async einstellungHolen(e,t){console.log("Funktion einstellungHolen"),console.log("Einstellung holen: "+e);const o=await h.u.keys();if(console.log("existierende Einstellungen: "+o.toString()),o.keys.includes(e)){const t=(await h.u.get({key:e})).value;return console.log("Einstellung vorhanden, Wert: "+t),t}return console.log("Einstellung nicht vorhanden, Standardwert: "+t),t},async einstellungenPruefen(e,t){console.log("Funktion einstellungenPruefen");const o=await h.u.keys();o.keys.includes(e)||await h.u.set({key:e,value:t})},async initialisieren(){console.log("Funktion initialisieren");u.mR.checkPermission({force:!0});await this.einstellungenPruefen("host","http://"+window.location.hostname+":4000"),await this.einstellungenPruefen("modellidentifikation","Beispielmodell.json"),await this.einstellungenPruefen("montageplatz","Beispielplatz"),this.modelhost=await this.einstellungHolen("host","http://"+window.location.hostname+":4000"),this.modellidentifikation=await this.einstellungHolen("modellidentifikation","Beispielmodell.json"),this.montageplatz=await this.einstellungHolen("montageplatz","Beispielplatz"),this.hostGeaendert(),this.modellInitialisieren()},anderesmodell(){console.log("funktion anderesmodell"),this.modellInitialisieren()},modellInitialisieren(){console.log("funktion modellInitialisieren");var e=this;""==this.modellidentifikation?console.log("modellidentifikation leer"):c().get(this.modelhost+"/Modelle/"+this.modellidentifikation).then((function(t){console.log(t.data),e.Modell=t.data,e.RepertoireAbteilungen=t.data.RepertoireAbteilungen,e.RepertoireGruende=t.data.RepertoireGruende,e.RepertoireVerantwortliche=t.data.RepertoireVerantwortliche,e.Ziele=e.Modell.VerantwortlicheAdressen}))},modellSelectedSetzen(){for(var e=document.getElementById("modellSelect"),t=0;t<e.options.length;t++)if(e.options[t].value==this.modellidentifikation){e.options.selectedIndex=t;break}},modelleInitialisieren(){var e=this;c().get(this.modelhost+"/Modelle/"+this.modellidentifikation).then((function(t){console.log(t.data),e.Modell=t.data,e.RepertoireAbteilungen=t.data.RepertoireAbteilungen,e.RepertoireGruende=t.data.RepertoireGruende,e.RepertoireVerantwortliche=t.data.RepertoireVerantwortliche,e.Ziele=e.Modell.VerantwortlicheAdressen,a.ZP.nextTick((()=>{const t=new URLSearchParams(window.location.search);var o=[];for(var n in e.$refs)n.length>3&&o.push(n.substring(3));if(t.has("abt")){const n=t.get("abt"),i=n.split(";");i.forEach((t=>{Array.prototype.includes.call(o,t)&&(e.$refs["abt"+t][0].handleClick(),e.AuswahlAbteilungen.push(t))}))}if(t.has("gdk")){const n=t.get("gdk"),i=n.split(";");i.forEach((t=>{Array.prototype.includes.call(o,t)&&(e.$refs["gdk"+t][0].handleClick(),e.AuswahlGrund.push(t))}))}if(t.has("ver")){const n=t.get("ver"),i=n.split(";");i.forEach((t=>{Array.prototype.includes.call(o,t)&&(e.$refs["ver"+t][0].handleClick(),e.AuswahlVerantwortliche.push(t))}))}}))})).finally((function(){}))},async einstellungenSpeichern(e){console.log("einstellungenSpeichern: "),console.log("montageplatz: "+this.montageplatz),this.modelhost!=this.tmp_modelhost?(console.log("Speichere modelhost: "+this.modelhost),await h.u.set({key:"host",value:this.modelhost}),this.hostGeaendert()):console.log("modelhost unverändert"),await h.u.set({key:"montageplatz",value:this.montageplatz});var t=document.getElementById("modellSelect");try{var o=t.options[t.options.selectedIndex].value;o!=this.modellidentifikation&&(this.modellidentifikation=o,console.log("modellidentifikation: "+o),await h.u.set({key:"modellidentifikation",value:o}),this.modellInitialisieren())}catch{await h.u.set({key:"modellidentifikation",value:this.modellidentifikation})}},onVideoChange(e){const t=e.target.files[0];console.log(String(t.duration)),this.video=t},onComplete(){var e=this.modelhost,t={Modellidentifikation:this.modellidentifikation,AuswahlVerantwortliche:this.AuswahlVerantwortliche,Abteilungen:this.AuswahlAbteilungen,Grund:this.AuswahlGrund,Text:this.freitext,Montageplatz:this.montageplatz,Baugruppe:this.baugruppe,Auftrag:this.auftrag};null!=this.imageData&&(t.Bild=this.imageData),this.loading=!0,document.getElementById("finishbtn").disabled=!0;var o=this;c()({method:"post",url:e+"/send",data:t}).then((function(e){200==e.status?(alert("Erfolgreich gemeldet!"),o.AuswahlAbteilungen=[],o.AuswahlGrund=[],o.AuswahlVerantwortliche=[],window.location.reload(!0)):alert("Melden fehlgeschlagen!")})).catch((e=>{alert("Melden fehlgeschlagen!"+e)})).finally((()=>{this.loading=!1,document.getElementById("finishbtn").disabled=!1}))},setLoading:function(e){console.log("setLoading")},tabChange:function(e,t){if(1==t&&1==this.MoeglicheGruende.length){var o=this.MoeglicheGruende[0],n=this.$refs["gdk"+o];n[0].handleClick()}if(3==t&&1==this.MoeglicheVerantwortliche.length){var i=this.MoeglicheVerantwortliche[0],a=this.$refs["ver"+i];a[0].handleClick()}console.log("tabChange")},handleValidation:function(e,t){console.log("Tab: "+t+" valid: "+e)},handleErrorMessage:function(e){this.errorMsg=e,console.log("Error: "+this.errorMsg)},changeAbteilung(){console.log(Date.now()+": changeAbteilung"),this.BetroffeneAbteilungen="",this.AuswahlAbteilungen.forEach((e=>{this.BetroffeneAbteilungen=this.BetroffeneAbteilungen+", "+e})),""!=this.BetroffeneAbteilungen&&(this.BetroffeneAbteilungen=this.BetroffeneAbteilungen.substring(2)),this.AuswahlGrund=[],this.clearAuswahlGrund=!this.clearAuswahlGrund,this.MoeglicheGruende.splice(0),this.AuswahlAbteilungen.forEach((e=>{this.RepertoireGruende[e].forEach((e=>{this.MoeglicheGruende.splice(0,0,e)}))})),this.changeGrund()},changeGrund(){console.log(Date.now()+": changeGrund"),this.GewaehlteGruende="",this.AuswahlGrund.forEach((e=>{this.GewaehlteGruende=this.GewaehlteGruende+", "+e})),""!=this.GewaehlteGruende&&(this.GewaehlteGruende=this.GewaehlteGruende.substring(2)),this.AuswahlVerantwortliche=[],this.clearAuswahlVerantwortliche=!this.clearAuswahlVerantwortliche,this.MoeglicheVerantwortliche.splice(0),this.AuswahlAbteilungen.forEach((e=>{this.RepertoireVerantwortliche[e].forEach((e=>{this.MoeglicheVerantwortliche.splice(0,0,e)}))})),this.changeVerantwortlicher()},changeVerantwortlicher(){console.log(Date.now()+": changeVerantwortlicher"),this.GewaehlteVerantwortliche="",this.AuswahlVerantwortliche.forEach((e=>{this.GewaehlteVerantwortliche=this.GewaehlteVerantwortliche+", "+e})),""!=this.GewaehlteVerantwortliche&&(this.GewaehlteVerantwortliche=this.GewaehlteVerantwortliche.substring(2))},validate(){return new Promise(((e,t)=>{this.AuswahlAbteilungen.length?e(!0):(alert("Mindestens eine Abteilung auswählen!"),t(!1))})).catch((e=>{console.log("validate error: "+e)}))},validate2(){return new Promise(((e,t)=>{this.AuswahlGrund.length?e(!0):(alert("Grund auswählen!"),t(!1))})).catch((e=>{console.log("validate error2: "+e)}))},validate3(){return console.log("validate3"),new Promise(((e,t)=>{this.AuswahlVerantwortliche.length?e(!0):(alert("Verantwortliche auswählen!"),t(!1))})).catch((e=>{console.log("validate error3: "+e)}))},validateAnlagen(){return console.log("validateAnlagen"),new Promise(((e,t)=>{this.displayScan?e(!0):t(!1)})).catch((e=>{console.log("validateAnlagen error: "+e)}))},oeffneVerantwortlicher:function(e){console.log("oeffneVerantwortlicher")}}},m=p,f=o(1001),b=(0,f.Z)(m,l,r,!1,null,null,null),v=b.exports,w=o(155),y=o.n(w),x=o(5498),k=o.n(x),A=o(5701);n.C.checkSendIntentReceived().then((e=>{if(e&&(console.log("SendIntent received"),console.log(JSON.stringify(e))),e.url){let t=decodeURIComponent(e.url);i.fy.readFile({path:t}).then((e=>{console.log(e.data)})).catch((e=>console.error(e)))}})).catch((e=>console.error(e))),window.addEventListener("sendIntentReceived",(()=>{n.C.checkSendIntentReceived().then((e=>{}))})),a.ZP.use(y()),a.ZP.use(k());const _=a.ZP.options.components["drag-selector-item"],S=_.extend({data(){return{sl:""}},props:{value:{default:!0},clear:{default:!1}},methods:{handleClick:function(){this.handleSelectChange(!this.selected)},handleSelectChange(e){this.selected!=e&&(this.selected=e,this.dispatch("drag-selector","drag-selector-item-change",{selected:this.selected,value:this.value}))},clearMethod(){this.selected=!1,this.dispatch("drag-selector","drag-selector-item-change",{selected:this.selected,value:this.value})}},watch:{clear(e,t){console.log("clearm"),e==!t&&(console.log("clearm2"),this.handleSelectChange(!1))}}});a.ZP.component("drag-selector-item-c",S);const M=a.ZP.options.components["drag-selector"],C=M.extend({props:{clear:{default:!1}},methods:{registerEvents(){this.$on("on-drag-selector-item-add",(e=>{e&&this.childItems.push(e)})),this.$on("on-drag-selector-item-remove",(e=>{const t=this.childItems.indexOf(e);t>=0&&this.childItems.splice(t,1)})),this.$on("drag-selector-item-change",(({selected:e,value:t})=>{console.log("change"),this.childItems.forEach((e=>{e._data.clear=!0}));const o=this.value.indexOf(t);e?this.value.push(t):-1!==o&&this.value.splice(o,1),this.emitChangeThrottled(),console.log("selected: "+this.value)}))},mClear(){console.log(Date.now()+": drag selector mclear"),this.childItems.forEach((e=>{e._data.clear=!0}))}},watch:{clear(e,t){console.log(Date.now()+": clear drag selector"),e&&!t&&(this.mClear(),this.clear=!1)}}});a.ZP.component("drag-selector-s",C),a.ZP.component("ModalComponent",A.Z),a.ZP.config.productionTip=!1,new a.ZP({render:e=>e(v)}).$mount("#app")},9411:function(e,t,o){e.exports=o.p+"img/feld_einstellungen3.2c951b1d.png"},2326:function(e,t,o){e.exports=o.p+"img/feld_idee.4f951245.png"},3881:function(e,t,o){e.exports=o.p+"img/feld_info.d001ea45.png"}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,i,a){if(!n){var l=1/0;for(d=0;d<e.length;d++){n=e[d][0],i=e[d][1],a=e[d][2];for(var r=!0,s=0;s<n.length;s++)(!1&a||l>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[s])}))?n.splice(s--,1):(r=!1,a<l&&(l=a));if(r){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,i,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,n){return o.f[n](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/"+e+"."+{176:"bff72b19",202:"72fc0d05",353:"743f579b",541:"0dbf0455"}[e]+".js"}}(),function(){o.miniCssF=function(e){}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="samki-nachricht:";o.l=function(n,i,a,l){if(e[n])e[n].push(i);else{var r,s;if(void 0!==a)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var h=c[d];if(h.getAttribute("src")==n||h.getAttribute("data-webpack")==t+a){r=h;break}}r||(s=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,o.nc&&r.setAttribute("nonce",o.nc),r.setAttribute("data-webpack",t+a),r.src=n),e[n]=[i];var u=function(t,o){r.onerror=r.onload=null,clearTimeout(g);var i=e[n];if(delete e[n],r.parentNode&&r.parentNode.removeChild(r),i&&i.forEach((function(e){return e(o)})),t)return t(o)},g=setTimeout(u.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=u.bind(null,r.onerror),r.onload=u.bind(null,r.onload),s&&document.head.appendChild(r)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p=""}(),function(){var e={143:0};o.f.j=function(t,n){var i=o.o(e,t)?e[t]:void 0;if(0!==i)if(i)n.push(i[2]);else{var a=new Promise((function(o,n){i=e[t]=[o,n]}));n.push(i[2]=a);var l=o.p+o.u(t),r=new Error,s=function(n){if(o.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var a=n&&("load"===n.type?"missing":n.type),l=n&&n.target&&n.target.src;r.message="Loading chunk "+t+" failed.\n("+a+": "+l+")",r.name="ChunkLoadError",r.type=a,r.request=l,i[1](r)}};o.l(l,s,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,a,l=n[0],r=n[1],s=n[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(i in r)o.o(r,i)&&(o.m[i]=r[i]);if(s)var d=s(o)}for(t&&t(n);c<l.length;c++)a=l[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},n=self["webpackChunksamki_nachricht"]=self["webpackChunksamki_nachricht"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(2828)}));n=o.O(n)})();
//# sourceMappingURL=app.9d8aaf53.js.map