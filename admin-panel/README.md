# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



admin-panel/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/                     # Images, icons, logos, fonts
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── Header.jsx              # App header with search, user menu, notifications
│   │   ├── Sidebar.jsx             # Side navigation drawer
│   │   └── ...other components
│   │
│   ├── pages/                     # Page-level components (screens)
│   │   ├── Auth/
│   │   │   ├── Login.jsx          # Login page
│   │   │   └── Register.jsx       # Register page
│   │   ├── Dashboard.jsx          # Dashboard home page
│   │   ├── Categories/
│   │   │   ├── AddCategory.jsx
│   │   │   ├── EditCategory.jsx
│   │   │   └── CategoriesList.jsx
│   │   ├── Listings/
│   │   │   ├── AddListing.jsx
│   │   │   ├── EditListing.jsx
│   │   │   └── ListingsList.jsx
│   │   └── Bookings/
│   │       ├── BookingRequests.jsx
│   │       └── BookingHistory.jsx
│   │
│   ├── services/                  # Axios API service files
│   │   ├── api.js                 # Axios instance with base URL and interceptors
│   │   ├── authService.js         # Login, register, verify token API calls
│   │   ├── categoryService.js
│   │   ├── listingService.js
│   │   └── bookingService.js
│   │
│   ├── store/                     # Redux Toolkit state management
│   │   ├── actions/
│   │   │   ├── authActions.js     # Async thunks for auth
│   │   │   ├── categoryActions.js
│   │   │   ├── listingActions.js
│   │   │   └── bookingActions.js
│   │   ├── reducers/
│   │   │   ├── authReducer.js     # Slices with extraReducers handling async thunks
│   │   │   ├── categoryReducer.js
│   │   │   ├── listingReducer.js
│   │   │   └── bookingReducer.js
│   │   └── store.jsx              # configureStore combining reducers
│   │
│   ├── styles/                    # Theme and CSS-related files
│   │   └── theme.js               # Material UI theme customization
│   │
│   ├── App.jsx                   # Root app component with routing and layout
│   ├── index.js                  # Entry point wrapping app with Provider and ThemeProvider
│   └── index.css                 # Global CSS or utility styles
│
├── package.json
└── README.md
