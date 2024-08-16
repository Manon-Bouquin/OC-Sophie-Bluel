document.addEventListener("DOMContentLoaded", () => {
  creationModal()
  creationModalProjet()
  initializeModalEventListeners()
})

function creationModal () {
  let asideModal = document.getElementById("modal1")
  //modal wrapper
  let modalWrapper = document.createElement("div")
  modalWrapper.classList.add("modal-wrapper", "modalStopPropagation")
  modalWrapper.setAttribute("id", "Galerie-photo")
  asideModal.appendChild(modalWrapper)
  //boutons
  let bouton = document.createElement("div")
  bouton.classList.add("boutons")
  modalWrapper.appendChild(bouton)
  //bouton retour
  let boutonRetour = creationBouton("btnRetour", "fa-solid fa-arrow-left")
  boutonRetour.addEventListener("click", () => modalAfficher('galerie'))
  bouton.appendChild(boutonRetour)
  //Bouton Fermer
  let boutonFermer = creationBouton("btnFermer", "fa-solid fa-xmark")
  bouton.appendChild(boutonFermer)
  //Galerie
  let modalGalerie = document.createElement("div")
  modalGalerie.classList.add("modal-galerie")
  const titreModalGalerie = document.createElement("h3")
  titreModalGalerie.innerText = "Galerie photo"
  modalGalerie.appendChild(titreModalGalerie)
  modalWrapper.appendChild(modalGalerie)
  //Projet
  let modalProjet = document.createElement("div")
  modalProjet.classList.add("modal-projet")
  modalGalerie.appendChild(modalProjet)
  //Bouton ajouter photo
  let boutonAjout = creationBouton("btnAjout")
  boutonAjout.innerText = "Ajouter une photo"
  boutonAjout.addEventListener("click", () => modalAfficher ('ajouter'))
  modalGalerie.appendChild(boutonAjout)
  //Ajout photo
  let modalAjouter = document.createElement("div")
  modalAjouter.classList.add("modal-ajouter")
  const titreModalAjout = document.createElement("h3")
  titreModalAjout.innerText = "Ajout photo"
  modalAjouter.appendChild(titreModalAjout)
  modalWrapper.appendChild(modalAjouter)
  //Zone à valider pour l'ajout
  let zoneValider = document.createElement("div")
  zoneValider.classList.add("zoneValider")
  modalAjouter.appendChild(zoneValider)
  //Input ajout photo
  let zoneAjouterPhoto = document.createElement("div")
  zoneAjouterPhoto.classList.add("zoneAjouterPhoto")
  zoneValider.appendChild(zoneAjouterPhoto)
  //icone
  let iconeImage = document.createElement("i")
  iconeImage.classList.add("fa-regular", "fa-image")
  zoneAjouterPhoto.appendChild(iconeImage)
  //Bouton +ajout photo
  let btnAjouterPhoto = document.createElement("button")
  btnAjouterPhoto.classList.add("btnAjouterPhoto")
  btnAjouterPhoto.textContent = "+ Ajouter photo"
  btnAjouterPhoto.addEventListener("click", () => {
    const inputAjouter = document.createElement("input")
    inputAjouter.type = "file"
    inputAjouter.accept = "image/*"
    inputAjouter.style.display = "none"
    inputAjouter.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const image = document.createElement("img")
        image.src = URL.createObjectURL(file)
        image.classList.add("visible")
        zoneAjouterPhoto.querySelectorAll(".fa-regular, p, .btnAjouterPhoto").forEach(element => element.classList.add("cacher"))
        zoneAjouterPhoto.appendChild(image)
        verifierChamps()
      }
    })
    zoneAjouterPhoto.appendChild(inputAjouter)
    inputAjouter.click()
  })
  zoneAjouterPhoto.appendChild(btnAjouterPhoto)
  let tailleImg = document.createElement("p")
  tailleImg.innerText = "jpg, png : 4mo max"
  zoneAjouterPhoto.appendChild(tailleImg)
  //Formulaire
  let formulaireDajout = document.createElement("div")
  formulaireDajout.classList.add("formulaireDajout")
  zoneValider.appendChild(formulaireDajout)
  let formAjout = document.createElement("form")
  formAjout.method = "get"
  formulaireDajout.appendChild(formAjout)
  let formElement = document.createElement("p")
  formAjout.appendChild(formElement)
  //Champ titre
  let formElementTitreLabel = document.createElement("label")
  formElementTitreLabel.for = "titre"
  formElementTitreLabel.innerText = "Titre"
  formElement.appendChild(formElementTitreLabel)
  let formElementTitreInput = document.createElement("input")
  formElementTitreInput.type = "text"
  formElementTitreInput.title = "titre"
  formElementTitreInput.id = "titre"
  formElement.appendChild(formElementTitreInput)
  //champ catégorie
  let formElementCategorie = document.createElement ("label")
  formElementCategorie.for = "categorie"
  formElementCategorie.innerText = "Catégorie"
  formAjout.appendChild(formElementCategorie)
  let formElementCatSelect = document.createElement ("select")
  formElementCatSelect.name = "categorie"
  formElementCatSelect.id = "categorie"
  formAjout.appendChild(formElementCatSelect)
  //Ecouteurs d'evenements pour les champs
  formElementTitreInput.addEventListener("input", verifierChamps)
  formElementCatSelect.addEventListener("change", verifierChamps)
  //Bouton Valider
  let boutonValider = creationBouton("btnValider")
  boutonValider.innerText = "Valider"
  boutonValider.disabled = true //Désactive par défaut le btn
  boutonValider.addEventListener("click", ajouterPhoto)
  modalAjouter.appendChild(boutonValider)
  modalAfficher()
  formCategorie(formElementCatSelect)
}

//////fonction pour appeler les projets
async function creationModalProjet() {
  const response = await fetch("http://localhost:5678/api/works")
  let projets = await response.json()
  let galerie = document.querySelector(".modal-projet")
  galerie.innerHTML = ""
  for (const projet of projets) {
      const projetElement = creationModalElement(projet)
      galerie.appendChild(projetElement)
    }
}

//////fonction pour récupérer les catégories
async function formCategorie(formElementCatSelect) {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
      categories = data
      categories.forEach(categorie => {
        const option = document.createElement("option")
        option.value = categorie.id
        option.innerText = categorie.name
        formElementCatSelect.appendChild(option)
      })
    })
}

/////Fonction pour afficher soit galerie soit ajout
function modalAfficher (afficher) {
  const galerie = document.querySelector(".modal-galerie")
  const ajouter = document.querySelector(".modal-ajouter")
  const boutonRetour = document.querySelector(".btnRetour")
  if (afficher === "galerie") {
    galerie.style.display = "block"
    ajouter.style.display = "none"
    boutonRetour.classList.add("cacher")
  } else if (afficher === "ajouter") {
    galerie.style.display = "none"
    ajouter.style.display = "block"
    boutonRetour.classList.remove("cacher")
  }
}

//////Fonction pour afficher les projets de galerie
function creationModalElement (projet) {
  let projetElement = document.createElement("div");
  projetElement.classList.add("projet");
  projetElement.setAttribute("id", "projet-modal-" + projet.id);
  let imgElement = document.createElement("img")
  imgElement.classList.add("projet-img")
  //Ajout de l'icone/bouton supprimer
  let supprimer = document.createElement("button")
  supprimer.classList.add("projet-supprime")
  supprimer.setAttribute("id", projet.id )
  supprimer.addEventListener("click", supprimerElement)
  let icone = document.createElement("i")
  icone.classList.add("fa-solid", "fa-trash-can")
  supprimer.appendChild(icone)
  imgElement.src = projet.imageUrl
  imgElement.alt = projet.title 
  projetElement.appendChild(supprimer)
  projetElement.appendChild(imgElement)
  return projetElement
}

////Fonction ajouter un projet/photo
async function ajouterPhoto() {
  const titre = document.getElementById("titre").value.trim()
  const categorieId = document.getElementById("categorie").value
  const fichierInput = document.querySelector("input[type='file']")
  const fichier = fichierInput.files[0]
  const formData = new FormData()
  formData.append("title", titre)
  formData.append("category", categorieId)
  formData.append("image", fichier)
  const token = window.localStorage.getItem("token")
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: formData
  })
  if (response.ok) {
    const nouveauProjet = await response.json()
    document.querySelector(".zoneAjouterPhoto").innerHTML = ""
    document.getElementById("titre").value = ""
    document.getElementById("categorie").value = ""
    //Ajouter le projet ds la galerie
    const projetElement = creationModalElement(nouveauProjet)
    const galerie = document.querySelector(".modal-projet")
    galerie.appendChild(projetElement)
    const principalGalerie = document.querySelector(".galerie")
    const projetElement2 = ajoutGalerieElement(nouveauProjet)
    principalGalerie.appendChild(projetElement2)
    modalAfficher("galerie")
  }
}

////fonction de vérification des champs du formulaire
function verifierChamps() {
  const titre = document.getElementById("titre").value.trim()
  const categorie = document.getElementById("categorie").value
  const fichierInput = document.querySelector("input[type='file']")
  const btnValider = document.querySelector(".btnValider")
  if (titre !== "" && categorie !== "" && fichierInput && fichierInput.files.length > 0) {
    btnValider.disabled = false
  }
}

////Foncton permettant d'afficher le nouveau projet dans la galerie sans rafraîchissement
function ajoutGalerieElement(projet) {
  let projetElement = document.createElement("article")
  projetElement.classList.add("projet")
  projetElement.setAttribute("id", "projetGalerie - " + projet.id)
  let imgElement = document.createElement("img")
  imgElement.classList.add("projet-img")
  imgElement.src = projet.imageUrl
  imgElement.alt = projet.title
  const nomElement = document.createElement("h3")
  nomElement.innerText = projet.title
  projetElement.appendChild(imgElement)
  projetElement.appendChild(nomElement)
  return projetElement
}

///Fonction suppr/ouvrir/fermer
async function supprimerElement(e) {
  const id = e.currentTarget.getAttribute("id")
  if (window.confirm("Souhaitez-vous supprimer ce projet ?")) {
    const token = window.localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works/" + id, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    });
    if (response.ok) {
      const projetElement = document.getElementById("projet-modal-" + id)
      if(projetElement){
        projetElement.remove()
      } 
      //Suppression des éléments du DOM sans recharger la page
      const projetElementGalerie = document.getElementById("projetGalerie - " + id)
      if(projetElementGalerie){
        projetElementGalerie.remove()
      }
    }
    
  }
}

function ouvrirModal() {
  const modal = document.getElementById("modal1")
  modal.style.display = "flex"
  modal.removeAttribute("aria-hidden")
  modal.setAttribute("aria-modal", "true")
  modal.addEventListener("click", fermerModal)
  modal.querySelector(".btnFermer").addEventListener("click", fermerModal)
  modal.querySelector(".modalStopPropagation").addEventListener("click", stopPropagation)
  modalAfficher('galerie')
  
}

function fermerModal(e){
  e.preventDefault()
  const modal = document.getElementById("modal1")
  //1/2s de la fermeture de la modale, pour pouvoir mettre une animation de clôture
  window.setTimeout(function () {
    modal.style.display = "none"
  }, 500)
  modal.setAttribute("aria-hidden", "true")
  modal.removeAttribute("aria-modal")
  modal.removeEventListener("click", fermerModal)
  modal.querySelector(".btnFermer").removeEventListener("click", fermerModal)
  modal.querySelector(".modalStopPropagation").removeEventListener("click", stopPropagation)

}

function stopPropagation(e) {
  e.stopPropagation()
}

function creationBouton(className, iconClass) {
  let button = document.createElement("button")
  button.classList.add(className)
  let icon = document.createElement("i")
  icon.className = iconClass
  button.appendChild(icon)
  return button
}

function initializeModalEventListeners() {
  document.querySelectorAll(".modifier").forEach(a => {
      a.addEventListener("click", ouvrirModal)
  })
}