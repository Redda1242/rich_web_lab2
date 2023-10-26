document.getElementById('searchBtn').addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value;
    
    // Fetching user data
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('name').textContent = data.name;
            document.getElementById('username').textContent = data.login;
            document.getElementById('email').textContent = data.email || 'N/A';
            document.getElementById('location').textContent = data.location || 'N/A';
            document.getElementById('gists').textContent = data.public_gists;

            return fetch(data.repos_url);
        })
        .then(response => response.json())
        .then(repos => {
            const reposContainer = document.querySelector('.repos');
            reposContainer.innerHTML = "";  // Clear previous repos

            repos.slice(0, 5).forEach(repo => {
                const repoElem = document.getElementById('repoTemplate').cloneNode(true);
                repoElem.style.display = 'block';

                repoElem.querySelector('.repoName').textContent = repo.name;
                repoElem.querySelector('.repoDescription').textContent = repo.description || 'N/A';

                reposContainer.appendChild(repoElem);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});