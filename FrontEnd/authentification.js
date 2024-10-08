function isLoggedIn() {
  let loggedIn
  const token = window.localStorage.getItem("token")
  if (token != null) {
      const arrayToken = token.split(".")
      try {
          const tokenPayload = JSON.parse(atob(arrayToken[1]))
          const expiration = new Date(tokenPayload.exp * 1000)
          loggedIn = expiration.getTime() > Date.now()
      } catch (e) {
          loggedIn = false
      }
  }
  document.querySelector(".connecter").innerText = loggedIn ? "logout" : "login"
  return loggedIn
}

//////Vérifie l'état connexion
document.addEventListener("DOMContentLoaded", function () {
  if (isLoggedIn()) {
      afficherEdition()
  }
  // bouton de connexion/déconnexion
  document.querySelector(".connecter").addEventListener("click", function (event) {
      if (isLoggedIn()) {
          window.localStorage.removeItem("token")
          window.location.replace("index.html")
      } else {
          window.location.replace("login.html")
      }
  })
})

function afficherEdition() {
  let bandeau = document.querySelector(".bandeau")
  bandeau.style.display = "flex"
  let edition = document.querySelector(".btnModifier")
  edition.style.display = "block"
  let categorie = document.querySelector(".categorie")
  categorie.style.display = "none"
}