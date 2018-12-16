class game  {
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
    }
    
    oggettiSpeciali = [
      "Mappa di Summerlund"
      ]
  }
}