import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"
import { createSubmitHandler } from "../util.js";


const temp = (handler, solution) => html`
<!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Edit Solution</h2>
      <form @submit=${handler} class="edit-form">
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Solution Type"
          .value=${solution.type}
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
          .value=${solution['image-url']}
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
          .value=${solution.description}
        ></textarea>
        <textarea
          id="more-info"
          name="more-info"
          placeholder="more Info"
          rows="2"
          cols="10"
          .value=${solution['more-info']}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`
let id = null;
export async function showEditView(ctx) {
    id = ctx.params.id
    const solution = await dataService.getSolutionById(id);
    render(temp(createSubmitHandler(onSubmit), solution))
}

async function onSubmit(data, form) {
    if (!data.type || !data['image-url'] || !data.description || !data['more-info']) {
        return alert('All fields are req!')
    }

    await dataService.updateSolution(id, data)
    page.redirect(`/details/${id}`)
}