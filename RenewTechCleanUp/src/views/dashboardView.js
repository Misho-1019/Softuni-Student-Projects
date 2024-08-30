import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"

const temp = (solutions) => html`
<!-- Dashboard page -->
  <h2>Solutions</h2>

  <section id="solutions">

    <!-- Display a div with information about every post (if any)-->
    ${solutions.map(solution => solutionTemp(solution))}

    </section>
    <!-- Display an h2 if there are no posts -->
    ${solutions.length === 0 ? html`<h2 id="no-solution">No Solutions Added.</h2>` : ""}
  
`

const solutionTemp = (solution) => html`
<div class="solution">
      <img src=${solution.imageUrl} alt="example1" />
      <div class="solution-info">
        <h3 class="type">${solution.type}</h3>
        <p class="description">
          ${solution.description}
        </p>
        <a class="details-btn" href=/details/${solution._id} >Learn More</a>
      </div>
    </div>
`

export async function showDashboardView() {
    const solutions = await dataService.getAllSolutions();
    render(temp(solutions))    
}