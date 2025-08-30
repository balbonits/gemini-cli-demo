# Dev Journey

This project was restructured to be a showcase of web component-based applications.

## 2025-08-30

*   Committed and pushed all the changes related to improving test coverage and adding reset functionality to all the apps.
*   The commit includes updates to test files, source code, `.gitignore`, `jest.config.js`, `playwright.config.js`, `package.json`, and `package-lock.json`.
*   Removed `DEV_JOURNEY.md` files from the sub-apps.

## 2025-08-29

*   Updated the `.gitignore` file to include common ignores for a web development project.
*   Improved the test coverage for the `markdown-editor` app to 82.35%.
*   Added setup instructions to the `README.md` file of the `markdown-editor` app.
*   Improved the test coverage for the `todo-app` to 91.83%.
*   Improved the test coverage for the `weather-app` to 83.67%.
*   Improved the test coverage for the `calculator-app` to 90.12%.
*   Improved the test coverage for the `drawing-app` to 70.42%.
*   Improved the test coverage for the `data-visualization-app` to 82.85%.
*   Improved the test coverage for the `jsfiddle-clone` to 84.21%.
*   Improved the test coverage for the `shopping-cart` to 88.88%.

## 2025-08-28

*   Debugged and fixed issues in the Mind Mapping app:
    *   Fixed an issue where resetting the canvas would not clear the state completely.
    *   Fixed an issue where selecting a color would break the other buttons.
    *   Fixed an issue where the color picker would not change the color of the shapes.
    *   Fixed an issue where double-clicking on a shape would make it stick to the cursor.
*   Added zoom in/out functionality to the Mind Mapping app.
*   Removed `DEV_JOURNEY.md` files from all sub-apps in the `apps` directory.

## 2025-08-22

*   Restructured the project to be a showcase app.
*   Moved the To-Do List app to the `apps/todo-app` directory.
*   Created the main `index.html`, `styles.css`, and `src/showcase.js` for the showcase app.
*   Created the Calculator app as a web component.
*   The Calculator app is self-contained in the `apps/calculator-app` directory.
*   Updated the showcase app to include the Calculator app.
*   Implemented a modal window with an `<iframe>` to launch the apps from the showcase.
*   The showcase application is now feature-complete.
*   Created the Weather app as a web component, using the Open-Meteo API.
*   The Weather app is self-contained in the `apps/weather-app` directory.
*   Updated the showcase app to include the Weather app.
*   Created the Drawing app as a web component.
*   The Drawing app is self-contained in the `apps/drawing-app` directory.
*   Updated the showcase app to include the Drawing app.
*   Created the Data Visualization app as a web component, using Chart.js.
*   The Data Visualization app is self-contained in the `apps/data-visualization-app` directory.
*   Updated the showcase app to include the Data Visualization app.
*   Created the JSFiddle Clone app as a web component.
*   The JSFiddle Clone app is self-contained in the `apps/jsfiddle-clone` directory.
*   Updated the showcase app to include the JSFiddle Clone app.