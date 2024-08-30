import { html, render } from "../lib.js";


const temp = () => html`
<!-- Home page -->
<section id="hero">
    <h1>
      Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
    </h1>
  </section>
`

export function showHomeView() {
    render(temp())
}