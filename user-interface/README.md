# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


user-interface/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/                      # Images, icons, fonts, static assets
│   │
│   ├── components/                  # Reusable UI components (common controls, layout)
│   │   ├── Header.jsx               # Header with logo, search bar, user menu
│   │   ├── Footer.jsx               # Footer with links and info
│   │   ├── ListingCard.jsx          # Card component for listing preview
│   │   ├── BookingForm.jsx          # Booking form component
│   │   ├── ProtectedRoute.jsx       # For routes requiring login
│   │   └── ...other reusable widgets
│   │
│   ├── pages/                       # Page-level views (routes)
│   │   ├── Auth/
│   │   │   ├── Login.jsx            # Login form
│   │   │   └── Register.jsx         # User registration form
│   │   ├── Home.jsx                 # Landing/home page with featured listings
│   │   ├── SearchResults.jsx       # Listing search and filter results
│   │   ├── ListingDetails.jsx       # Details page for single listing
│   │   ├── Booking/
│   │   │   ├── MyBookings.jsx       # User's bookings overview
│   │   │   └── BookingDetails.jsx   # Single booking details
│   │   ├── Profile.jsx              # User profile management
│   │   └── NotFound.jsx             # 404 Not Found page
│   │
│   ├── services/                    # Axios API calls
│   │   ├── api.js                   # Axios instance with baseURL http://localhost:3000 and interceptors
│   │   ├── authService.js           # login, register, profile fetch, logout
│   │   ├── listingService.js        # fetch listings, details, search
│   │   ├── bookingService.js        # make booking, fetch user bookings, cancel booking
│   │   └── userService.js           # profile updates, other user related calls
│   │
│   ├── store/                      # Redux Toolkit logic
│   │   ├── actions/
│   │   │   ├── authActions.js
│   │   │   ├── listingActions.js
│   │   │   └── bookingActions.js
│   │   ├── reducers/
│   │   │   ├── authReducer.js
│   │   │   ├── listingReducer.js
│   │   │   └── bookingReducer.js
│   │   └── store.jsx
│   │
│   ├── selectors/                  # Memoized selectors
│   │   └── dashboardSelectors.js
│   │
│   ├── styles/                    # Theme and CSS files
│   │   └── theme.js               # Material UI theme customization
│   │
│   ├── App.jsx                    # Main app with routing and layout
│   ├── index.js                  # Entry point wrapping App with Provider, Router, ThemeProvider
│   └── index.css                 # Global CSS
│
├── .env                         # Environment variables (e.g., API base URL)
├── package.json
└── README.md
