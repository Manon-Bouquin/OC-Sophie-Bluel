//Récupération API
async function fetchProjets() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
};

// Fonction afficher projets
function afficherGalerie(projets) {
  const galerie = document.querySelector(".galerie");
  galerie.innerHTML = "";
  projets.forEach(projet => {
    const articleElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    imageElement.alt = projet.title;
    const nomElement = document.createElement("h3");
    nomElement.innerText = projet.title;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = projet.category;
    articleElement.classList.add("projet");
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nomElement);
    articleElement.appendChild(categorieElement);

    galerie.appendChild(articleElement);
  });
}


  document.addEventListener("DOMContentLoaded", async () => {
    const btnCategories = document.querySelector(".categorie");
    const categories = [
      { id: 0, name: "Tous" },
      { id: 1, name: "Objets" },
      { id: 2, name: "Appartements" },
      { id: 3, name: "Hotels & Restaurants" }
    ];

    
  // Fonction pour filtrer et afficher les projets
  function filtrerGalerie(projets, categoryId) {
    const projetsFiltrees = categoryId === 0 ? projets : projets.filter(projet => projet.categoryId === categoryId);
    afficherGalerie(projetsFiltrees);
  }

  // BOUTONS
  const projets = await fetchProjets();
  categories.forEach(category => {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.textContent = category.name;
    bouton.addEventListener("click", () => {
      console.log(`Le bouton ${category.name} a été cliqué !`);
      filtrerGalerie(projets, category.id);
    });
    btnCategories.appendChild(bouton);
  });

  
  afficherGalerie(projets);
});


