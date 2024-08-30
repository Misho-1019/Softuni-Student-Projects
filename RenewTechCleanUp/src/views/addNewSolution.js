import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import * as dataService from "../data/data.js"


const temp = (handler) => html`
<!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Add Solution</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Solution Type"
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
        ></textarea>
        <textarea
          id="more-info"
          name="more-info"
          placeholder="more Info"
          rows="2"
          cols="10"
        ></textarea>
        <button type="submit">Add Solution</button>
      </form>
    </div>
  </section>
`

export function showNewSolution() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.type || !data['image-url'] || !data.description || !data['more-info']) {
        return alert('All fields are req!')
    }

    await dataService.createSolution(data);
    page.redirect('/dashboard')
}