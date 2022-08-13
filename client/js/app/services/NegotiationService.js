class NegotiationsService {
    importWeeklyNegotiations(callback) {
        const xhr = new XMLHttpRequest();
        let negotiations = [];
        xhr.open("GET", "negociacoes/semana");
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    negotiations.push(...JSON.parse(xhr.responseText));
                    callback(null,negotiations.map(negotiation => new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor)));
                } 
            }
        }
    }
}