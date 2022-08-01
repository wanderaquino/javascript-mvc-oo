class View {
    constructor(element) {
        this._element = element;
    }
    
    template() {
       throw new Error("O método template precisa ser implementado");
    }

    update() {
        throw new Error("O método update precisa ser implementado");
    }

}