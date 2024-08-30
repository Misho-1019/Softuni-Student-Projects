
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";
import * as dataService from "../data/data.js"



const temp = (handler) => html`
<!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form form-auto">
      <h2>Share Your Car</h2>
      <form @submit=${handler} class="create-form">
        <input type="text" name="model" id="model" placeholder="Model"/>
        <input
          type="text"
          name="imageUrl"
          id="car-image"
          placeholder="Your Car Image URL"
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
        />
        <input
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight in Kg"
        />
        <input
          type="text"
          name="speed"
          id="speed"
          placeholder="Top Speed in Kmh"
        />
        <textarea
          id="about"
          name="about"
          placeholder="More About The Car"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`

export function showNewCarView() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.about || !data.imageUrl || !data.model || !data.price || !data.speed || !data.weight) {
        return alert('All fields are req')
    }

    await dataService.createCar(data)
    page.redirect('/dashboard')
}