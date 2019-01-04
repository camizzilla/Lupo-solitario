class Game  {
  constructor(){
    this.livello = true;
    this.livelloFacile = 3;
    this.playerRes = {
      livello: true,
      combattivita: '',
      resistenza: '',
      artiRamas: [],
      oggettoTrovato: '',
      arma: ''
    };
    this.artiRamas = [
      "Mimetismo",
      "Caccia",
      "Sesto senso",
      "Orientamento",
      "Scherma",
      "Psicoschermo",
      "Psicolaser",
      "Affinità animale",
      "Telecinesi"
    ];
    this.armi = [
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
    
    this.level(facile, difficile);
    this.addArtiRamas();
    this.caratteristiche();
    this.findObj();
    let submit = document.getElementById("submit");
    submit.addEventListener('click', () => {
      console.log('this.playerRes::: ',this.playerRes);
      if(this.playerRes.combattivita === ''){
        console.log('error');
      }
    });
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
  
  caratteristiche(){
    let counterComb = 3;
    let counterRes = 3;
    let combBtn = document.getElementById('comb-btn');
    let resBtn = document.getElementById('res-btn');
    let combSpan = document.getElementById('res-comb');
    let resSpan = document.getElementById('res-res');
    
    combBtn.addEventListener('click', () => {
      if(this.playerRes.livello && counterComb){
        this.playerRes.combattivita = this.innerHtml(combSpan);
        counterComb--;
      } else {
        this.playerRes.combattivita = this.innerHtml(combSpan);
        combBtn.disabled = true;
        combBtn.classList.add('hidden');
      }
    });
    
    resBtn.addEventListener('click', () => {
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
            var index = this.playerRes.artiRamas.indexOf(arte);
            if (index > -1) {
              this.playerRes.artiRamas.splice(index, 1);
            }
          }
        });
      });
    }
    this.checkBoxLimit(checkboxes, 5);
    
    let schermaRes = document.getElementById('scherma-res');
    scherma.addEventListener('change', () => {
      if(scherma.checked) {
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
      if(this.playerRes.livello && counter){
        findIt.innerHTML = "Hai trovato [ " + this.oggettiTrovati[this.dice()] + " ]";
        counter--;
      } else {
        findIt.innerHTML = "Hai trovato [ " + this.oggettiTrovati[this.dice()] + " ]";
        find.disabled = true;
        find.classList.add('hidden');
      }
    });
    
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
    console.log(res);
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
    return  Math.floor(Math.random() * 10) ;
  }
}

class player {
  constructor({combattivita, resistenza, artiRamas, pasti, pozione, armi, coroneOro, elmo, cottaDiMaglia }) {
    
    this.combattivita = 20 + combattivita;
    this.resistenza = 10 + resistenza;
    
    this.artiRamas = artiRamas;
    
    this.zaino = {
      pasti: pasti || 1,
      pozione: pazione || 0
    };
    
    this.armi = armi || [6];
    
    this.borsa = {
      coroneOro : coroneOro
    };
    
    this.armatura = {
      elmo: elmo || elmo,
      cottaDiMaglia : cottaDiMaglia || false
    };
    
    oggettiSpeciali = [
      "Mappa di Summerlund"
    ];
  }
}

let game = new Game();
game.formComponent();




// resSpan.innerHTML = res;
