# 🎬 Movie Watchlist - Frontend

**Movie Watchlist** is a web application that allows users to manage their personal movie watchlist, mark movies as watched, and browse available movies from a global catalog.

## 🚀 Technologies Used

- **React.js** + **TypeScript**
- **Vite**
- **Axios** for API communication
- **Flowbite React** for UI components
- **Context API** for authentication and session management
- **React Router** for navigation

---

## 📂 **Project Structure**

movie-watchlist-frontend/
│-- node_modules/               
│-- public/                     
│-- src/                         
│   │-- components/              
│   │   ├── MovieCard.tsx
│   │   ├── MovieForm.tsx
│   │   ├── Navbar.tsx
│   │-- pages/                   
│   │   ├── AboutPage.tsx
│   │   ├── Browse.tsx
│   │   ├── HomePage.tsx
│   │   ├── Login.tsx
│   │   ├── MoviesPage.tsx
│   │   ├── Profile.tsx
│   │   ├── Signup.tsx
│   │   ├── UserWatchlistPage.tsx
│   │   ├── WatchlistPage.tsx
│   │-- routes/                  
│   │   ├── AnonymousRoute.tsx
│   │   ├── PrivateRoute.tsx
│   │-- services/                
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── movieService.ts
│   │   ├── movieStatusService.ts
│   │   ├── userMovieService.ts
│   │-- SessionContext/          
│   │   ├── SessionContext.tsx
│   ├── App.tsx                  
│   ├── global.d.ts              
│   ├── index.css               
│   ├── main.tsx                 
│   ├── Signup.tsx               
│   ├── vite-env.d.ts            
│-- .env                        
│-- .eslintrc.cjs                
│-- .gitignore                   
│-- package.json                 
│-- tsconfig.json                
│-- tsconfig.node.json  
│-- vite.config.ts  


## 📌 **Key Features**
✔ User registration and login  
✔ Add/remove movies from the watchlist  
✔ Filter movies by status ("To Watch" or "Watched")  
✔ Only admins can add movies to the global catalog  
✔ API communication using Axios  

---


## 🌍 **Deployment**
The project is available online at:  
🔗 **Frontend:** `[]`  

---

## 📜 **License**
This project was developed for educational and learning purposes. 🚀🎬

***



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
