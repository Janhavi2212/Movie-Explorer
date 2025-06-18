# Movie Explorer 🍿

A modern, responsive web application for discovering popular movies, built with React and Bootstrap. This app allows users to browse through an infinitely scrolling list of movies, search by title, filter by genre, and view details—all with a sleek dark/light theme toggle.

## 🚀 Live Demo

**[https://harmonious-scone-df7a53.netlify.app/]**

## ✨ Features

- **Infinite Scroll:** Smoothly loads more movies as the user scrolls to the bottom of the page, providing a seamless browsing experience.
- **Real-time Search & Filter:** Instantly filters the currently loaded movies by title or genre using the intuitive header controls.
- **Detailed Movie Information:** Click on any movie card to see a detailed view with its overview, rating, and an embedded YouTube trailer.
- **Dark & Light Mode:** Switch between a sleek dark theme and a clean light theme using React's Context API for global state management.
- **Responsive Design:** A mobile-first design using Bootstrap 5 ensures a great user experience on all devices, from phones to desktops.
- **Dynamic UI:** The interface provides clear loading indicators and user-friendly error messages for a smooth experience during API calls.
- **Secure API Key Handling**: Uses environment variables to keep the TMDb API key secure and out of the public repository.

---

## 🛠️ Built With

This project showcases a modern frontend stack and professional development practices:

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[React Hooks](https://reactjs.org/docs/hooks-intro.html)**: Used for state and lifecycle features (`useState`, `useEffect`, `useMemo`, `useContext`, `useCallback`).
- **[React Context API](https://reactjs.org/docs/context.html)**: For efficient global state management of the theme.
- **[Bootstrap 5](https://getbootstrap.com/)**: For responsive design and pre-built UI components, customized with CSS variables for theming.
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for making API requests to the TMDb API.
- **[Netlify](https://www.netlify.com/)**: For continuous deployment and hosting.

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Janhavi2212/Movie-Explorer.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Movie-Explorer
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up your Environment Variables:**
    This project requires an API key from The Movie Database (TMDb).

    - Create a new file named `.env` in the **root** of the project directory.
    - Add the following line to the `.env` file, replacing `your_api_key_here` with your actual key. **The variable name must start with `REACT_APP_`**.
      ```
      REACT_APP_TMDB_API_KEY=your_api_key_here
      ```
    - You can get a free API key by creating an account at [TMDb](https://www.themoviedb.org/signup).

5.  **Run the application:**
    ```sh
    npm start
    ```
    The app will open automatically in your browser at `http://localhost:3000`.

---

## 📄 API Credits

This project uses the [TMDb API](https://www.themoviedb.org/documentation/api) but is not endorsed or certified by TMDb.

---
