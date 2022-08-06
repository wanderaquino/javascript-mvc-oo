class NegotiationList {
    constructor() {
        this._negotiations = [];
    }

    add(negotiation) {
        this._negotiations.push(negotiation);
    }

    get negotiations() {
        //Programação Defensiva -> Devolvo uma lista de negociações preservando a original da classe.
        return [].concat(this._negotiations);
    }

    totalNegotiations() {
        return new Number(this._negotiations.reduce((acc, negotiation) => acc += negotiation.volume, 0))
    }

    releaseNegotiations() {
        this._negotiations = [];
    }
}