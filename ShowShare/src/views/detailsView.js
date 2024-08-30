import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"
import { hasOwner } from "../util.js";


const temp = (show, owner) => html`
 <!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${show.imageUrl} alt="example1" />
      <div id="details-text">
        <p id="details-title">${show.title}</p>
        <div id="info-wrapper">
          <div id="description">
            <p id="details-description">
              ${show.details}
            </p>
          </div>
        </div>
        <!--Edit and Delete are only for creator-->
          ${owner ? html`
               <div id="action-buttons">
                  <a href=/edit/${show._id} id="edit-btn">Edit</a>
                  <a href="#" @click=${onDelete} data-id=${show._id} id="delete-btn">Delete</a>
               </div>` 
        : ""}

      </div>
    </div>
  </section>
`

export async function showDetailsView(ctx) {
    const id = ctx.params.id
    const show = await dataService.getShowById(id)
    const owner = hasOwner(show._ownerId)
    render(temp(show, owner))
}

async function onDelete(e) {
    e.preventDefault();
    const id = e.target.dataset.id
    const confirmRes = confirm('Are you sure deleting this?');
    if (!confirmRes) {
        return
    }

    await dataService.deleteShow(id)
    page.redirect('/dashboard')
}