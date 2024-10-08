import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"


const temp = (shows) => html`
<!-- Dashboard page -->
  <h2>Users Recommendations</h2>
  <section id="shows">
     ${shows.map(show => showTemp(show))}
  </section>
  <!-- Display an h2 if there are no posts -->
  ${shows.length === 0 ? html`<h2 id="no-show">No shows Added.</h2>` : ""}
`

const showTemp = (show) => html`
<div class="show">
      <img src=${show.imageUrl} alt="example1" />
      <div class="show-info">
        <h3 class="title">${show.title}</h3>
        <p class="genre">Genre: ${show.genre}</p>
        <p class="country-of-origin">Country of Origin: ${show.country}</p>
        <a class="details-btn" href=/details/${show._id} >Details</a>
      </div>
    </div>
`

export async function showDashboardView() {
    const shows = await dataService.getAllShows();
    render(temp(shows))
}