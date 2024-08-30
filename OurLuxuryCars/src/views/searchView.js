import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import * as dataService from "../data/data.js"


const temp = (handler, results) => html`
 <!-- Search page -->
  <section id="search">
    <div class="form">
      <h4>Search</h4>
      <form @submit=${handler} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
      </form>
    </div>
    ${renderResults(results)}
  </section>
`

export function showSearchView() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.search) {
        return alert('Empty')
    }

    const result = await dataService.searchCar(data.search)
    render(temp(createSubmitHandler(onSubmit), result))
}

function renderResults(result) {
    if (!result || result.length === 0) {
        return html`<div class="search-result">
      <h2 class="no-avaliable">No result.</h2>
      </div>`
    }

    return result.map(car => {
        return html`<div class="search-result">
        <!--If there are matches display a div with information about every motorcycle-->
      <div class="car">
        <img src=${car.imageUrl} alt="example1"/>
        <h3 class="model">${car.model}</h3>
        <a class="details-btn" href=/details/${car._id} >More Info</a>
      </div>
      </div>`
    })
}