const apps = [
    {
        name: 'To-Do List App',
        description: 'A simple to-do list application.',
        url: 'apps/todo-app/index.html'
    },
    {
        name: 'Calculator App',
        description: 'A simple calculator.',
        url: 'apps/calculator-app/index.html'
    }
];

const appContainer = document.getElementById('app-container');
const showcase = document.querySelector('main');

apps.forEach(app => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h2>${app.name}</h2>
        <p>${app.description}</p>
    `;
    card.addEventListener('click', () => {
        launchApp(app.url);
    });
    appContainer.appendChild(card);
});

function launchApp(url) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <iframe src="${url}"></iframe>
        </div>
    `;
    showcase.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
}