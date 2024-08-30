import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"
import { createSubmitHandler } from "../util.js";


const temp = (handler, show) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
  <div class="form">
    <h2>Edit Show</h2>
    <form @submit=${handler} class="edit-form">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="TV Show title"
        .value=${show.title}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${show['image-url']}
      />
      <input
      type="text"
      name="genre"
      id="genre"
      placeholder="Genre"
      .value=${show.genre}
    />
    <input
    type="text"
    name="country"
    id="country"
    placeholder="Country"
    .value=${show.country}
  />
      <textarea
        id="details"
        name="details"
        placeholder="Details"
        rows="2"
        cols="10"
        .value=${show.details}
      ></textarea>
      <button type="submit">Edit Show</button>
    </form>
  </div>
</section>
`
let id = null;
export async function showEditView(ctx) {
    id = ctx.params.id
    const show = await dataService.getShowById(id)
    render(temp(createSubmitHandler(onSubmit), show))
}

async function onSubmit(data, form) {
    if (!data.title || !data['image-url'] || !data.genre || !data.country || !data.details) {
        return alert('All fields are req')
    }

    await dataService.updateShow(id, data)
    page.redirect(`/details/${id}`)
}