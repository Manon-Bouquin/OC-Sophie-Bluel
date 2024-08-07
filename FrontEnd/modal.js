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
    asideModal.appendChild(modalWrapper)
    //Bouton Fermer
    let modalEntete = document.createElement("div")
    modalEntete.classList.add("modal-header")
    modalWrapper.appendChild(modalEntete)
    let boutonFermer = createButton("btnFermer", "fa-solid fa-xmark")
    modalEntete.appendChild(boutonFermer)
    //Galerie
    let modalGalerie = document.createElement("div")
    modalGalerie.classList.add("modal-galerie")
    const titreModalGalerie = document.createElement("h3")
    titreModalGalerie.innerText = "Galerie photo"
    modalGalerie.appendChild(titreModalGalerie)
    //Projet
    let modalProjet = document.createElement("div")
    modalProjet.classList.add("modal-projet")
    modalGalerie.appendChild(modalProjet)
    modalWrapper.appendChild(modalGalerie)
    //Bouton ajout photo
    let modalPiedDePage = document.createElement("div")
    modalPiedDePage.classList.add("modal-piedDePage")
    modalWrapper.appendChild(modalPiedDePage)
    let boutonAjout = createButton("btnAjout")
    boutonAjout.innerText = "Ajouter une photo"
    modalPiedDePage.appendChild(boutonAjout)
}
//fonction pour appeler les projets
async function creationModalProjet() {
    const response = await fetch("http://localhost:5678/api/works")
    let projets = await response.json()
    let galerie = document.querySelector(".modal-projet")
    galerie.innerHTML = ""
    for (const projet of projets) {
        const projetElement = createModalElement(projet)
        galerie.appendChild(projetElement)
      }
}
function createModalElement (projet) {
    let projetElement = document.createElement("div")
    projetElement.classList.add("projet", "projet-modal" + projet.id)
    let imgElement = document.createElement("img")
    imgElement.classList.add("projet-img")
    let supprimer = document.createElement("button")
    supprimer.classList.add("projet-supprime")
    supprimer.setAttribute("id", "btn-suppr-" + projet.id )
    supprimer.addEventListener("click", supprimerElement)
    let icone = document.createElement("i")
    icone.classList.add("fa-solid", "fa-trash-can")
    icone.addEventListener("click", supprimerElement)
    supprimer.appendChild(icone)
    imgElement.src = projet.imageUrl
    imgElement.alt = projet.title 
    projetElement.appendChild(supprimer)
    projetElement.appendChild(imgElement)
    return projetElement
}

async function supprimerElement(e) {
    const id = e.target.getAttribute("id")
    if (window.confirm("Souhaitez-vous vraiment supprimer cet élément ?")) {
      const token = window.localStorage.getItem("token");
      const response = await fetch("http://localhost:5678/api/works/" + id, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
        method: "DELETE",
      });
      if (response.status === 200 || response.status === 204) {
        document.getElementById("projet-modal-" + id).remove();
      }
    }
  }


function ouvrirModal(e) {
    e.preventDefault()
    const modal = document.getElementById("modal1")
    modal.style.display = "flex"
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", fermerModal)
    modal.querySelector(".btnFermer").addEventListener("click", fermerModal)
    modal.querySelector(".modalStopPropagation").addEventListener("click", stopPropagation)
}
function fermerModal(e){
    e.preventDefault()
    const modal = document.getElementById("modal1")
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", fermerModal)
    modal.querySelector(".btnFermer").removeEventListener("click", fermerModal)
    modal.querySelector(".modalStopPropagation").removeEventListener("click", stopPropagation)

}
function stopPropagation(e) {
    e.stopPropagation()
}
function createButton(className, iconClass) {
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
    });
}