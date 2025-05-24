// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
    // Registration Logic (for register.html)
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        const registerErrorElement = document.getElementById('register-error');
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            registerErrorElement.textContent = ''; // Clear previous errors

            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm['confirm-password'].value;

            if (password !== confirmPassword) {
                registerErrorElement.textContent = "Passwords do not match.";
                return;
            }

            if (password.length < 6) {
                registerErrorElement.textContent = "Password should be at least 6 characters long.";
                return;
            }

            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    console.log("User registered:", userCredential.user);
                    alert("Registration successful! Please login.");
                    window.location.href = '/login.html'; // Redirect to login page
                })
                .catch((error) => {
                    console.error("Registration error:", error);
                    registerErrorElement.textContent = error.message;
                });
        });
    }

    // Login Logic (for login.html)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const loginErrorElement = document.getElementById('login-error');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginErrorElement.textContent = ''; // Clear previous errors

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    console.log("User logged in:", userCredential.user);
                    alert("Login successful! Redirecting to home page.");
                    window.location.href = '/'; // Redirect to home page
                })
                .catch((error) => {
                    console.error("Login error:", error);
                    loginErrorElement.textContent = error.message;
                });
        });
    }
});

// Logout Function (can be called from anywhere)
function logoutUser() {
    auth.signOut().then(() => {
        console.log("User signed out");
        alert("You have been logged out.");
        window.location.href = '/login.html'; // Redirect to login page after logout
    }).catch((error) => {
        console.error("Sign out error:", error);
        alert("Error signing out: " + error.message);
    });
}

// Auth State Observer (global, to update UI based on auth state)
// This is a basic example. You'll likely want to integrate this more deeply
// into your main script (public/js/script.js) to update navigation, etc.
auth.onAuthStateChanged((user) => {
    const loginNavItem = document.getElementById('login-nav-item');
    const registerNavItem = document.getElementById('register-nav-item');
    const logoutNavItem = document.getElementById('logout-nav-item');
    const loggedInUserInfo = document.getElementById('logged-in-user-info'); // Placeholder for user info display

    if (user) {
        // User is signed in.
        console.log("Auth state changed: User is signed in", user.email);
        if (loginNavItem) loginNavItem.style.display = 'none';
        if (registerNavItem) registerNavItem.style.display = 'none';
        if (logoutNavItem) logoutNavItem.style.display = 'block'; // Or 'inline' or 'flex' depending on layout
        if (loggedInUserInfo) loggedInUserInfo.textContent = `Logged in as: ${user.email}`; // Display user email

        // If on login or register page, redirect to home
        if (window.location.pathname.endsWith('/login.html') || window.location.pathname.endsWith('/register.html')) {
            window.location.href = '/';
        }
    } else {
        // User is signed out.
        console.log("Auth state changed: User is signed out");
        if (loginNavItem) loginNavItem.style.display = 'block'; // Or 'inline' or 'flex'
        if (registerNavItem) registerNavItem.style.display = 'block'; // Or 'inline' or 'flex'
        if (logoutNavItem) logoutNavItem.style.display = 'none';
        if (loggedInUserInfo) loggedInUserInfo.textContent = '';

        // If on a page that requires auth (e.g. a profile page, not yet created), redirect to login
        // Example: if (window.location.pathname.includes('/profile')) { window.location.href = '/login.html'; }
    }
});
