import { html, render, page } from "../lib.js";
import * as dataService from "../data/data.js"
import { getUserData, hasOwner } from "../util.js";
import { getLikesBySolutionId, likeSolution } from "../data/likes.js";


const temp = (solution, likes, hasUser, hasLiked, owner) => html`
<!-- Details page -->
  <section id="details">
    <div id="details-wrapper">
      <img
        id="details-img"
        src=${solution.imageUrl}
        alt="example1"
      />
      <div>
        <p id="details-type">${solution.type}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">
              ${solution.description}
            </p>
            <p id="more-info">
              ${solution.learnMore}
            </p>
          </div>
        </div>
        <h3>Like Solution:<span id="like">${likes}</span></h3>

        ${hasUser ? html`
            <div id="action-buttons">
            ${owner ? html`
            <!--Edit and Delete are only for creator-->
            <a href=/edit/${solution._id} id="edit-btn">Edit</a>
            <a href="#" @click=${onDelete} data-id=${solution._id} id="delete-btn">Delete</a>
            </div>` : ""}
            
            <!--Bonus - Only for logged-in users ( not authors )-->
            ${hasLiked ? "" : html`
            <a href="#" @click=${onLike} data-id=${solution._id} id="like-btn">Like</a>`}
            </div>
            ` : ""}
      </div>
    </div>
  </section>
`
let id = null;
export async function showDetailsView(ctx) {
    id = ctx.params.id

    const [solution, likesInfo] = await Promise.all([
        dataService.getSolutionById(id),
        getLikesBySolutionId(id)
    ]);

    const userData = getUserData();

    const owner = hasOwner(solution._ownerId)
    const hasLiked = likesInfo.hasLiked || owner;

    render(temp(solution, likesInfo.likes, Boolean(userData), hasLiked, owner))
}

async function onLike() {
    await likeSolution(id)

    page.redirect(`/details/${id}`)
}

async function onDelete(e) {
    e.preventDefault();
    const id = e.target.dataset.id
    const confirmRes = confirm('Do you want to delete this solution?')

    if (!confirmRes) {
        return
    }

    await dataService.deleteSolution(id)
    page.redirect('/dashboard')
}