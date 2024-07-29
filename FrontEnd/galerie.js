async function afficherGalerie() {
  const reponse = await fetch('http://localhost:5678/api/works');
  const photos = await reponse.json();
  
  
  console.log(photos);

  for (let i = 0; i < photos.length; i++) {
    const article = photos[i]; 
    const galerie = document.querySelector(".galerie");
    const galerieElement = document.createElement ("article");
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;
    const nomElement = document.createElement("p");
    nomElement.innerText = article.title;

    galerie.appendChild(galerieElement);
    galerieElement.appendChild(imageElement);
    galerieElement.appendChild(nomElement);
    }
}
afficherGalerie();