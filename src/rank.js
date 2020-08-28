function rating(voyage,history){
  return new Rating(voyage,history).rating;
}


class Rating {
  constructor(voyage,history){
    this.voyage = voyage;
    this.history = history;
  }


  get voyageRisk () {
    let result = 1;
    if (this.voyage.length > 4) {
      result += 2;
    }
    if (this.voyage.length > 8) {
      result += this.voyage.length - 8;
    }
    if ([
      'china',
      'east-indies',
    ].includes(this.voyage.zone)) {
      result += 4;
    }
    return Math.max(result, 0);
  }
  
  get hasChina () {
    return this.history.some(v => 'china' === v.zone);
  }
  
  get captainHistoryRisk () {
    let result = 1;
    if (this.history.length < 5) {
      result += 4;
    }
    result += this.history.filter(v => v.profit < 0).length;
    if (this.voyage.zone === 'china' && this.hasChina) {
      result -= 2;
    }
    return Math.max(result, 0);
  }
  
  get voyageProfitFactor () {
    let result = 2;
    if (this.voyage.zone === 'china') {
      result += 1;
    }
    if (this.voyage.zone === 'east-indies') {
      result += 1;
    }
    if (this.voyage.zone === 'china' && this.hasChina) {
      result += 3;
      if (this.history.length > 10) {
        result += 1;
      }
      if (this.voyage.length > 12) {
        result += 1;
      }
      if (this.voyage.length > 18) {
        result -= 1;
      }
    }
    else {
      if (this.history.length > 8) {
        result += 1;
      }
      if (this.voyage.length > 14) {
        result -= 1;
      }
    }
    return result;
  }
  
  get rating () {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > (vr + chr * 2)) {
      return 'A';
    }
    else {
      return 'B';
    }
  }
  
  
}

module.exports = {
  rating
};

