class NegotiationsService {
    importWeeklyNegotiations() {
        return new Promise ((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            let negotiations = [];
            xhr.open("GET", "negociacoes/semana");
            xhr.send();
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        negotiations.push(...JSON.parse(xhr.responseText));
                        resolve(negotiations.map(negotiation => new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor)));
                    } else {
                        reject("Não foi possível carregar as negociações.");
                    }
                }
            }
        })
    }
}