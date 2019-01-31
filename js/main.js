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

const risultatiCombattimento = [
  [{n: 0, ls: "M"},{n: 0, ls: "M"},{n: 0, ls: 8},{n: 0, ls: 6},{n: 1, ls: 6},{n: 3, ls: 5},{n: 4, ls: 5},{n: 5, ls: 4},{n: 6, ls: 4},{n: 7, ls: 4},{n: 8, ls: 3},{n: 9, ls: 3}],
  [{n: 0, ls: "M"},{n: 0, ls: 8},{n: 0, ls: 7},{n: 1, ls: 6},{n: 2, ls: 5},{n: 4, ls: 4},{n: 5, ls: 4},{n: 6, ls: 3},{n: 7, ls: 3},{n: 8, ls: 3},{n: 9, ls: 3},{n: 10, ls: 2}],
  [{n: 0, ls: 8},{n: 0, ls: 7},{n: 1, ls: 6},{n: 2, ls: 5},{n: 3, ls: 5},{n: 5, ls: 4},{n: 6, ls: 3},{n: 7, ls: 3},{n: 8, ls: 3},{n: 9, ls: 2},{n: 10, ls: 2},{n: 11, ls: 2}],
  [{n: 0, ls: 8},{n: 1, ls: 7},{n: 2, ls: 6},{n: 3, ls: 5},{n: 4, ls: 4},{n: 6, ls: 3},{n: 7, ls: 3},{n: 8, ls: 2},{n: 9, ls: 2},{n: 10, ls: 2},{n: 11, ls: 2},{n: 12, ls: 2}],
  [{n: 1, ls: 7},{n: 2, ls: 6},{n: 3, ls: 5},{n: 4, ls: 4},{n: 5, ls: 4},{n: 7, ls: 2},{n: 8, ls: 2},{n: 9, ls: 2},{n: 10, ls: 2},{n: 11, ls: 2},{n: 12, ls: 2},{n: 14, ls: 1}],
  [{n: 2, ls: 6},{n: 3, ls: 6},{n: 4, ls: 5},{n: 5, ls: 4},{n: 6, ls: 3},{n: 8, ls: 2},{n: 9, ls: 2},{n: 10, ls: 2},{n: 11, ls: 1},{n: 12, ls: 0},{n: 14, ls: 0},{n: 16, ls: 0}],
  [{n: 3, ls: 5},{n: 4, ls: 5},{n: 5, ls: 4},{n: 6, ls: 3},{n: 7, ls: 2},{n: 9, ls: 1},{n: 10, ls: 1},{n: 11, ls: 1},{n: 12, ls: 0},{n: 14, ls: 0},{n: 16, ls: 0},{n: 18, ls: 0}],
  [{n: 4, ls: 4},{n: 5, ls: 4},{n: 6, ls: 3},{n: 7, ls: 2},{n: 8, ls: 1},{n: 10, ls: 0},{n: 12, ls: 0},{n: 14, ls: 0},{n: 16, ls: 0},{n: 0, ls: 0},{n: 0, ls: 0},{n: 0, ls: 0}],
  [{n: 5, ls: 3},{n: 6, ls: 3},{n: 7, ls: 2},{n: 8, ls: 0},{n: 9, ls: 0},{n: 11, ls: 0},{n: 12, ls: 0},{n: 14, ls: 0},{n: 16, ls: 0},{n: 18, ls: 0},{n: "M", ls: 0},{n: "M", ls: 0}],
  [{n: 6, ls: 0},{n: 7, ls: 0},{n: 8, ls: 0},{n: 9, ls: 0},{n: 10, ls: 0},{n: 12, ls: 0},{n: 14, ls: 0},{n: 16, ls: 0},{n: 18, ls: 0},{n: "M", ls: 0},{n: "M", ls: 0},{n: "M", ls: 0}]
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
      arma: '',
      goldCoin: ''
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
    this.goldCoin();
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
      
      if(this.playerRes.goldCoin === '') {
        this.validation("goldCoin", "Non voui le corone d'oro?");
        this.validator.push('goldCoin');
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
            
            // if(arte === "Scherma") {
            //   this.playerRes.arma = "";
            // }
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
  
  goldCoin(){
    let counter = 3;
    let btn = document.querySelector('.goldCoin button');
    let label = document.querySelector('.goldCoin label');
    let h3 = document.querySelector('.goldCoin h3');
    
    btn.addEventListener('click', () => {
      this.reset(this.validator, "goldCoin");
      
      if(this.playerRes.livello && counter){
        this.playerRes.goldCoin = this.dice();
        
        h3.innerHTML = "Hai trovato " + this.playerRes.goldCoin + " Corone d'oro";
        counter--;
      } else {
        this.playerRes.goldCoin = this.dice();
        h3.innerHTML = "Hai trovato " + this.playerRes.goldCoin + " Corone d'oro";
        label.disabled = true;
        label.classList.add('hidden');
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
/************************************************/
/************************************************/
/************************************************/
/************************************************/
/************************************************/


class Player {
  constructor(
    {
      livello,
      combattivita,
      resistenza,
      artiRamas,
      oggettoTrovato,
      arma,
      goldCoin
    },
    armiList,
    risultatiCombattimento
  ) {
    this.livello = livello ? 3 : 0;
    this.combattivita = 10 + combattivita;
    this.resistenza = 20 + resistenza;
    
    this.artiRamas = artiRamas;
    this.abilitaScherma = arma || null;
    
    this.risultatiCombattimento = risultatiCombattimento;
    
    this.oggettoTrovato = oggettoTrovato;
    this.zaino = {
      pasti: 1,
      pozione: 0,
      oggetti: []
    };
    this.armiList = armiList;
    this.armi = ["Ascia"];
    
    this.borsa = {
      coroneOro : goldCoin
    };
    
    this.oggettiSpeciali = [
      "Mappa di Summerlund"
    ];
    this.combElem = document.querySelector(".comb h4");
    this.resElem = document.querySelector(".res h4");
  }
  
  init(){
    let that = this;
    this.controlObj();
    this.addArmi();
    this.aggiungiArtiRamas();
    this.aggiornaCaratteristiche();
    this.zainoFunc();
    this.borsello();
    this.aggiungiOggettiSpeciali();
    
    this.fight();
    this.throwDice();
  }
  
  controlObj(){
    let arma = this.controlInArray(this.armiList, this.oggettoTrovato);
    if(arma) {
      this.armi.push(arma);
      
    }else if( "elmo" === this.oggettoTrovato){
      this.oggettiSpeciali.push(this.oggettoTrovato);
      this.resistenza += 2;
    }else if( "Cotta di maglia" === this.oggettoTrovato){
      this.oggettiSpeciali.push(this.oggettoTrovato);
      this.resistenza += 4;
    }else if( "Pasti" === this.oggettoTrovato){
      this.zaino.pasti += 2;
    }else if( "Corone d'oro" === this.oggettoTrovato){
      this.borsa.coroneOro += 12;
    }else if( "Pozione" === this.oggettoTrovato){
      this.zaino.pozione += 1;
    }
  }
  
  aggiornaCaratteristiche(){
    this.print(this.combElem, this.combattivita);
    this.print(this.resElem, this.resistenza);
  }
  
  addArmi(){
    let listElement = document.querySelector('#registro-guerra .armamento');
    
    if(this.armi.length){
      this.armi.forEach( (arma) => {
        let list = document.createElement('li',['arma']);
        list.innerHTML = arma;
        listElement.appendChild(list);
      });
    }
  }
  
  aggiungiArtiRamas(){
    let listElement = document.querySelector('#registro-guerra .arti');
    
    if(this.artiRamas.length){
      this.artiRamas.forEach( arte => {
        let list = document.createElement('li',['arte']);
        list.innerHTML = arte;
        listElement.appendChild(list);
        
        this.filtroArtiRamas(arte);
      });
    }
  }
  
  zainoFunc(){
    this.printQuery(".zaino .pozione", this.zaino.pozione);
    this.printQuery(".zaino .pasti", this.zaino.pasti);
    
    let listElement = document.querySelector('.zaino ol.oggetti');
    if(this.zaino.oggetti.length){
      this.zaino.oggetti.forEach( oggetto => {
        let list = document.createElement('li',['oggetto']);
        list.innerHTML = oggetto;
        listElement.appendChild(list);
        
        this.filtroArtiRamas(arte);
      });
    }
  }
  
  borsello(){
    this.printQuery(".borsa label span", this.borsa.coroneOro);
  }
  
  aggiungiOggettiSpeciali(){
    let listElement = document.querySelector('#registro-guerra .oggettiSpeciali');
    
    if(this.oggettiSpeciali.length){
      this.oggettiSpeciali.forEach( oggettoSpeciale => {
        let list = document.createElement('li',['oggettoSpeciale']);
        list.innerHTML = oggettoSpeciale;
        listElement.appendChild(list);
        
      });
    }
  }
  
  filtroArtiRamas(arte){
    if(arte === "Guarigione") {
      this.AddNota(`${arte}: Guarisci un punto di resistenza per ogni tappa senza combattimento`);
    }else if(arte === "Caccia"){
      this.AddNota(`${arte}: Non sei obbligato a fare un Pasto quando ti viene ordinato`);
    }else if(arte === "Scherma"){
      if(this.abilitaScherma){
        this.armi.forEach(arma => {
          if(arma === this.abilitaScherma) this.combattivita += 2;
        });
      }
    }else if (arte === "Psicolaser"){
      this.combattivita += 2;
    }
  }
  
  AddNota(nota){
    let listElement = document.querySelector('#note ul');
    let list = document.createElement('li',['nota']);
    list.innerHTML = nota;
    listElement.appendChild(list);
  }
  
  //TOOL
  printQuery(query, value){
    let element = document.querySelector(query);
    this.print(element, value);
  }
  
  print(elem, value){
    elem.innerHTML = value;
  }
  
  controlInArray(array, element){
    let index = array.indexOf(element);
    if (index > -1) return element;
    return false;
  }
  
  fight(){
    document.querySelector("#fight").addEventListener('click', ()=>{
      
      let enemy = {
        combattivita : Number( this.getEnemyValue(".EnemyComb input", "value")),
        resistenza : Number( this.getEnemyValue(".EnemyRes input", "value")),
        psicoLaser: this.getEnemyValue("#enemy-psicolaser", "checked"),
        psicoSchermo: this.getEnemyValue("#enemy-psicoScudo", "checked")
      };
      console.log("enemy:::", enemy);
      
      if(enemy.psicoLaser && !this.iHavePsico("Psicoschermo")) {
        this.combattivita -= 2;
        this.aggiornaCaratteristiche();
      }
      
      if(enemy.psicoSchermo && this.iHavePsico("Psicolaser")) { 
        this.combattivita -= 2;
        this.aggiornaCaratteristiche();
      }
      
      console.log("enemy2:::", enemy);
      console.log("this.combattivita:::", this.combattivita);
      
      let Enemys = new Enemy(
        enemy.combattivita,
        enemy.resistenza
      );
      
      
      let differenzaForza = this.combattivita - enemy.combattivita;
      
      let rapportoForza = this.rapportoForza(differenzaForza);
      let dice = this.dice();
      console.log(`il dado:::: ${dice }`);
      console.log("rapportoForza:: ", this.risultatiCombattimento[dice -1][rapportoForza]);
      
    });
  }
  
  getEnemyValue(elem, type){
    if(type === "value"){
      return document.querySelector(elem).value;
    }else if (type === "checked"){
      return document.querySelector(elem).checked;
    }
  }
  
  iHavePsico(psicoWeapon){
    let psico = this.artiRamas.filter( arte => arte === psicoWeapon);
    if( psico.length ) {
      return true;
    } else {
      return false;
    }
  }
  
  
  
  rapportoForza(differenzaForza){
    
    if(differenzaForza <= 0){
      
      if(differenzaForza === 0 || differenzaForza === -1 || differenzaForza === -2){
        return 5;
      } else if(differenzaForza === -3 || differenzaForza === -4) {
        return 4;
      } else if(differenzaForza === -5 || differenzaForza === -6) {
        return 3;
      }else if(differenzaForza === -7 || differenzaForza === -8) {
        return 2;
      }else if(differenzaForza === -9 || differenzaForza === -10) {
        return 1;
      }else if(differenzaForza <= -11) return 0;
    }else {
      if(differenzaForza === 1 || differenzaForza === 2){
        return 6;
        
      }else if(differenzaForza === 3 || differenzaForza === 4){
        return 7;
      }else if(differenzaForza === 5 || differenzaForza === 6) {
        return 8;
      }else if(differenzaForza === 7 || differenzaForza === 8) {
        return 9;
        
      }else if(differenzaForza === 9 || differenzaForza === 10) {
        return 10;
        
      }else if(differenzaForza >= 11) return 11;
    }
  }
  
  throwDice(){
    
    let that = this;
    document.querySelector("#throw-dice button.dice").addEventListener('click', ()=>{
      document.querySelector("#throw-dice label .result").innerHTML = that.dice();
    });
    document.querySelector("#throw-dice button.reset").addEventListener('click', ()=>{
      document.querySelector("#throw-dice label .result").innerHTML = "";
    });
  }
  
  dice(){
    let res =  Math.floor(Math.random() * 10);
    if(res === 0) res = 10;
    res--;
    // console.log(`${res -1}, ${rapportoForza}`);
    return res > 9 ? 9 : res;
  }
}
/****************************
 * ***********************  *
 ****************************/ 
class Enemy {
  constructor(combattivita, resistenza){
    this.combattivita = combattivita;
    this.resistenza = resistenza;
    this.combattivitaList = document.querySelector("ul.enemy-list");
    this.create();
  }
  
  create(){
    let li = document.createElement("li");
    
    let p1 = document.createElement("p");
    p1.innerHTML = "Combattività: ";
    let span1 = document.createElement("span", ['enemy-comb']);
    span1.innerHTML = this.combattivita;
    p1.appendChild(span1);
    li.appendChild(p1);
    
    let p2 = document.createElement("p");
    p2.innerHTML = "Resistenza: ";
    let span2 = document.createElement("span", ['enemy-res']);
    span2.innerHTML = this.resistenza;
    p2.appendChild(span2);
    li.appendChild(p2);
    let btn = document.createElement("button");
    btn.classList.add('attacca-btn');
    let t = document.createTextNode("Attacca");
    btn.appendChild(t);
    
    this.appendoToList(li);
    this.appendoToList(btn);
    
    btn.addEventListener('click', () =>{
      this.attacca();
    })
  }
  
  appendoToList(elem){
    this.combattivitaList.appendChild(elem);
  }
  
  printResistenza(){
    let res = document.getElementsByClassName('enemy-res');
    res.innerHtml = this.resistenza;
  }
  
  calcResistenza(danno){
    this.resistenza -= danno;
    if(this.resistenza <= 0){
      console.log('nemico Morto');
    }else {
      this.printResistenza();
    }
  }
  
  attacca(){
    console.log('attacca');
  }
}


let game = new Game(artiRamas, armiList);
game.formComponent();

let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
  let play = game.submitPlay();
  if(play){
    let player = new Player( play, armiList, risultatiCombattimento );
    player.init();
  }
});


// resSpan.innerHTML = res;