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
  constructor(comb, res) {
    this.combattivita = 20 + comb;
    this.resistenza = 10 + res;
    this.artiRamas = [];
    this.zaino = {
      pasti: 1
    };
    this.armi = [];
    this.borsa = {
      coroneOro : 0
    }
  }
 
 
 
  
}
console.log("gino");