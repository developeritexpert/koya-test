
export const utilPrice = {
    formatMoney: (amount) => {
        let formatted = (amount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumSignificantDigits: 3
        }); 
        return formatted;
    }
}