// Fetch projects from the API
fetch('http://localhost:5678/api/works')
.then(response => response.json())
    .then(data => {
        // Call a function to handle the retrieved projects
        handleProjects(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Function to handle the retrieved projects
function handleProjects(projects) {
    // Get the project gallery container
    const projectGallery = document.getElementById('project-gallery');

    // Loop through each project and create HTML elements to display the project images
    projects.forEach(project => {
        // Create a figure element for the project
        const figure = document.createElement('figure');

        // Create an image element and set the source from the project data
        const image = document.createElement('img');
        image.src = project.imageUrl;
        image.alt = project.title;

        // Create a figcaption element and set the text content from the project data
        const figcaption = document.createElement('figcaption');
        figcaption.setAttribute('id', 'my-figcaption');
        //figcaption.textContent = `${project.categoryId}: ${project.title}`;
        figcaption.textContent = project.title;

        // Set the data-category-id attribute to the categoryId of the project
        figure.dataset.categoryId = project.categoryId;

        // Append the image and figcaption to the figure
        figure.appendChild(image);
        figure.appendChild(figcaption);

        // Append the figure to the project gallery
        projectGallery.appendChild(figure);
    });
}