document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorDiv = document.getElementById("login-error");
    const btnText = document.querySelector(".btn-text");
    const btnSpinner = document.querySelector(".btn-spinner");

    // Demo credentials (in real app, this would be handled by backend)
    const DEMO_CREDENTIALS = {
        username: "admin",
        password: "admin123"
    };

    // Redirect if already logged in
    if (localStorage.getItem("admintoken")) {
        window.location.href = './dashboard.html';
        return;
    }

    // Login submit handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get('username').trim();
        const password = formData.get('password');

        // Basic validation
        if (!username || !password) {
            showError("Please fill in all fields");
            return;
        }

        // Show loading
        setLoadingState(true);
        hideError();

        // Simulate API delay
        setTimeout(() => {
            // Check against demo credentials
            if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
                // Create demo user data
                const demoUser = {
                    id: 1,
                    username: username,
                    email: "admin@demo.com",
                    role: "admin",
                    name: "Demo Admin"
                };

                // Create demo token (in real app, this would come from backend)
                const demoToken = "demo_token_" + Date.now();

                // Store authentication data
                localStorage.setItem('admintoken', demoToken);
                localStorage.setItem('adminuser', JSON.stringify(demoUser));
                
                // Redirect to dashboard
                window.location.href = "/dashboard.html";
            } else {
                showError("Invalid credentials. Use admin/admin123 for demo.");
            }
            setLoadingState(false);
        }, 1000); // 1 second delay to simulate API call
    });

    // Helper functions
    function setLoadingState(loading) {
        btnText.style.display = loading ? "none" : "block";
        btnSpinner.style.display = loading ? "block" : "none";
        document.getElementById('login-button').disabled = loading;
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
        
        // Shake animation for error
        loginForm.style.animation = "shake 0.5s";
        setTimeout(() => {
            loginForm.style.animation = "";
        }, 500);
    }

    function hideError() {
        errorDiv.style.display = "none";
    }
    
    // Add shake animation for errors
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-8px); }
            40%, 80% { transform: translateX(8px); }
        }
    `;
    document.head.appendChild(style);
});