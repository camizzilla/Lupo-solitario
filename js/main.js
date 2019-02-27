//Lista delle arti ramas
const kaiDisciplinesList = [
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

//Lista delle armi
const weaponsList = [
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

//Lista degli oggetti che si possono trovare sotto le macerie
const itemsUnderRuins = [
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

//Matrice per il calcolo del risultato del combattimaneto
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

class Tools {
  constructor(){}
  
  //ritorna un numero a caso da 0 a 9
  static get getDiceResult(){
    return Math.floor(Math.random() * 10) ;
  }
  
  //Converte il nome di una variabile in un nome di una classe
  //Esempio nomeStringa => nome-stringa
  static convertStringInClassName( string ){
    let stringElab = "";
    let regex = /[A-Z]/;
    for ( let key in string){
      let uppercase = regex.test(string[key]);
      if(uppercase){
        stringElab =  string.slice(0, key) + "-" + string.slice(key, string.lengt);
      }
    }
    return stringElab.toLowerCase();
  }
  
}

//Classe che gestisce il form per la creazione del personaggio
class CharacterGenerator  {
  constructor(kaiDisciplinesList, weaponsList, itemsUnderRuins){
    
    this.difficulty = true; //livello difficoltà
    this.easyDifficulty = 3; // aggiunge +3 al risultato del dado nel livello "easy"
    
    //Valori resettati del giocatore
    this.playerValues = {
      difficulty: this.difficulty,
      combatSkill: '',
      endurancePoints: '',
      kaiDisciplines: [],
      itemsUnderRuins: '',
      weapons: '',
      goldCoin: ''
    };
    
    this.kaiDisciplines = kaiDisciplinesList; //lista delle arti-ramas
    this.weapons = weaponsList; //lista delle armi
    this.itemsUnderRuins = itemsUnderRuins; //lista degli oggetti
    this.weaponskill = "Scherma";
    //Contenitore degli errori
    this.validator = [];
    
    //Funzione di inizializzazione della classe
    this.initCharacterGenerator();
  }
  /*
  initCharacterGenerator:
  Resetta e chiama le funzioni iniziali del generatore
  */
  initCharacterGenerator(){
    let reset = true;
    
    this.setDifficulty(); // Setta la difficoltà
    this.setKaiDisciplines();
    // this.setAttributes();
    this.setAttributes(3, "combatSkill");
    this.setAttributes(3, "endurancePoints");
    this.findObj();
    this.goldCoin();
    
  }
  
  /*
    setDifficulty:
    Cattura e gestisce gli input di tipo "radio" 
    La difficoltà di default è tarata sul "facile" (true)
  */
  setDifficulty(){
    let easy = document.querySelector('#easy');
    let hard = document.querySelector('#hard');
    
    easy.addEventListener('click', () => {
      if(easy.checked){
        this.playerValues.difficulty = true;
      }
    });
    
    hard.addEventListener('click', () => {
      if(hard.checked){
        this.playerValues.difficulty = false;
      }
    });
  }
  
  /*
      setKaiDisciplines:
      Crea la lista delle arti ramas 
  */
  setKaiDisciplines(){
    let weaponskillSpan; //
    let weaponskillInput;
    // capture the element container #kai-disciplines
    let list = document.querySelector('#kai-disciplines');
    let checkboxes = [];
    if(this.kaiDisciplines.length){
      //crea la lista delle arti ramas da selezionare
      this.kaiDisciplines.forEach( (discipline) => {
        let checkboxDiv = this.createElem('div',['checkbox']);
        let labelBox = this.createElem('label',['container']);
        
        labelBox.innerHTML = discipline;
        let input = document.createElement('input');
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "checkbox");
        input.id = discipline;
        
        // Se l'arte ramas è lo "scherma"
        // salva l'input in weaponskillInput
        // crea uno span per visualizzare l'arma che è stata scelta
        if(discipline === this.weaponskill) {
          weaponskillInput = input;
          weaponskillSpan = document.createElement('span');
          weaponskillSpan.classList.add(this.weaponskill, "hidden");
          labelBox.appendChild(weaponskillSpan);
        }
        
        checkboxes.push(input);
        
        let span = this.createElem('span', ['checkmark']);
        
        labelBox.appendChild(input);
        labelBox.appendChild(span);
        checkboxDiv.appendChild(labelBox);
        list.appendChild(checkboxDiv);
        
        //gestisce i check della lista
        input.addEventListener('change', () => {
          this.reset(this.validator, "kai-disciplines");
          if(input.checked) {
            this.playerValues.kaiDisciplines.push(discipline);
          }else {
            this.splice(this.playerValues.kaiDisciplines, discipline);
          }
        });
      });
    }
    
    //gestisce il check del input
    weaponskillInput.addEventListener('change', () => {
      
      if(weaponskillInput.checked) {
        
        if(!this.playerValues.weapons){
          this.playerValues.weapons = this.weapons[Tools.getDiceResult];
          weaponskillSpan.innerHTML = this.playerValues.weapons;
        }
        if(weaponskillSpan.classList.contains("hidden")){
          weaponskillSpan.classList.remove("hidden");
        }
      } else {
        weaponskillSpan.classList.add("hidden");
      }
    });
    
    this.checkBoxLimit(checkboxes, 5);
  }
  
  setAttributes( max, elem ){
    let counter = max;
    let className = Tools.convertStringInClassName(elem);
    let btn = document.querySelector(`label.${className} button`);
    let span = document.querySelector(`label.${className} .result`);
    if(btn){
      btn.addEventListener('click', () => {
        this.reset(this.validator, className);
        
        if(this.playerValues.difficulty && counter){
          this.playerValues[elem] = this.innerHtml(span);
          counter--;
        } else {
          this.splice(this.validator, elem);
          this.playerValues[elem] = this.innerHtml(span);
          btn.disabled = true;
          btn.classList.add('hidden');
        }
      });
    }
  }
   
  submitPlay(){
    if( (this.playerValues.combattivita === '') ||
      (this.playerValues.resistenza === '') ||
      (this.playerValues.artiRamas.length < 5) ||
      (this.playerValues.oggettoTrovato === '')
    ){
      if(this.validator){
        this.resetAll(this.validator);
      }
      
      if(this.playerValues.combattivita === '') {
        this.validation("combattivita", "Il bottone, pirla!");
        this.validator.push('combattivita');
      }
      
      if(this.playerValues.resistenza === '') {
        this.validation("resistenza", "Lancia il dado");
        this.validator.push('resistenza');
      }
      
      if(this.playerValues.artiRamas.length < 5) {
        this.validation("arti-ramas", "Devi scegliene 5");
        this.validator.push('arti-ramas');
      }
      
      if(this.playerValues.oggettoTrovato === '') {
        this.validation("oggettoTrovato", "Cerca tra le macerie");
        this.validator.push('oggettoTrovato');
      }
      
      if(this.playerValues.goldCoin === '') {
        this.validation("goldCoin", "Non voui le corone d'oro?");
        this.validator.push('goldCoin');
      }
      return false;
    } else {
      if(this.validator.length){
        this.reset(this.validator);
      }
      let creazioneDiv = document.querySelector(`#creazione`);
      // creazioneDiv.classList.add('slide-out-right');
      // setTimeout(() => {creazioneDiv.classList.add('hidden')}, 2000);
      // document.querySelector(`#game`).classList.add('slide-in-left');
      return this.playerValues;
    }
  }
  
  
  
  reset(array, tag){
    
    // let regexp = /[A-Z]/;
    // let index = tag.search(regexp);
    // tag.toLowerCase();
    // tag = tag.slice(0, index) + "-" + tag.slice(index, tag.length);
    
    // console.log('tag', tag);
    // tag.forEach( letter => {
    //   if (regexp.test(letter)) {
    //     console.log('letter', letter);
    //   }
    
    // });
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
  
  
  
  
  
  findObj(){
    let counter = 3;
    let findBtn = document.getElementById('find-btn');
    let find = document.getElementById('find');
    let findIt = document.getElementById('find-it');
    findBtn.addEventListener('click', () => {
      this.reset(this.validator, "oggettoTrovato");
      
      if(this.playerValues.difficulty && counter){
        this.playerValues.oggettoTrovato = this.oggettiTrovati[this.dice()];
        
        this.nonUguali();
        
        findIt.innerHTML = "Hai trovato [ " + this.playerValues.oggettoTrovato + " ]";
        counter--;
      } else {
        this.playerValues.oggettoTrovato = this.oggettiTrovati[this.dice()];
        findIt.innerHTML = "Hai trovato [ " + this.playerValues.oggettoTrovato + " ]";
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
      
      if(this.playerValues.difficulty && counter){
        this.playerValues.goldCoin = this.dice();
        
        h3.innerHTML = "Hai trovato " + this.playerValues.goldCoin + " Corone d'oro";
        counter--;
      } else {
        this.playerValues.goldCoin = this.dice();
        h3.innerHTML = "Hai trovato " + this.playerValues.goldCoin + " Corone d'oro";
        label.disabled = true;
        label.classList.add('hidden');
      }
    });
  }
  
  nonUguali(){
    let oggettoTemp = this.oggettiTrovati[this.dice()];
    if(this.playerValues.oggettoTrovato === this.playerValues.arma){
      console.log(`${this.playerValues.oggettoTrovato} === ${this.playerValues.arma}`);
      this.playerValues.oggettoTrovato = this.oggettiTrovati[this.dice()];
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
    let res =  Tools.getDiceResult;
    if(this.playerValues.difficulty){
      if( (res + this.easyDifficulty) > 10){
        res = 10;
      }else {
        res += this.easyDifficulty;
      }
    }
    tag.innerHTML = res;
    return res;
  }
  
  // dice(){
  //   return Math.floor(Math.random() * 10) ;
  // }
}
/************************************************/
/************************************************/
/************************************************/
/************************************************/
/************************************************/


class Player {
  constructor(
    {
      difficulty,
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
    this.difficulty = difficulty ? 3 : 0;
    this.combattivita = 10 + combattivita;
    this.resistenza = 20 + resistenza;
    
    this.artiRamas = artiRamas;
    this.abilitaScherma = arma || null;
    
    this.risultatiCombattimento = risultatiCombattimento;
    
    this.oggettoTrovato = oggettoTrovato;
    
    this.itemInBag = 0;
    this.pasti = 1;
    this.pozione = 0;
    this.oggetti = [];
    
    this.maxItems = 9;
    
    this.armiList = armiList;
    this.armi = ["Ascia"];
    
    this.borsa = {
      coroneOro : goldCoin
    };
    
    this.goldCoins = goldCoin;
    
    this.oggettiSpeciali = [
      "Mappa di Summerlund"
    ];
    this.combElem = document.querySelector(".comb h4");
    this.resElem = document.querySelector(".res h4");
    
    this.enemyId = 0;
  }
  
  init(){
    this.controlObj();
    this.addArmi();
    this.aggiungiArtiRamas();
    this.aggiornaCaratteristiche();
    this.printPotions();
    this.printFood();
    this.printItems();
    this.borsello();
    this.aggiungiOggettiSpeciali();
    this.ctrlResComb();
    
    this.addEnemy();
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
      this.pasti += 2;
    }else if( "Corone d'oro" === this.oggettoTrovato){
      this.goldCoins += 12;
    }else if( "Pozione" === this.oggettoTrovato){
      this.pozione += 1;
    }
  }
  
  aggiornaCaratteristiche(){
    this.print(this.combElem, this.combattivita);
    this.print(this.resElem, this.resistenza);
    if(this.resistenza <= 0){
      this.resistenza = 0;
      this.gameOver();
    }
  }
  
  ctrlResComb(){
    let btnPlusRes = document.querySelector(".res-plus");
    let btnMinusRes = document.querySelector(".res-minus");
    let btnPlusComb = document.querySelector(".comb-plus");
    let btnMinusComb = document.querySelector(".comb-minus");
    
    btnPlusRes.addEventListener('click', () => {
      this.resistenza++;
      this.aggiornaCaratteristiche();
    });
    btnMinusRes.addEventListener('click', () => {
      this.resistenza--;
      this.aggiornaCaratteristiche();
    });
    btnPlusComb.addEventListener('click', () => {
      this.combattivita++;
      this.aggiornaCaratteristiche();
    });
    btnMinusComb.addEventListener('click', () => {
      this.combattivita--;
      this.aggiornaCaratteristiche();
    });
  }
  
  addArmi(){
    let maxItems = 2;
    let list = document.querySelector('#registro-guerra .armamento');
    
    let btnPLus = this.btnAddItem(list, maxItems, "armi");
    
    if(this.armi.length){
      this.armi.forEach( (arma) => {
        this.addItemList(arma, "armi", list, btnPLus, maxItems);
      });
    }
  }
  
  addItemList(className, arrayName, list, btnPLus, maxItems){
    let item = document.createElement('li');
    item.innerHTML = className;
    this.addBtnCanc(item, arrayName, className, list, btnPLus, maxItems);
    list.appendChild(item);
  }
  
  //
  addBtnCanc(item, arrayName, element, list, btnPLus, maxItems){
    let btn = document.createElement('button');
    btn.innerHTML = "remove";
    item.appendChild(btn);
    
    btn.addEventListener('click', () => {
      const index = this[arrayName].indexOf(element);
      this[arrayName].splice(index, 1);
      list.removeChild(item);
      if(this.maxItem(arrayName, maxItems)){
        btnPLus.classList.remove('hidden');
      }
    });
  }
  
  btnAddItem(list, maxItems, arrayName){
    let btn = document.createElement('button');
    btn.innerHTML = "+";
    
    if(!this.maxItem(arrayName, maxItems)){
      btn.classList.add('hidden');
    }
    
    let form = this.inputForm(arrayName, arrayName, list, btn, maxItems);
    
    list.before(btn);
    list.before(form);
    
    btn.addEventListener('click', () => {
      form.classList.remove('hidden');
      btn.classList.add('hidden');
    });
    
    return btn;
  }
  
  inputForm(className, arrayName, list, addItem, maxItems){
    let div = document.createElement('div');
    div.classList.add('hidden', className);
    
    let input = document.createElement('input');
    let btn = document.createElement('button');
    btn.innerHTML = "Add";
    
    div.appendChild(input);
    div.appendChild(btn);
    
    btn.addEventListener('click', () => {
      let value = input.value;
      if(value) this.addInputArray(arrayName, value);
      this.addItemList(value, "armi", list, addItem, maxItems);
      div.classList.add('hidden');
      input.value = "";
      if(this.maxItem(arrayName, maxItems)) addItem.classList.remove('hidden');
    });
    return div;
  }
  
  addInputArray(array, value){
    this[array].push(value);
  }
  
  btnPlusMinus(className, objName, elem, maxItems){
    let div = document.createElement('div');
    div.classList.add(className);
    let btnPlus = document.createElement('button');
    btnPlus.innerHTML = "+";
    let btnMinus = document.createElement('button');
    btnMinus.innerHTML = "-";
    
    div.appendChild(btnPlus);
    div.appendChild(btnMinus);
    
    btnPlus.addEventListener('click', () => {
      if( !this.checkBag(objName)){
        this.addOne(objName);
        this.update(objName, elem);
      } else {
        if(this.maxItem(objName, maxItems)){
          this.addOne(objName);
          this.update(objName, elem);
        } else {
          this.btnAddItems.classList.add('hidden');
        }
      }
      
    });
    btnMinus.addEventListener('click', () => {
      this.subtractOne(objName);
      this.update(objName, elem);
      
      if( this.checkBag(objName) && this.maxItem(objName, maxItems)){
        this.btnAddItems.classList.remove('hidden');
      }
    });
    return div;
  }
  
  update(objName, elem){
    elem.innerHTML = this[objName];
  }
  
  
  addOne(objName){
    this[objName]++;
  }
  
  subtractOne(objName){
    if(this[objName] > 0){
      this[objName]--;
    } else {
      this[objName] = 0;
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
  printPotions(){
    let maxItems = this.maxItems;
    let potions = this.printQuery(".zaino .potions", this.pozione);
    let btnPlusMinus = this.btnPlusMinus("potions", "pozione", potions.span, maxItems);
    potions.elem.appendChild(btnPlusMinus);
  }
  
  printFood(){
    let maxItems = this.maxItems;
    let food = this.printQuery(".zaino .foods", this.pasti);
    let btnPlusMinus = this.btnPlusMinus("foods", "pasti", food.span, maxItems);
    food.elem.appendChild( btnPlusMinus );
  }
  
  printItems(){
    let maxItem = this.maxItems;
    let list = document.querySelector('.zaino ol.items');
    this.btnAddItems = this.btnAddItem(list, maxItem, "oggetti");
    if(this.oggetti.length){
      this.oggetti.forEach( oggetto => {
        this.addItemList(oggetto, "oggetti", list, this.btnAddItems, maxItem);
      });
    }
  }
  
  borsello(){
    let maxCoin = 50;
    let goldCoins = this.printQuery(".borsa h3", this.goldCoins);
    let btnPlusMinus = this.btnPlusMinus("goldcoin", "goldCoins", goldCoins.span, maxCoin);
    goldCoins.elem.appendChild(btnPlusMinus);
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
  
  checkBag(arrayName){
    return arrayName == "pasti" || arrayName == "pozione" || arrayName == "oggetti";
  }
  
  lengthItems(arrayName){
    if(this.checkBag(arrayName)){
      return this.oggetti.length + this.pasti + this.pozione;
    }else {
      return this[arrayName].length;
    }
  }
  
  maxItem(arrayName, max){
    let length = this.lengthItems(arrayName);
    
    if(length < max){
      return true;
    }else {
      return false;
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
    let span = document.createElement('span');
    element.appendChild(span);
    this.print(span, value);
    return {
      span:span,
      elem: element
    };
  }
  
  print(elem, value){
    elem.innerHTML = value;
  }
  
  controlInArray(array, element){
    let index = array.indexOf(element);
    if (index > -1) return element;
    return false;
  }
  
  addEnemy(){
    let error = document.querySelector("#combattimento .error");
    let addEnemyBtn = document.querySelector("#addEnemy");
    let formCombattimento = document.querySelector("#combattimento");
    addEnemyBtn.addEventListener('click', ()=>{
      
      let enemy = {
        combattivita : parseInt( this.getEnemyValue(".EnemyComb input", "value")),
        resistenza : parseInt( this.getEnemyValue(".EnemyRes input", "value")),
        psicoLaser: this.getEnemyValue("#enemy-psicolaser", "checked"),
        psicoSchermo: this.getEnemyValue("#enemy-psicoScudo", "checked")
      };
      if(enemy.combattivita && enemy.resistenza){
        if(formCombattimento.classList.contains("error")) formCombattimento.classList.remove("error");
        error.classList.add('hidden');
        
        if(enemy.psicoLaser && !this.iHavePsico("Psicoschermo")) {
          this.combattivita -= 2;
          this.aggiornaCaratteristiche();
        }
        
        if(enemy.psicoSchermo && this.iHavePsico("Psicolaser")) {
          this.combattivita -= 2;
          this.aggiornaCaratteristiche();
        }
        
        let differenzaForza = this.combattivita - enemy.combattivita;
        
        let Enemys = new Enemy(
          this.enemyId++,
          enemy.combattivita,
          enemy.resistenza,
          differenzaForza,
          this
        );
        this.resetValue(".EnemyComb input");
        this.resetValue(".EnemyRes input");
      }else {
        formCombattimento.classList.add("error");
        error.innerHTML = "Completare il form";
        error.classList.remove('hidden');
      }
    });
  }
  
  scontro( differenzaForza ){
    let dice = this.dice();
    let rapportoForza = this.rapportoForza(differenzaForza);
    console.log("differenza Forza:::", rapportoForza);
    let res = this.risultatiCombattimento[dice][rapportoForza];
    console.log("result:::", res);
    if(res.ls !== "M") {
      this.resistenza -= res.ls;
    } else {
      this.resistenza = 0;
    }
    if(this.resistenza >= 0){
      this.aggiornaCaratteristiche();
    }else {
      this.gameOver();
    }
    return res.n;
  }
  
  gameOver(){
    document.querySelector('#game-over').classList.remove('hidden');
    this.reset();
  }
  
  getEnemyValue(elem, type){
    if(type === "value"){
      return document.querySelector(elem).value;
    }else if (type === "checked"){
      return document.querySelector(elem).checked;
    }
  }
  
  resetValue(elem){
    document.querySelector(elem).value = "";
  }
  
  iHavePsico(psicoWeapon){
    let psico = this.artiRamas.filter( arte => arte === psicoWeapon);
    if( psico.length ) {
      return true;
    } else {
      return false;
    }
  }
  
  reset(){
    
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
  constructor(id, combattivita, resistenza, differenzaForza, player){
    this.id = id;
    this.combattivita = combattivita;
    this.resistenza = resistenza;
    this.combattivitaList = document.querySelector("ul.enemy-list");
    this.create();
    this.player = player;
    this.differenzaForza = differenzaForza;
  }
  
  create(){
    let li = document.createElement("li");
    
    let p1 = document.createElement("p");
    p1.innerHTML = "Combattività: ";
    let span1 = document.createElement("span");
    span1.innerHTML = this.combattivita;
    p1.appendChild(span1);
    li.appendChild(p1);
    
    let p2 = document.createElement("p");
    p2.innerHTML = "Resistenza: ";
    let span2 = document.createElement("span");
    span2.classList.add(`enemy-res-${this.id}`);
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
    });
  }
  
  appendoToList(elem){
    this.combattivitaList.appendChild(elem);
  }
  
  printResistenza(){
    let res = document.querySelector(`.enemy-res-${this.id}`);
    res.innerHTML = this.resistenza;
  }
  
  attacca(){
    let puntiFerita = this.player.scontro(this.differenzaForza);
    this.calcResistenza(puntiFerita);
  }
  
  calcResistenza(puntiFerita){
    console.log( `Resistenza : ${this.resistenza}
      puntiFerita ${puntiFerita}
    `);
    
    this.resistenza -= puntiFerita;
    
    if(this.resistenza <= 0){
      console.log('nemico Morto');
      this.resistenza = 0;
      this.printResistenza();
    }else {
      console.log( `Resistenza : ${this.resistenza}`);
      this.printResistenza();
    }
  }
  
}


let characterGenerator = new CharacterGenerator(kaiDisciplinesList, weaponsList, itemsUnderRuins);

let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
  let play = characterGenerator.submitPlay();
  if(play){
    let player = new Player( play, weaponsList, risultatiCombattimento );
    player.init();
  }
});


// resSpan.innerHTML = res;