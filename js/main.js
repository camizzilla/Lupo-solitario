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
      creazioneDiv.classList.add('slide-out-right');
      setTimeout(() => {creazioneDiv.classList.add('hidden')}, 2000);
      document.querySelector(`#game`).classList.add('slide-in-left');
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
    let goldCoins = this.printQuery(".borsa label", this.goldCoins);
    goldCoins.elem.appendChild(this.btnPlusMinus("goldcoin", "goldCoins", goldCoins.span));
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