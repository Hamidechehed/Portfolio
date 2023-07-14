// Fetch categories from the API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    // Call a function to handle the retrieved categories
    handleCategories(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Function to handle the retrieved categories
function handleCategories(categories) {
  // Get the filter buttons container
  const filterButtonsContainer = document.getElementById('filter-buttons');

  // Loop through each category and create filter buttons
  categories.forEach(category => {
    // Create a button element for the category
    const button = document.createElement('button');
    button.textContent = category.name;
    button.classList.add('filter-button');

    // Add event listener for button click
    button.addEventListener('click', () => {
      handleFilter(category.id);
      button.classList.toggle('active');
    });

    // Append the button to the filter buttons container
    filterButtonsContainer.appendChild(button);
  });
}


function handleFilter(categoryId) {
  // Get all filter buttons
  const filterButtons = document.querySelectorAll('.filter-button');

  // Toggle active state of buttons
  filterButtons.forEach(button => {
    if (button.dataset.categoryId === categoryId) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  // Get all project images
  const projectImages = document.querySelectorAll('.gallery figure');

  // Loop through each project image and show/hide based on category
  projectImages.forEach(image => {
    const imageCategoryId = parseInt(image.dataset.categoryId);

    if (categoryId === 0 || imageCategoryId === categoryId) {
      image.style.display = 'block'; // Show image
    } else {
      image.style.display = 'none'; // Hide image
    }
  });
}


// Get the "Supp filtres" button
const removeFiltersButton = document.getElementById('remove-filters-button');

// Add event listener for button click
removeFiltersButton.addEventListener('click', removeFilters);

// Function to remove filters
function removeFilters() {
    // Remove the "active" class from all filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show all project images
    const projectImages = document.querySelectorAll('.gallery figure');
    projectImages.forEach(image => {
        image.style.display = 'block';
    });
}

