import { LightningElement, api, wire } from 'lwc';
import fetchCurrencyRates from '@salesforce/apex/CurrencyConvertorController.fetchCurrencyRates';

export default class CurrencyConvertor extends LightningElement {
    amount = 0;
    sourceCurrency = '';
    targetCurrency = '';
    convertedAmount = '';

    currencyRates;
    error;

    @wire(fetchCurrencyRates)
    wiredRates({error, data}) {
        if(data) {
            this.currencyRates = data;
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.currencyRates = undefined;
        }
    }

    handleAmountChange(event){
        this.amount = event.target.value;
    }

    handleSourceCurrencyChange(event){
        this.sourceCurrency = event.target.value.toUpperCase();
    }

    handleTargetCurrencyChange(event){
        this.targetCurrency = event.target.value.toUpperCase();
    }

    convertCurrency(event){
        if(this.currencyRates && this.currencyRates[this.sourceCurrency] && this.currencyRates[this.targetCurrency]) {
            const sourceRate = this.currencyRates[this.sourceCurrency];
            const targetRate = this.currencyRates[this.targetCurrency];
            const baseAmount = this.amount / sourceRate;
            this.convertedAmount = baseAmount * targetRate;
        }
        else {
            this.convertedAmount = undefined;
        }
    }
}
