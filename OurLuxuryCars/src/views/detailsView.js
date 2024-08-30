import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"
import { hasOwner } from "../util.js";


const temp = (car, owner) => html`
<!-- Details page -->

  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${car.imageUrl} alt="example1" />
      <p id="details-title">${car.model}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="price">Price: €${car.price}</p>
          <p class="weight">Weight: ${car.weight} kg</p>
          <p class="top-speed">Top Speed: ${car.speed} kph</p>
          <p id="car-description">
          ${car.about}
          </p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${owner ? html `
            <div id="action-buttons">
               <a href=/edit/${car._id} id="edit-btn">Edit</a>
               <a href="#" @click=${onDelete} data-id=${car._id} id="delete-btn">Delete</a>
            </div>` 
            : ""}
      </div>
    </div>
  </section>
`

export async function showDetailsView(ctx) {
    const id = ctx.params.id
    const car = await dataService.getCarById(id)
    const owner = hasOwner(car._ownerId)
    render(temp(car, owner))
}

async function onDelete(e) {
    e.preventDefault();
    const id = e.target.dataset.id
    const confirmRes = confirm('Are you sure to delete this car?');
    if (!confirmRes) {
        return;
    }

    dataService.deleteCar(id)
    page.redirect("/dashboard")
}