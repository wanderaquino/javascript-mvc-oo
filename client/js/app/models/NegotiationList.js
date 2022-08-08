class NegotiationList {
    constructor() {
        this._negotiations = [];
        this._totalNegotiations = 0;
    }

    add(negotiation) {
        this._negotiations.push(negotiation);
    }

    get negotiations() {
        //Programação Defensiva -> Devolvo uma lista de negociações preservando a original da classe.
        return [].concat(this._negotiations);
    }

    get totalNumberOfNegotiations() {
        return new Number(this._totalNegotiations);
    }

    _calcTotalNegotiations() {
        this._totalNegotiations = this._negotiations.reduce((acc, negotiation) => acc += negotiation.volume, 0);

    }

    releaseNegotiations() {
        this._negotiations = [];
    }
}