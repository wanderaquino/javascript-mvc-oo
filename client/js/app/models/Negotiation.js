class Negotiation {
    constructor(date, quantity, value) {
        //Programação defensiva - Retorno uma nova referência para a data, preservando a original.
        this._date = new Date(date.getTime());
        this._quantity = quantity;
        this._value = value;

        Object.freeze(this);
    }

    get volume() {
        return this._quantity * this._value
    }

    get date () {
        return new Date(this._date.getTime());
    }

    get quantity() {
        return this._quantity;
    }

    get value() {
        return this._value;
    }
}