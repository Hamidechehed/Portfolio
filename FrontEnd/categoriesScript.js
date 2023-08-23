// Récuperation des categories depuis l'API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    // Appel d'une fonction pour gérer les catégories récupérées
    handleCategories(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Fonction pour gérer les catégories récupérées
function handleCategories(categories) {
  // Récuperation du div contenant les boutons filtres
  const filterButtonsContainer = document.getElementById('filter-buttons');

  // Boucle sur toutes les catégories et creation des boutons filtres
  categories.forEach(category => {
    // Creation d'un element bouton pour la categorie
    const button = document.createElement('button');
    button.textContent = category.name;
    button.classList.add('filter-button');

    // Ajout d'un 'event listener' détectant les clicks sur le bouton
    button.addEventListener('click', () => {
      handleFilter(category.id);
      button.classList.toggle('active');
    });

    // Ajout du bouton dans le div des boutons filtres
    filterButtonsContainer.appendChild(button);
  });
}


function handleFilter(categoryId) {
  // Récuperation de tous les boutons filtres
  const filterButtons = document.querySelectorAll('.filter-button');

  // Basculer l'état actif des boutons
  filterButtons.forEach(button => {
    if (button.dataset.categoryId === categoryId) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  // Obtenir toutes les images des projet
  const projectImages = document.querySelectorAll('.gallery figure');

  // Parcourez chaque image de projet et afficher/masquer en fonction de la catégorie
  projectImages.forEach(image => {
    const imageCategoryId = parseInt(image.dataset.categoryId);

    if (categoryId === 0 || imageCategoryId === categoryId) {
      image.style.display = 'block'; // afficher image
    } else {
      image.style.display = 'none'; // masquer image
    }
  });
}


// Obtenir le bouton "Supp filtres"
const removeFiltersButton = document.getElementById('remove-filters-button');

// Ajouter un "event listener " pour un clic sur un bouton
removeFiltersButton.addEventListener('click', removeFilters);

// Fonction pour supprimer les filtres
function removeFilters() {
    // Supprimer la classe "active" de tous les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });

    const removeFiltersButton = document.getElementById('remove-filters-button');
    removeFiltersButton.classList.add('active');

    // Afficher toutes les images du projet
    const projectImages = document.querySelectorAll('.gallery figure');
    projectImages.forEach(image => {
        image.style.display = 'block'; // Mets en block (photos affichées) toutes les photos 
    });
}

