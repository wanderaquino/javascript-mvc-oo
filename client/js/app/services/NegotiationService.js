class NegotiationsService {
    constructor() {
        this.http = new HttpService();
    }

    importWeeklyNegotiations() {
        return new Promise ((resolve, reject) => {
            this.http
                .get("negociacoes/semana")
                .then((negotiations) => {
                    resolve(negotiations.map(negotiation => new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor)));
                })
                .catch(() => {
                    reject("Não foi possível carregar as negociações da semana.");
                });
        })
    }
    importWeeklyBeforeNegotiations() {
        return new Promise ((resolve, reject) => {
            this.http
                .get("negociacoes/anterior")
                .then((negotiations) => {
                    resolve(negotiations.map(negotiation => new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor)));
                })
                .catch(() => {
                    reject("Não foi possível carregar as negociações da semana anterior.");
                });
        })
    }
    importWeekBelatedNegotiations() {
        return new Promise ((resolve, reject) => {
            this.http
                .get("negociacoes/retrasada")
                .then((negotiations) => {
                    resolve(negotiations.map(negotiation => new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor)));
                })
                .catch(() => {
                    reject("Não foi possível carregar as negociações da semana retrasada.");
                });
        })
    }
}