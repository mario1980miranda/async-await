// currency code from/to, amount to convert
// USD, CAD

// http://data.fixer.io/api/latest?access_key=cf3c2b4404b0146cbd52fae751e21d49
// https://restcountries.eu/rest/v2/currency/BRL

const axios = require('axios');

// *************************** usual method with promise **************************************
// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=cf3c2b4404b0146cbd52fae751e21d49').then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// };

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it the following countries: ${countries.join(', ')}`;
//     });
// };

// *********************************** using async/await **************************************
const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=cf3c2b4404b0146cbd52fae751e21d49');
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        
        if (isNaN(rate)) {
            throw new Error(`Unable to get exchange rate for ${from} ${to}`);
        }
        
        return rate;
    } catch (error) {
        throw new Error(`Unable to get exchange rate for ${from} ${to}`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currentCode}`);
    }
};

const convertCurrency = async (from, to, amount) => {
    try {
        
    } catch (error) {
        
    }
    const rate = await getExchangeRate(from, to)
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it the following countries: ${countries.join(', ')}`;
};

// getExchangeRate('USD', 'BRL').then((rate) => {
//     console.log(rate);
// });

// getCountries('USD').then((countries) => {
//     console.log(countries);
// });

convertCurrency('BRL', 'CAD', 1).then((message) => {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});