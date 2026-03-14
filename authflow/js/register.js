document.addEventListener("DOMContentLoaded", function () {
  AuthFlow.redirectIfAuthenticated();
  AuthFlow.initThemeToggle("themeToggle");
  AuthFlow.initPasswordToggles();

  const form = document.getElementById("registerForm");
  const nameInput = document.getElementById("registerName");
  const emailInput = document.getElementById("registerEmail");
  const passwordInput = document.getElementById("registerPassword");
  const confirmPasswordInput = document.getElementById("registerConfirmPassword");

  const nameFeedback = document.getElementById("registerNameFeedback");
  const emailFeedback = document.getElementById("registerEmailFeedback");
  const passwordFeedback = document.getElementById("registerPasswordFeedback");
  const confirmFeedback = document.getElementById("registerConfirmFeedback");

  const message = document.getElementById("registerMessage");
  const submitButton = document.getElementById("registerButton");

  function validateForm() {
    let isValid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (name.length < 2) {
      AuthFlow.setInputState(nameInput, false, nameFeedback, "Informe um nome com pelo menos 2 caracteres.");
      isValid = false;
    } else {
      AuthFlow.setInputState(nameInput, true, nameFeedback, "Nome preenchido corretamente.");
    }

    if (!AuthFlow.isValidEmail(email)) {
      AuthFlow.setInputState(emailInput, false, emailFeedback, "Informe um email valido.");
      isValid = false;
    } else if (AuthFlow.findUserByEmail(email)) {
      AuthFlow.setInputState(emailInput, false, emailFeedback, "Este email ja esta cadastrado.");
      isValid = false;
    } else {
      AuthFlow.setInputState(emailInput, true, emailFeedback, "Email disponivel.");
    }

    if (password.length < 6) {
      AuthFlow.setInputState(passwordInput, false, passwordFeedback, "A senha deve ter no minimo 6 caracteres.");
      isValid = false;
    } else {
      AuthFlow.setInputState(passwordInput, true, passwordFeedback, "Senha forte o suficiente.");
    }

    if (!confirmPassword || confirmPassword !== password) {
      AuthFlow.setInputState(confirmPasswordInput, false, confirmFeedback, "As senhas precisam coincidir.");
      isValid = false;
    } else {
      AuthFlow.setInputState(confirmPasswordInput, true, confirmFeedback, "Senhas iguais.");
    }

    return isValid;
  }

  [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(function (inputElement) {
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

    // Simula processamento antes de salvar e melhora percepcao de resposta do formulario.
    setTimeout(function () {
      const result = AuthFlow.registerUser({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      });

      if (!result.ok) {
        AuthFlow.showMessage(message, result.message, "error");
        AuthFlow.setButtonLoading(submitButton, false);
        return;
      }

      AuthFlow.showMessage(message, "Conta criada! Voce sera redirecionado para o login.", "success");
      AuthFlow.setButtonLoading(submitButton, false);

      setTimeout(function () {
        window.location.href = "index.html";
      }, 850);
    }, 700);
  });
});
