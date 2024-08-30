import { html, render, page} from "../lib.js";
import { createSubmitHandler } from "../util.js";
import * as dataService from "../data/data.js"


const temp = (handler) => html`
<!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Add Show</h2>
      <form @submit=${handler} class="create-form">
        <input
        type="text"
        name="title"
        id="title"
        placeholder="TV Show title"
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <input
      type="text"
      name="genre"
      id="genre"
      placeholder="Genre"
    />
    <input
    type="text"
    name="country"
    id="country"
    placeholder="Country"
  />
      <textarea
        id="details"
        name="details"
        placeholder="Details"
        rows="2"
        cols="10"
      ></textarea>
        <button type="submit">Add Show</button>
      </form>
    </div>
  </section>
`

export function showNewShow() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.title || !data['image-url'] || !data.genre || !data.country || !data.details) {
        return alert('All fields are req')
    }

    await dataService.createShow(data)
    page.redirect('/dashboard')
}