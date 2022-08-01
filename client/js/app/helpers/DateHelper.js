class DateHelper {
    static convertDateStringToDate(dateString) {
        if(!/\d{4}-\d{2}-\d{2}/.test(dateString)) {
            throw new Error("Data precisa estar no formato yyyy-mm-dd");
        };
        
        const arrayNegotiationDate = dateString.split("-");
        return new Date(... arrayNegotiationDate.map((dateFragment, index) => {
            index === 1 && (dateFragment -= 1);
            return dateFragment.toString().padStart(2,"0");
        }));

    }

    static convertDateToString (date) {
        return `${date.getDate().toString().padStart(2,"0")}/${(date.getMonth()+1).toString().padStart(2,"0")}/${date.getFullYear()}`
    }
}