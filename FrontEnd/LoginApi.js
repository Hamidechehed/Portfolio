const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);

    function handleLogin(event) {
      event.preventDefault(); // Bloque l'envoie du formulaire formulaire 

      // Enregistrement des valeurs à partir des inputs du formulaire
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = '';

      // Création du corps(body) de la requête
      const requestBody = {
        email: email,
        password: password,
      };

      // Envoie de la requête en méthode POST à l'url de l'API
      fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => response.json())
        .then(data => {
          // Gestion de la réponse de l'API
          console.log(data);
          if (data.userId && data.token) {
            // Connexion réussie (couple Email + mdp corrects) rediréction vers la page du site sans boutons de connexion pour l'instant
            window.location.href = 'index.html';
          } else {
            // Echec de Connexion, affichage de message d'erreur
            
            errorMessage.textContent = 'Erreur dans l\'identifiant ou le mot de passe';
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }