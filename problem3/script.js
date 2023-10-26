document.getElementById('searchBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    
    // Fetching user data
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('name').textContent = data.name;
            document.getElementById('user').textContent = data.login;
            document.getElementById('email').textContent = data.email || 'N/A';
            document.getElementById('location').textContent = data.location || 'N/A';
            document.getElementById('gists').textContent = data.public_gists;
            return fetch(data.repos_url);
        })
        .then(response => response.json())
        .then(repos => {
            const reposContainer = document.querySelector('.repos-section');
            // Clear previous repos except the template
            reposContainer.querySelectorAll('.repo:not(#repo-template)').forEach(e => e.remove());

            repos.slice(0, 5).forEach(repo => {
                const repoElem = document.getElementById('repo-template').cloneNode(true);
                repoElem.removeAttribute('id'); // remove id from clone to keep ids unique
                repoElem.style.display = 'block';

                repoElem.querySelector('.repo-name').textContent = repo.name;
                repoElem.querySelector('.repo-desc').textContent = repo.description || 'N/A';

                reposContainer.appendChild(repoElem);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
