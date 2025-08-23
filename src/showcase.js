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
    },
    {
        name: 'Weather App',
        description: 'Get the current weather for any city.',
        url: 'apps/weather-app/index.html'
    },
    {
        name: 'Drawing App',
        description: 'A simple drawing application.',
        url: 'apps/drawing-app/index.html'
    },
    {
        name: 'Data Visualization App',
        description: 'A simple data visualization using Chart.js.',
        url: 'apps/data-visualization-app/index.html'
    },
    {
        name: 'JSFiddle Clone',
        description: 'A live HTML/CSS/JS code editor.',
        url: 'apps/jsfiddle-clone/index.html'
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