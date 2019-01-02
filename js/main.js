class Game  {
  constructor(){
    this.livello = 0;
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
    this.addArtiRamas();
    this.caratteristiche();
    this.level();
    this.findObj();
  }
  
  level(){
    
    let facile = document.getElementById('facile');
    let difficile = document.getElementById('difficile');

    facile.addEventListener('click', () => {
      if(facile.checked){
        this.livello = 3;
        console.log(this.livello);
      }
    });
    
    difficile.addEventListener('click', () => {
      if(difficile.checked){
        this.livello = 0;
        console.log(this.livello);
      }
    });
  }
  
  caratteristiche(){
    
    let combBtn = document.getElementById('comb-btn');
    let resBtn = document.getElementById('res-btn');
    let combSpan = document.getElementById('res-comb');
    let resSpan = document.getElementById('res-res');
    combBtn.addEventListener('click', () => {
      this.innerHtml(combSpan);
    });
    resBtn.addEventListener('click', () => {
      this.innerHtml(resSpan);
    });
  }
  
  addArtiRamas(){
    let arma = null;
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
        
        if(arte === "Scherma") scherma = input;
        checkboxes.push(input);
        
        let span = this.createElem('span', ['checkmark']);
        
        labelBox.appendChild(input);
        labelBox.appendChild(span);
        checkboxDiv.appendChild(labelBox);
        listElement.appendChild(checkboxDiv);
      });
    }
    this.checkBoxLimit(checkboxes, 5);
    
    let schermaRes = document.getElementById('scherma-res');
    scherma.addEventListener('change', () => {
      if(scherma.checked && !arma) {
        arma = this.armi[this.dice() -1];
        schermaRes.innerHTML = arma;
      }
    });
  }
  
  findObj(){
    let findBtn = document.getElementById('find-btn');
    let findSpan = document.getElementById('find');
    findBtn.addEventListener('click', () =>  findSpan.innerHTML = this.oggettiTrovati[this.dice()]);
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
    let res =  this.dice() + 1 + this.livello;
    tag.innerHTML = res >= 10 ? 10 : res;
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
