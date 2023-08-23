
// Obtenir l'élément modal
const modal = document.getElementById('galleryModal');

// Obtenir le contenu de l'élément modal
const modalContent = document.querySelector('.modal-content');

// Obtenir le boutton qui ouvre le modal
const editButton = document.getElementById('openModalBtn');

// Obtenir le bouton fermeture
const closeButton = document.querySelector('.close');

// Obtenir le boutton Ajout photo 
const addPhotoBtn = document.getElementById('addPhotoBtn');

// Obtenir le lien supprimer gallerie 
const deleteGalleryLinkContainer = document.querySelector('.delete-gallery-container');

// Ouverture du modal quand le bouton "Modifier" est clické
editButton.addEventListener('click', openModal);

// Femeture du modal quand le bouton fermeture est clické
closeButton.addEventListener('click', closeModal);

// Femeture du modal quand l'exterieur du modal est clické
window.addEventListener('click', outsideClick);

// Ouverture du modal
function openModal() {
  // Montrer le modal
  modal.style.display = 'block';

  // Appel de l'API Fetch works data and update the modal content
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      // Appelez une fonction pour gérer les données de travaux récupérées et affichez-les dans le modal
      displayWorksInModal(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fonction pour fermer le modal
function closeModal() {
  // Hide the modal
  modal.style.display = 'none';
}

// Fonction pour fermer le modal si cliqué en dehors du contenu modal
function outsideClick(e) {
  if (e.target === modal) {
    closeModal();
  }
}

function deleteGallery() {

    // Delete gallery non codé car sinon supprime tous les travaux, mais suffit de faire une boucle sur la fonction deleteWork()
    console.log('Supprimer la galerie clicked');

    fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
      works.forEach((work) => {
        deleteWork(work.id, false);
      });
    })

    // Effacez le modalImagesContainer pour supprimer tous les éléments d'image du modal
    const modalImagesContainer = document.getElementById('modalImages');
    modalImagesContainer.innerHTML = '';

    // Pour fermer le modal après avoir supprimé la galerie, vous pouvez appeler la fonction closeModal
    closeModal();

    // Appelez une fonction pour supprimer toutes les images de la galerie dans index2.html
    //deleteAllImagesInGallery();

    //alert("La galerie a bien été supprimée.");
}

// Fonction pour supprimer toutes les images de la galerie dans index2.html
function deleteAllImagesInGallery() {
  // Récupérer tous les conteneurs d'images dans la galerie
  const galleryImages = document.querySelectorAll('#project-gallery figure');

  // Supprimer chaque conteneur d'images de la galerie
  galleryImages.forEach(imageContainer => {
    imageContainer.remove();
  });
}

async function deleteWork(workId, displayAlert=true) {
    const myToken = getToken(); // Récupérer le token du stockage côté client

    try {
        // console.log("essai de suppression");
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${myToken}`,
            },
        });

        if (response.ok) {
            if(displayAlert){
              alert('Projet supprimé avec succès !');
            }
            // Optionally, you can also remove the deleted work from the UI
            const deletedWork = document.querySelector(`[data-image-id="${workId}"]`);
            if (deletedWork) {
                deletedWork.remove();
            }
        } else {
            alert("Une erreur s'est produite lors de la suppression de l'œuvre.");
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function addWorkInModal(modalImagesContainer, work){
  // Créer un nouvel élément d'image
  const imageElement = document.createElement('img');
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
  imageElement.classList.add('modal-image');
  imageElement.dataset.imageId = work.id; // Définir l'attribut data-image-id

  // Créez un élément div pour contenir l'image et supprimer l'icône
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');


  // Créer l'icône de suppression pour chaque image
  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/></svg>';

  // Ajoutez un écouteur d'événement de clic à l'icône de suppression pour supprimer l'image du modal
  deleteIcon.addEventListener('click', () => {
    // Supprimer le conteneur d'image du conteneur modalImages
    modalImagesContainer.removeChild(imageContainer);

    // Supprimez également l'image de la 'project-gallery' dans index2.html
    const projectGallery = document.getElementById('project-gallery');
    const imageIdToDelete = imageElement.dataset.imageId;
    const imageToDelete = projectGallery.querySelector(`[data-image-id="${imageIdToDelete}"]`);
    if (imageToDelete) {
        projectGallery.removeChild(imageToDelete);
    }

    // Envoyez également une requête API pour supprimer l'image
    deleteWork(imageIdToDelete);
  });

  // Ajouter l'image et l'icône de suppression au conteneur d'images
  imageContainer.appendChild(imageElement);
  imageContainer.appendChild(deleteIcon);

  // Ajouter le conteneur d'image au conteneur modalImages
  modalImagesContainer.appendChild(imageContainer);
}


function displayWorksInModal(works) {
    const modalImagesContainer = document.getElementById('modalImages');
    modalImagesContainer.innerHTML = '';
  
    // Parcourez les œuvres et créez des éléments d'image pour chaque œuvre
    works.forEach((work) => {
      addWorkInModal(modalImagesContainer, work);
    });
  
    // Ajouter le bouton "Ajouter une photo" et le bouton "Supprimer la galerie" au modal
    const addPhotoButton = document.getElementById('addPhotoBtn');
    addPhotoButton.addEventListener('click', () => {
      
      console.log('Ajouter une photo button clicked');
    });
  
    
    const deleteGalleryBtn = document.getElementById('deleteGalleryBtn');
    deleteGalleryBtn.addEventListener('click', () => {
      
      deleteGallery();
    });
  
  }
  
  
// -----------------------------------------------------------------------------------------------------------------

// Fonction pour récupérer les catégories de l'API et remplir le sélecteur déroulant
function fetchAndPopulateCategories() {
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
        const categorySelect = document.getElementById('categorySelect');
        
       //Effacer toutes les options existantes
        categorySelect.innerHTML = '';
  
        // Ajout des nouvelles options
        data.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



// Obtenir le bouton qui ouvre le formulaire modal
const openFormButton = document.getElementById('addPhotoBtn');

// Obtenir l'élément modal du formulaire
const formModal = document.getElementById('formModal');

// Obtenir le bouton de fermeture du formulaire modal
const closeFormButton = formModal.querySelector('.close');

// Event listener pour ouvrir le modal du formulaire lors du clic sur le bouton "Ajouter une photo"
openFormButton.addEventListener('click', () => { 
    openFormModal();
    fetchAndPopulateCategories();
});

// Écouteur d'événement pour fermer le formulaire modal lorsque le bouton de fermeture est cliqué
closeFormButton.addEventListener('click', closeFormModal);

// Écouteur d'événement pour fermer le formulaire modal si vous cliquez en dehors du contenu modal du formulaire
window.addEventListener('click', outsideFormClick);

// Fonction pour ouvrir le formulaire modal
function openFormModal() {
  formModal.style.display = 'block';
}

// Fonction pour fermer le formulaire modal
function closeFormModal() {
  formModal.style.display = 'none';
}

// Fonction pour fermer le formulaire modal si cliqué en dehors du contenu modal du formulaire
function outsideFormClick(e) {
  if (e.target === formModal) {
    closeFormModal();
  }
}

// Écouteur d'événement de soumission de formulaire
const addProjectForm = document.getElementById('addProjectForm');
addProjectForm.addEventListener('submit', handleFormSubmission);

// Fonction pour gérer la soumission de formulaire
function handleFormSubmission(event) {
  event.preventDefault();

  // Obtenir des entrées de formulaire
  const projectImage = document.getElementById('projectImage').files[0];
  const projectName = document.getElementById('projectName').value;
  const categorySelect = document.getElementById('categorySelect');
  const categoryId = categorySelect.value;

  closeFormModal();
}

const projectImage = document.getElementById('projectImage');
const projectImageDisplayed = document.getElementById('projectImage-img');
projectImage.onchange = evt => {
  const [file] = projectImage.files
  if (file) {
    projectImageDisplayed.src = URL.createObjectURL(file)
  }
}



// -------------------------------------------------------------------------------------------------------------------------------

function getToken() {
    return localStorage.getItem('accessToken'); 
  }

// Fonction pour gérer la soumission de formulaire
async function handleFormSubmit(event) {
    event.preventDefault(); 
    
    
    const projectName = document.getElementById('projectName').value;
    const imageInput = document.getElementById('projectImage');
    const imageFile = imageInput.files[0];
  
    if (!projectName || !imageFile) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    const categoryId = document.getElementById('categorySelect').value;
  
    const formData = new FormData();
    formData.append('title', projectName);
    formData.append('category', categoryId);
    formData.append('image', imageFile);
    
  
    try {
        const myToken = getToken(); // Récupérer le jeton du stockage côté client
        const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${myToken}`
          },
        body: formData
      });
  
      if (response.ok) {
        const project = await response.json();

        const modalImagesContainer = document.getElementById('modalImages');
        addWorkInModal(modalImagesContainer, project);

        addImageInGallery(project);

        document.getElementById('projectImage').value = '';
        document.getElementById("projectImage-img").src = "assets/images/AjouterPhoto.png";
        document.getElementById('addProjectForm').reset();
        alert('Projet ajouté avec succès !'); // Effacer le formulaire
        closeModal(); 
      } else {
        alert('Une erreur est survenue lors de l\'ajout du projet.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Joindre le gestionnaire de soumission de formulaire au formulaire
  
  addProjectForm.addEventListener('submit', handleFormSubmit);