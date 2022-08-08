class NegotiationController {

    constructor () {
        this._negotiationDate = document.forms.negociacao.data;
        this._negotiationQuantity = document.forms.negociacao.quantidade;
        this._negotiationValue = document.forms.negociacao.valor;
        this._negotiationsViewElement = document.querySelector("#negotiationsView");
        this._negotiationMessageElement = document.querySelector("#mensagem");

        this._negotiationsView = new NegotiationsView(this._negotiationsViewElement);
        this._negotiationMessageView = new MessageView(this._negotiationMessageElement);
        this._negotiationList = ProxyFactory.createProxy(
            new NegotiationList(), 
            ["add","releaseNegotiations"], 
            (model) => this._negotiationsView.update(model));

        this._negotiationList = ProxyFactory.createProxy(new NegotiationList(), ["add","releaseNegotiations"]);
        this._negotiationsView.update(this._negotiationList);
    }

    add(event) {
        event.preventDefault();
        
        const negotiation = this._createNegotiation();        
        this._negotiationList.add((negotiationList) => this._negotiationsView.update(negotiationList), negotiation);
        this._negotiationsMessage.text = "Negociação inserida com sucesso";
        this._negotiationMessageView.update(this._negotiationsMessage.text);
        this._resetForm();
    }

    _createNegotiation() {
        return new Negotiation(
            DateHelper.convertDateStringToDate(this._negotiationDate.value),
            this._negotiationQuantity.value,
            this._negotiationValue.value
        )
    }
    _resetForm() {
        this._negotiationDate.value = "",
        this._negotiationQuantity.value = 0;
        this._negotiationValue.value = 0.0;
        this._negotiationDate.focus();
    }

    releaseListOfNegotiations() {
        this._negotiationList.releaseNegotiations((negotiationList) => this._negotiationsView.update(negotiationList));
        this._negotiationsMessage.text = "Negociações removidas com sucesso.";
        this._negotiationMessageView.update(this._negotiationsMessage.text);
    }

}