class NegotiationController {

    constructor () {
        this._negotiationDate = document.forms.negociacao.data;
        this._negotiationQuantity = document.forms.negociacao.quantidade;
        this._negotiationValue = document.forms.negociacao.valor;
        this._negotiationsViewElement = document.querySelector("#negotiationsView");
        this._negotiationMessageElement = document.querySelector("#mensagem");

        this._negotiationsView = new NegotiationsView(this._negotiationsViewElement);
        this._negotiationMessageView = new MessageView(this._negotiationMessageElement);
        
        this._negotiationsMessage = new Bind(
            new Message(),
            this._negotiationMessageView,
            ["text"]
        )
        
        this._negotiationList = new Bind(
            new NegotiationList(),
            this._negotiationsView,
            ["add","releaseNegotiations"],
        )
    }

    add(event) {
        event.preventDefault();
        
        const negotiation = this._createNegotiation();        
        this._negotiationList.add(negotiation);
        this._negotiationsMessage.text = "Negociação inserida com sucesso";
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
    }

    negotiationsImport() {
        const importNegotiationsService = new NegotiationsService();
        this._negotiationsView.update(this._negotiationList,true);

        Promise.all(
        [
            importNegotiationsService.importWeeklyNegotiations()
                .then((negotiations) => {              
                    negotiations.forEach(negotiationObject => this._negotiationList.add(negotiationObject));
                })
                .catch((error) => {
                    this._negotiationMessageView.text = error;
                }),
            importNegotiationsService.importWeeklyBeforeNegotiations()
                .then((negotiations) => {              
                negotiations.forEach(negotiationObject => this._negotiationList.add(negotiationObject));
            })
                .catch((error) => {
                    this._negotiationMessageView.text = error;
                }),
            importNegotiationsService.importWeekBelatedNegotiations()
                .then((negotiations) => {              
                negotiations.forEach(negotiationObject => this._negotiationList.add(negotiationObject));
            })
                .catch((error) => {
                    this._negotiationMessageView.text = error;
                })
        ]).then(() => {
            this._negotiationsMessage.text = "Negociações importadas com sucesso.";
        })
    }
}