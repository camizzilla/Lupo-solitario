class Game  {
  constructor(){
    this.livelloFacile = false;
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
  
  addArtiRamas(){


    
    // Make the list
    var listElement = document.getElementById('arti-ramas');
    
    if(this.artiRamas.length){
      this.artiRamas.forEach( (arti) => {
        let checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'checkbox';
        
        let labelBox = document.createElement('label');
        labelBox.className = 'container';
        labelBox.innerHTML = arti;
        let input = document.createElement('input');
        input.setAttribute("type", "checkbox");
        input.setAttribute("checked", "checked");
        let span = document.createElement('span');
        span.className = 'checkmark';
        
        labelBox.appendChild(input);
        
        labelBox.appendChild(span);
        
        checkboxDiv.appendChild(labelBox);
        
        listElement.appendChild(checkboxDiv);
      });
    }
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
game.addArtiRamas();