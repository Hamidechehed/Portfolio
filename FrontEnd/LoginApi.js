const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);

    function handleLogin(event) {
      event.preventDefault(); // Prevent the form from submitting

      // Get the values from the form inputs
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = '';

      // Create the request body
      const requestBody = {
        email: email,
        password: password,
      };

      // Send the POST request to the API URL
      fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log(data);
          if (data.userId && data.token) {
            // Login successful, redirect to the site page
            window.location.href = 'index.html';
          } else {
            // Login failed, display error message
            
            errorMessage.textContent = 'Erreur dans l\'identifiant ou le mot de passe';
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }