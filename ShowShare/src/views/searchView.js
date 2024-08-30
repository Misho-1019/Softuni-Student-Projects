import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import * as dataService from "../data/data.js"


const temp = (handler, results) => html`

<!--BONUS Search page -->
<section id="search">

  <div class="form">
    <h2>Search</h2>
    <form @submit=${handler} class="search-form">
      <input
        type="text"
        name="search"
        id="search-input"
      />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4>Results:</h4>
    ${renderResult(results)}
    </section>
`

export function showSearchView() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.search) {
        return alert('Empty')
    }

    const result = await dataService.search(data.search)
    render(temp(createSubmitHandler(onSubmit), result))
}

function renderResult(result) {
    if(!result || result.length === 0){
        return html`<div class="show">
        <p class="no-result">There is no TV show with this title</p>
        </div>`
    }

    return result.map(show => {
        return html`<div class="show">
        <img src=${show.imageUrl} alt="example1" />
           <div class="show">
               <h3 class="title">${show.title}</h3>
               <p class="genre">Genre: ${show.genre}</p>
               <p class="country-of-origin">Country of Origin: ${show.country}</p>
               <a class="details-btn" href=/details/${show._id} >Details</a>
           </div>
           </div>`
    })
}