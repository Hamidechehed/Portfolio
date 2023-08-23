// Récupération des projets depuis l'API
fetch('http://localhost:5678/api/works')
.then(response => response.json())
    .then(data => {
        // Appeler une fonction pour gérer les projets récupérés
        handleProjects(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function addImageInGallery(project){
    // Obtenir le conteneur de la galerie de projets
    const projectGallery = document.getElementById('project-gallery');
    // Création d'un élément figure pour le projet
    const figure = document.createElement('figure');

    // Création d'un élément d'image et définir la source à partir des données du projet
    const image = document.createElement('img');
    image.src = project.imageUrl;
    image.alt = project.title;
    

    // Créez un élément figcaption et définissez le contenu du texte à partir des données du projet
    const figcaption = document.createElement('figcaption');
    figcaption.setAttribute('id', 'my-figcaption');

    figcaption.textContent = project.title;

    // Définissez l'attribut data-category-id sur le categoryId du projet
    figure.dataset.categoryId = project.categoryId;
    figure.dataset.imageId = project.id;


    // Ajouter l'image et la légende à la figure
    figure.appendChild(image);
    figure.appendChild(figcaption);

    // Ajouter la figure à la galerie de projets
    projectGallery.appendChild(figure);
}

// Fonction de gestion des projets récupérés
function handleProjects(projects) {

    // Parcourez chaque projet et créez des éléments HTML pour afficher les images du projet
    projects.forEach(project => {
        addImageInGallery(project);
    });
}