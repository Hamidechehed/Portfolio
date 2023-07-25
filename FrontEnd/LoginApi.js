const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);

    // Fonction qui ajoute le token au stockage local
    function setToken(token) {
        localStorage.setItem('accessToken', token); // Stock le token dans le stockage locale
      }

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
          const token = data.token;
          setToken(token);
          console.log(data);
          if (data.userId && data.token) {
            // Connexion réussie (couple Email + mdp corrects) rediréction vers la page du site sans boutons de connexion pour l'instant
            window.location.href = 'index2.html#portfolio';
            // const editButton = document.getElementById('edit-projects-button');
            // editButton.style.display = 'block';
            // const editButton = document.getElementById("edit-projects-button");
            // editButton.style.display = 'block';
            
          } else {
            // Echec de Connexion, affichage de message d'erreur
            
            errorMessage.textContent = 'Erreur dans l\'identifiant ou le mot de passe';
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }