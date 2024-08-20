const logInForm = document.getElementById("form-connexion")
logInForm.addEventListener ("submit", (event) => {
    event.preventDefault()
    const email = document.getElementById("email").value.trim() //Recup valeur entrées par l'utilisateur
    const password = document.getElementById("pass").value.trim()
    const logInElement = {
        email: email,
        password: password,
    }
    logIn(logInElement)
})

async function logIn(logInElement) {
    const chargeUtile = JSON.stringify(logInElement)
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: chargeUtile
    })

    if (reponse.ok) {
        const data = await reponse.json();
        window.localStorage.setItem("token", data.token)
        window.location.replace("index.html")
    }else {
        afficherErreur(reponse)
    }
}

function afficherErreur (reponse) {
    let errorMessage
   switch (reponse.status) {
    case 401: 
    case 404:
        errorMessage = "L'email ou le mot de passe n'est pas correct."
        break
   }
   let popupErreur = document.querySelector(".connexion-erreur")
   popupErreur.textContent = errorMessage
   popupErreur.classList.add("active")
}
