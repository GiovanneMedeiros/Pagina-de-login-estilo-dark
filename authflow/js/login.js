document.addEventListener("DOMContentLoaded", function () {
  AuthFlow.redirectIfAuthenticated();
  AuthFlow.initThemeToggle("themeToggle");
  AuthFlow.initPasswordToggles();

  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const emailFeedback = document.getElementById("loginEmailFeedback");
  const passwordFeedback = document.getElementById("loginPasswordFeedback");
  const message = document.getElementById("loginMessage");
  const submitButton = document.getElementById("loginButton");

  function validateForm() {
    let isValid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!AuthFlow.isValidEmail(email)) {
      AuthFlow.setInputState(emailInput, false, emailFeedback, "Informe um email valido.");
      isValid = false;
    } else {
      AuthFlow.setInputState(emailInput, true, emailFeedback, "Email valido.");
    }

    if (password.length < 6) {
      AuthFlow.setInputState(passwordInput, false, passwordFeedback, "A senha deve ter no minimo 6 caracteres.");
      isValid = false;
    } else {
      AuthFlow.setInputState(passwordInput, true, passwordFeedback, "Senha preenchida corretamente.");
    }

    return isValid;
  }

  [emailInput, passwordInput].forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      validateForm();
      AuthFlow.showMessage(message, "", "error");
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      AuthFlow.showMessage(message, "Revise os campos para continuar.", "error");
      return;
    }

    AuthFlow.setButtonLoading(submitButton, true);

    // Delay curto para feedback de loading e UX mais clara no envio.
    setTimeout(function () {
      const result = AuthFlow.loginUser({
        email: emailInput.value,
        password: passwordInput.value
      });

      if (!result.ok) {
        AuthFlow.showMessage(message, result.message, "error");
        AuthFlow.setButtonLoading(submitButton, false);
        return;
      }

      AuthFlow.showMessage(message, "Login bem-sucedido. Redirecionando...", "success");
      AuthFlow.setButtonLoading(submitButton, false);

      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 500);
    }, 650);
  });
});
