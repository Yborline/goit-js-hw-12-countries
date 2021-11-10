import cardCountry from '../templates/cauntry-card.hbs'
import listCountry from '../templates/cauntry-list.hbs'

import NewfetchCantry from '../fe3tch'


// import { alert, defaultModules } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';


import debounce from 'lodash.debounce';
defaultModules.set(PNotifyMobile, {});
 
const newfetchCantry = new NewfetchCantry();



const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    inputCard: document.querySelector('.input-card')
}

refs.inputCard.addEventListener(`input`, debounce(onSearch, 500))

function clearCountriesContainer() {
  refs.cardContainer.textContent = '';
}

function deleteAlertContainer() {
  const alertContainersRefs = document.getElementsByClassName('pnotify');
  if (alertContainersRefs.length) {
    alertContainersRefs[0].remove();
  }
}


function createMarkupCard(country) {
            const murkup = cardCountry(country);
        refs.cardContainer.insertAdjacentHTML('beforeend', murkup);
}

function createMarkupList(cauntries) {
    const murkup = listCountry(cauntries);
     refs.cardContainer.insertAdjacentHTML('beforeend', murkup);
}

function onSearch(e) {

    const query = e.target.value;
    
    
    newfetchCantry.query = query

if (!query) return deleteAlertContainer()

     clearCountriesContainer();
    

    newfetchCantry.fetchCauntries().then(r => {
        console.log(r)
                if (!r.length) return alert({ text: 'No results found' });
            console.log(r)
            if (r.length - 1 > 10) {
return alert({
        text: 'Too many marches found. Please enter a more specific query',
      });
        }
            deleteAlertContainer();

            if (r.length >= 2 && r.length <= 10) {
      return createMarkupList(r);
    }

    if (r.length <= 1) {
        createMarkupCard(r);
            }
  });
        
   

}


function errorCard() {
    PNotify.error({
        title: 'Oh No!',
        text: 'Something terrible happened.'
    });
}



function onFetchError(error) {
    alert('Что-то пошло не так , попробуй другое название!');
}







