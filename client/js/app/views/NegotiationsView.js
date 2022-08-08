class NegotiationsView extends View {
    constructor (targetElement) {
        super(targetElement);
        this._element = targetElement;
    }

    template(negotiationModel) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
            ${
                negotiationModel.negotiations.map(negotiation => `
                    <tr>
                        <td>${DateHelper.convertDateToString(negotiation.date)}</td>
                        <td>${negotiation.quantity}</td>
                        <td>${negotiation.value}</td>
                        <td>${negotiation.volume}</td>
                    </tr>
                `).join('')
            }
            </tbody>
            
            <tfoot>
                <td colspan="3">TOTAL</td>
                <td>${
                    negotiationModel.totalNumberOfNegotiations
                }</td>
            </tfoot>
        </table>`
    }

    update(negotiationModel) {
        this._element.innerHTML = this.template(negotiationModel);
    }
}