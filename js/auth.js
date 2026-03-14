(function () {
  "use strict";

  const USERS_KEY = "users";
  const LOGGED_USER_KEY = "loggedUser";
  const THEME_KEY = "themePreference";

  function parseJSON(value, fallbackValue) {
    try {
      return JSON.parse(value) ?? fallbackValue;
    } catch (error) {
      return fallbackValue;
    }
  }

  function getUsers() {
    // Estrutura esperada: [{ name, email, password }]
    return parseJSON(localStorage.getItem(USERS_KEY), []);
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
  }

  function findUserByEmail(email) {
    const normalized = normalizeEmail(email);
    return getUsers().find(function (user) {
      return normalizeEmail(user.email) === normalized;
    });
  }

  function registerUser(payload) {
    const name = String(payload.name || "").trim();
    const email = normalizeEmail(payload.email);
    const password = String(payload.password || "");

    if (!name) {
      return { ok: false, message: "Informe seu nome." };
    }

    if (!isValidEmail(email)) {
      return { ok: false, message: "Digite um email valido." };
    }

    if (password.length < 6) {
      return { ok: false, message: "A senha deve ter no minimo 6 caracteres." };
    }

    if (findUserByEmail(email)) {
      return { ok: false, message: "Ja existe uma conta com esse email." };
    }

    const users = getUsers();
    // Persistencia local sem backend para compatibilidade total com GitHub Pages.
    users.push({
      name: name,
      email: email,
      password: password
    });
    saveUsers(users);

    return { ok: true, message: "Conta criada com sucesso." };
  }

  function loginUser(payload) {
    const email = normalizeEmail(payload.email);
    const password = String(payload.password || "");
    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return { ok: false, message: "Email ou senha invalidos." };
    }

    localStorage.setItem(LOGGED_USER_KEY, email);
    return { ok: true, message: "Login realizado com sucesso.", user: user };
  }

  function getLoggedUserEmail() {
    return normalizeEmail(localStorage.getItem(LOGGED_USER_KEY));
  }

  function getLoggedUser() {
    const email = getLoggedUserEmail();
    if (!email) {
      return null;
    }
    return findUserByEmail(email) || null;
  }

  function logout() {
    localStorage.removeItem(LOGGED_USER_KEY);
  }

  function requireAuth() {
    const loggedUser = getLoggedUser();
    if (!loggedUser) {
      // Protege a area logada quando a sessao nao existe.
      window.location.href = "index.html";
    }
  }

  function redirectIfAuthenticated() {
    if (getLoggedUser()) {
      window.location.href = "dashboard.html";
    }
  }

  function setTheme(theme) {
    const isDark = theme === "dark";
    document.body.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }

  function toggleTheme() {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    updateThemeToggleLabel();
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    setTheme(savedTheme === "dark" ? "dark" : "light");
    updateThemeToggleLabel();
  }

  function updateThemeToggleLabel() {
    const button = document.getElementById("themeToggle");
    if (!button) {
      return;
    }

    button.textContent = document.body.dataset.theme === "dark" ? "Light Mode" : "Dark Mode";
  }

  function initThemeToggle(buttonId) {
    applySavedTheme();
    const button = document.getElementById(buttonId || "themeToggle");
    if (!button) {
      return;
    }
    button.addEventListener("click", toggleTheme);
    updateThemeToggleLabel();
  }

  function initPasswordToggles() {
    const toggles = document.querySelectorAll(".password-toggle[data-target]");

    toggles.forEach(function (toggleButton) {
      toggleButton.addEventListener("click", function () {
        const targetId = toggleButton.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) {
          return;
        }

        const isPassword = input.type === "password";
        // Alterna o tipo do input para mostrar/ocultar senha.
        input.type = isPassword ? "text" : "password";
        toggleButton.textContent = isPassword ? "Ocultar" : "Mostrar";
      });
    });
  }

  function showMessage(container, text, type) {
    if (!container) {
      return;
    }

    container.textContent = text || "";
    container.classList.remove("error", "success", "show");

    if (text) {
      container.classList.add(type === "success" ? "success" : "error", "show");
    }
  }

  function setInputState(input, isValid, feedbackElement, feedbackText) {
    if (!input) {
      return;
    }

    input.classList.remove("is-valid", "is-invalid");

    if (typeof isValid === "boolean") {
      input.classList.add(isValid ? "is-valid" : "is-invalid");
    }

    if (feedbackElement) {
      feedbackElement.textContent = feedbackText || "";
      feedbackElement.style.color = isValid === false ? "var(--danger)" : "var(--text-soft)";
    }
  }

  function setButtonLoading(button, isLoading) {
    if (!button) {
      return;
    }

    const loadingText = button.dataset.loadingText || "Enviando...";
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent;
    }

    button.disabled = Boolean(isLoading);
    button.textContent = isLoading ? loadingText : button.dataset.originalText;
  }

  window.AuthFlow = {
    getUsers: getUsers,
    saveUsers: saveUsers,
    isValidEmail: isValidEmail,
    findUserByEmail: findUserByEmail,
    registerUser: registerUser,
    loginUser: loginUser,
    getLoggedUserEmail: getLoggedUserEmail,
    getLoggedUser: getLoggedUser,
    logout: logout,
    requireAuth: requireAuth,
    redirectIfAuthenticated: redirectIfAuthenticated,
    initThemeToggle: initThemeToggle,
    initPasswordToggles: initPasswordToggles,
    showMessage: showMessage,
    setInputState: setInputState,
    setButtonLoading: setButtonLoading
  };
})();
