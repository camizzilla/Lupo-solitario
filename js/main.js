const artiRamas = [
  "Mimetismo",
  "Caccia",
  "Sesto senso",
  "Orientamento",
  "Guarigione",
  "Scherma",
  "Psicoschermo",
  "Psicolaser",
  "Affinità animale",
  "Telecinesi"
];

const armiList = [
  "Pugnale",
  "Lancia",
  "Mazza",
  "Daga",
  "Martello",
  "Spada",
  "Ascia",
  "Spada",
  "Asta",
  "Spadone"
];

class Game  {
  constructor(artiRamas, armiList){
    this.livello = true;
    this.livelloFacile = 3;
    this.validator = [];
    
    this.playerRes = {
      livello: this.livello,
      combattivita: '',
      resistenza: '',
      artiRamas: [],
      oggettoTrovato: '',
      arma: ''
    };
    this.artiRamas = artiRamas;
    this.armi = armiList;
    this.oggettiTrovati = [
      "Spada",
      "Elmo",
      "Pasti",
      "Cotta di maglia",
      "Mazza",
      "Pozione magica",
      "Asta",
      "Lancia",
      "Corone d'oro",
      "Spadone"
    ];
  }
  
  formComponent(){
    let facile = document.getElementById('facile');
    let difficile = document.getElementById('difficile');
    let reset = true;
    this.level(facile, difficile);
    this.addArtiRamas();
    this.caratteristiche();
    this.findObj();
  }
  
  // console.log('this.playerRes::: ',this.playerRes);
  submitPlay(){
    if( (this.playerRes.combattivita === '') ||
      (this.playerRes.resistenza === '') ||
      (this.playerRes.artiRamas.length < 5) ||
      (this.playerRes.oggettoTrovato === '')
    ){
      if(this.validator){
        this.resetAll(this.validator);
      }
      
      if(this.playerRes.combattivita === '') {
        this.validation("combattivita", "Il bottone, pirla!");
        this.validator.push('combattivita');
      }
      
      if(this.playerRes.resistenza === '') {
        this.validation("resistenza", "Lancia il dado");
        this.validator.push('resistenza');
      }
      
      if(this.playerRes.artiRamas.length < 5) {
        this.validation("arti-ramas", "Devi scegliene 5");
        this.validator.push('arti-ramas');
      }
      
      if(this.playerRes.oggettoTrovato === '') {
        this.validation("oggettoTrovato", "Cerca tra le macerie");
        this.validator.push('oggettoTrovato');
      }
      return false;
    } else {
      if(this.validator.length){
        this.reset(this.validator);
      }
      let creazioneDiv = document.querySelector(`#creazione`);
      creazioneDiv.classList.add('fadeOut');
      setTimeout(() => {creazioneDiv.classList.add('hidden')}, 2000);
      document.querySelector(`#game`).classList.add('fadeIn');
      return this.playerRes;
    }
  }
  
  level(facile, difficile){
    facile.addEventListener('click', () => {
      if(facile.checked){
        this.playerRes.livello = true;
      }
    });
    
    difficile.addEventListener('click', () => {
      if(difficile.checked){
        this.playerRes.livello = false;
      }
    });
  }
  
  reset(array, tag){
    document.querySelector(`.${tag}`).classList.remove('error');
    let el = document.querySelector(`.${tag} p.error-text`);
    if(el){
      el.parentNode.removeChild(el);
    }
    this.splice(array, tag);
  }
  
  resetAll(tagArr){
    tagArr.forEach(element => {
      document.querySelector(`.${element}`).classList.remove('error');
      let el = document.querySelector(`.${element} p.error-text`);
      if(el){
        el.parentNode.removeChild(el);
      }
    });
  }
  
  validation(element, message){
    let msg = message ? message : "errore generico";
    
    let el = document.querySelector(`.${element}`);
    el.classList.add('error');
    let error = document.createElement('p');
    error.classList.add('error-text');
    error.innerHTML = msg;
    el.appendChild(error);
  }
  
  splice(array, element){
    let index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  
  caratteristiche(){
    let counterComb = 3;
    let counterRes = 3;
    let varAble = "combattivita";
    let combBtn = document.querySelector(`label.${varAble} button`);
    let combSpan = document.querySelector('label.combattivita .result');
    let resBtn = document.querySelector('label.resistenza button');
    let resSpan = document.querySelector('label.resistenza .result');
    
    combBtn.addEventListener('click', () => {
      this.reset(this.validator, "combattivita");
      
      if(this.playerRes.livello && counterComb){
        this.playerRes.combattivita = this.innerHtml(combSpan);
        counterComb--;
      } else {
        this.splice(this.validator, "combattivita");
        this.playerRes.combattivita = this.innerHtml(combSpan);
        combBtn.disabled = true;
        combBtn.classList.add('hidden');
      }
    });
    
    resBtn.addEventListener('click', () => {
      this.reset(this.validator, "resistenza");
      if(this.playerRes.livello && counterRes){
        this.playerRes.resistenza = this.innerHtml(resSpan);
        counterRes--;
      } else {
        this.playerRes.resistenza = this.innerHtml(resSpan);
        resBtn.disabled = true;
        resBtn.classList.add('hidden');
      }
    });
  }
  
  addArtiRamas(){
    let schemaHtml;
    // Make the list
    let listElement = document.getElementById('arti-ramas');
    let checkboxes = [];
    let scherma;
    if(this.artiRamas.length){
      this.artiRamas.forEach( (arte) => {
        let checkboxDiv = this.createElem('div',['checkbox']);
        let labelBox = this.createElem('label',['container']);
        
        labelBox.innerHTML = arte;
        let input = document.createElement('input');
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "checkbox");
        input.id = arte;
        
        if(arte === "Scherma") {
          scherma = input;
          schemaHtml = document.createElement('span');
          schemaHtml.classList.add("arma", "hidden");
          labelBox.appendChild(schemaHtml);
        }
        checkboxes.push(input);
        
        let span = this.createElem('span', ['checkmark']);
        
        labelBox.appendChild(input);
        labelBox.appendChild(span);
        checkboxDiv.appendChild(labelBox);
        listElement.appendChild(checkboxDiv);
        
        input.addEventListener('change', () => {
          if(input.checked) {
            this.playerRes.artiRamas.push(arte);
          }else {
            this.splice(this.playerRes.artiRamas, arte);
            
            if(arte === "Scherma") {
              this.playerRes.arma = "";
            }
          }
        });
      });
    }
    this.checkBoxLimit(checkboxes, 5);
    
    let schermaRes = document.getElementById('scherma-res');
    scherma.addEventListener('change', () => {
      
      if(scherma.checked) {
        this.reset(this.validator, "arti-ramas");
        if(!this.playerRes.arma){
          this.playerRes.arma = this.armi[this.dice()];
          schemaHtml.innerHTML = this.playerRes.arma;
        }
        if(schemaHtml.classList.contains("hidden")){
          schemaHtml.classList.remove("hidden");
        }
      } else {
        schemaHtml.classList.add("hidden");
      }
    });
  }
  
  findObj(){
    let counter = 3;
    let findBtn = document.getElementById('find-btn');
    let find = document.getElementById('find');
    let findIt = document.getElementById('find-it');
    findBtn.addEventListener('click', () => {
      this.reset(this.validator, "oggettoTrovato");
      
      if(this.playerRes.livello && counter){
        this.playerRes.oggettoTrovato = this.oggettiTrovati[this.dice()];
        
        this.nonUguali();
        
        findIt.innerHTML = "Hai trovato [ " + this.playerRes.oggettoTrovato + " ]";
        counter--;
      } else {
        this.playerRes.oggettoTrovato = this.oggettiTrovati[this.dice()];
        findIt.innerHTML = "Hai trovato [ " + this.playerRes.oggettoTrovato + " ]";
        find.disabled = true;
        find.classList.add('hidden');
      }
    });
    
  }
  
  nonUguali(){
    let oggettoTemp = this.oggettiTrovati[this.dice()];
    if(this.playerRes.oggettoTrovato === this.playerRes.arma){
      console.log(`${this.playerRes.oggettoTrovato} === ${this.playerRes.arma}`);
      this.playerRes.oggettoTrovato = this.oggettiTrovati[this.dice()];
      this.nonUguali();
    }
  }
  
  getElem(tag, classes){
    return document.getElementsByClassName(classes);
  }
  
  createElem(tag, classes){
    let el = document.createElement(tag);
    if(classes.length){
      el.classList.add(...classes);
    }
    return el;
  }
  
  checkBoxLimit(checkBoxGroup, limit) {
    
    let checkboxCounter = 0;
    checkBoxGroup.forEach( (checkBox) => {
      checkBox.addEventListener( 'change', () => {
        
        if(checkBox.checked) {
          if(checkboxCounter < limit){
            checkboxCounter++;
          }else {
            checkBox.checked = false;
          }
        } else {
          if(checkboxCounter > 0){
            checkboxCounter--;
          }
        }
      });
    });
  }
  
  maxNumber(counter,max){
    if(counter <= max) return true;
  }
  
  error(msg, tag){
    document.getElementById(tag).innerHTML = msg;
  }
  
  innerHtml(tag){
    let res =  this.dice();
    if(this.playerRes.livello){
      if( (res + this.livelloFacile) > 10){
        res = 10;
      }else {
        res += this.livelloFacile;
      }
    }
    tag.innerHTML = res;
    return res;
  }
  
  dice(){
    return Math.floor(Math.random() * 10) ;
  }
}

class Player {
  constructor(
    {
      livello,
      combattivita,
      resistenza,
      artiRamas,
      oggettoTrovato
    },
    armiList
  ) {
    this.livello = livello;
    this.combattivita = 10 + combattivita;
    this.resistenza = 20 + resistenza;
    
    this.artiRamas = artiRamas;
    
    this.oggettoTrovato = oggettoTrovato;
    this.zaino = {
      pasti: "pasti" || 1,
      pozione: "pazione" || 0
    };
    this.armiList = armiList;
    this.armi = ["ascia"];
    
    this.borsa = {
      coroneOro : "coroneOro"
    };
    
    this.armatura = {
      elmo: "elmo" || "elmo",
      cottaDiMaglia : "cottaDiMaglia" || false
    };
    
    this.oggettiSpeciali = [
      "Mappa di Summerlund"
    ];
  }
  
  init(){
    this.caratteristiche();
    this.controlObj();
    this.addArmi();
    this.aggiungiArtiRamas();
  }
  
  controlObj(){
    let arma = this.controlInArray(this.armiList, this.oggettoTrovato);
    if(arma) this.armi.push(arma);
  }
  
  caratteristiche(){
    this.print(".comb h4", this.combattivita);
    this.print(".res h4", this.resistenza);
  }
  
  addArmi(){
    let listElement = document.querySelector('#registro-guerra .armamento');
    
    if(this.armi.length){
      this.armi.forEach( (arma) => {
        let list = document.createElement('li',['arma']);
        list.innerHTML = arma;
        listElement.appendChild(list);
        
        this.filtroArtiRamas(arte);
      });
    }
  }
  
  aggiungiArtiRamas(){
    let listElement = document.querySelector('#registro-guerra .arti');
    
    if(this.artiRamas.length){
      this.artiRamas.forEach( (arte) => {
        let list = document.createElement('li',['arte']);
        list.innerHTML = arte;
        listElement.appendChild(list);
        
        this.filtroArtiRamas(arte);
      });
    }
  }
  
  filtroArtiRamas(arte){
    if(arte === "Guarigione") {
      this.AddNota(`${arte}: Guarisci un punto di resistenza per ogni tappa senza combattimento`);
    }else if(arte === "Caccia"){
      this.AddNota(`${arte}: Non sei obbligato a fare un Pasto quando ti viene ordinato`);
    }else if(arte === "Scherma"){
    }
  }
  
  AddNota(nota){
    let listElement = document.querySelector('#note ul');
    let list = document.createElement('li',['nota']);
    list.innerHTML = nota;
    listElement.appendChild(list);
  }
  
  //TOOL
  print(query, value){
    let element = document.querySelector(query);
    element.innerHTML = value;
  }
  
  controlInArray(array, element){
    let index = array.indexOf(element);
    if (index > -1) {
      return element;
    }
    return false;
  }
}

let game = new Game(artiRamas, armiList);
game.formComponent();

let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
  let play = game.submitPlay();
  if(play){
    let player = new Player( play, armiList );
    player.init();
  }
})


// resSpan.innerHTML = res;
