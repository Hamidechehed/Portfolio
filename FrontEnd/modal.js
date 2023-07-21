// // // JavaScript for the modal

// Get the modal element
const modal = document.getElementById('galleryModal');

// Get the modal content element
const modalContent = document.querySelector('.modal-content');

// Get the button that opens the modal
const editButton = document.getElementById('openModalBtn');

// Get the close button for the modal
const closeButton = document.querySelector('.close');

// Get the add photo button inside the modal
const addPhotoBtn = document.getElementById('addPhotoBtn');

// Get the delete gallery link inside the modal
const deleteGalleryLinkContainer = document.querySelector('.delete-gallery-container');

// Event listener to open the modal when the "Modifier" button is clicked
editButton.addEventListener('click', openModal);

// Event listener to close the modal when the close button is clicked
closeButton.addEventListener('click', closeModal);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener('click', outsideClick);

// Function to open the modal
function openModal() {
  // Show the modal
  modal.style.display = 'block';

  // Fetch works data and update the modal content
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      // Call a function to handle the retrieved works data and display them in the modal
      displayWorksInModal(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to close the modal
function closeModal() {
  // Hide the modal
  modal.style.display = 'none';
}

// Function to close the modal if clicked outside the modal content
function outsideClick(e) {
  if (e.target === modal) {
    closeModal();
  }
}

function deleteGallery() {
    // Add your logic here to handle deleting the entire gallery
    // For example, you can show a confirmation dialog and then delete all images
    console.log('Supprimer la galerie clicked');

    // Clear the modalImagesContainer to remove all image elements from the modal
    const modalImagesContainer = document.getElementById('modalImages');
    modalImagesContainer.innerHTML = '';

    // To close the modal after deleting the gallery, you can call the closeModal function
    closeModal();

    // Call a function to delete all images from the gallery in index2.html
    deleteAllImagesInGallery();
}

// Function to delete all images from the gallery in index2.html
function deleteAllImagesInGallery() {
  // Fetch all the image containers in the gallery
  const galleryImages = document.querySelectorAll('#project-gallery figure');

  // Remove each image container from the gallery
  galleryImages.forEach(imageContainer => {
    imageContainer.remove();
  });
}

function displayWorksInModal(works) {
    const modalImagesContainer = document.getElementById('modalImages');
    modalImagesContainer.innerHTML = '';
  
    // Loop through the works and create image elements for each work
    works.forEach((work) => {
      // Create a new image element
      const imageElement = document.createElement('img');
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
      imageElement.classList.add('modal-image');
      imageElement.dataset.imageId = work.id; // Set the data-image-id attribute
  
      // Create a div element to hold the image and delete icon
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

  
      // Create the delete icon for each image
      const deleteIcon = document.createElement('span');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.innerHTML = '&times;';
  
      // Add a click event listener to the delete icon to remove the image from the modal
      deleteIcon.addEventListener('click', () => {
        // Remove the image container from the modalImages container
        modalImagesContainer.removeChild(imageContainer);

        // Also remove the image from the 'project-gallery' in index2.html
        const projectGallery = document.getElementById('project-gallery');
        const imageIdToDelete = imageElement.dataset.imageId;
        const imageToDelete = projectGallery.querySelector(`[data-image-id="${imageIdToDelete}"]`);
        if (imageToDelete) {
            projectGallery.removeChild(imageToDelete);
        }

      });
  
      // Append the image and delete icon to the image container
      imageContainer.appendChild(imageElement);
      imageContainer.appendChild(deleteIcon);
  
      // Append the image container to the modalImages container
      modalImagesContainer.appendChild(imageContainer);
    });
  
    // Add the "Ajouter une photo" button and "Supprimer la galerie" button to the modal
    const addPhotoButton = document.getElementById('addPhotoBtn');
    addPhotoButton.addEventListener('click', () => {
      // Add your logic here to handle adding a new photo
      // For example, you can open a form in the modal to add a new photo
      console.log('Ajouter une photo button clicked');
    });
  
    // Add the "Supprimer la galerie" button to the modal
    const deleteGalleryBtn = document.getElementById('deleteGalleryBtn');
    deleteGalleryBtn.addEventListener('click', () => {
      // Call a function to handle deleting the entire gallery
      deleteGallery();
    });
  
  }
  
  
// -----------------------------------------------------------------------------------------------------------------

// Function to fetch categories from the API and populate the drop-down selector
function fetchAndPopulateCategories() {
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
        const categorySelect = document.getElementById('categorySelect');
        
        // Clear any existing options
        categorySelect.innerHTML = '';
  
        // Add the new options
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

// modal.js

// ... (previously defined functions)

// Get the button that opens the form modal
const openFormButton = document.getElementById('addPhotoBtn');

// Get the form modal element
const formModal = document.getElementById('formModal');

// Get the close button for the form modal
const closeFormButton = formModal.querySelector('.close');

// Event listener to open the form modal when the "Ajouter un projet" button is clicked
openFormButton.addEventListener('click', () => { 
    openFormModal();
    fetchAndPopulateCategories();
});

// Event listener to close the form modal when the close button is clicked
closeFormButton.addEventListener('click', closeFormModal);

// Event listener to close the form modal if clicked outside the form modal content
window.addEventListener('click', outsideFormClick);

// Function to open the form modal
function openFormModal() {
  // Show the form modal
  formModal.style.display = 'block';
}

// Function to close the form modal
function closeFormModal() {
  // Hide the form modal
  formModal.style.display = 'none';
}

// Function to close the form modal if clicked outside the form modal content
function outsideFormClick(e) {
  if (e.target === formModal) {
    closeFormModal();
  }
}

// Form submission event listener
const addProjectForm = document.getElementById('addProjectForm');
addProjectForm.addEventListener('submit', handleFormSubmission);

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();

  // Get form inputs
  const projectImage = document.getElementById('projectImage').files[0];
  const projectName = document.getElementById('projectName').value;
  const categorySelect = document.getElementById('categorySelect');
  const categoryId = categorySelect.value;

  // Add your logic here to handle the form submission
  // For example, you can use FormData to construct the form data and send it to the server using fetch

  // After successful submission, close the form modal
  closeFormModal();
}
