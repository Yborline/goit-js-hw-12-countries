const BASE_URL = 'https://restcountries.com/v2';


export default class NewfetchCantry {
    contructor() {
        this.searchQueary = ''

    }
    fetchCauntries() {

const url = `${BASE_URL}/name/${this.searchQueary}`;
      return  fetch(url)
        .then(r => {
            return r.json();
        })
    }


    get query() {
        return this.searchQueary;
    }
    set query (newQueary) {
this.searchQueary = newQueary
    }
}