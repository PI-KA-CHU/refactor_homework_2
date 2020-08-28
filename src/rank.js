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
  
  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === 'china') {
        result += 1;
    }
    if (this.voyage.zone === 'east-indies') {
        result += 1;
    }
    result += this.historyLengthFactor;
    result += this.voyageLengthFactor;
    return result;
  }

  get voyageLengthFactor() {
      return (this.voyage.length > 14) ? -1 : 0;
  }

  get historyLengthFactor() {
      return (this.history.length > 8) ? 1 : 0;
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

class ExperiencedChinaRating extends Rating{
  get captainHistoryRisk() {
      const result = super.captainHistoryRisk - 2;
      return Math.max(result, 0);
  }
}

function createRating(voyage, history) {
  if (voyage.zone === 'china' && history.some(v => "china" === v.zone)) {
      return new ExperiencedChinaRating(voyage, history);
  } else {
      return new Rating(voyage, history);
  }
}

function rating(voyage,history){
  return createRating(voyage,history).rating;
}