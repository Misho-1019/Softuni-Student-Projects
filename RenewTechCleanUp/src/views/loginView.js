import { html, render, page } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";
import * as userService from "../data/user.js"


const temp = (handler) => html`
<!-- Login Page (Only for Guest users) -->
  <section id="login">
    <div class="form">
      <img class="border" src="./images/border.png" alt="" />
      <h2>Login</h2>
      <form @submit=${handler} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`

export function showLoginView() {
    render(temp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
    if (!data.email || !data.password) {
        return alert('All fields are req!')
    }

    await userService.login(data.email, data.password)
    updateNav()
    page.redirect('/')
}