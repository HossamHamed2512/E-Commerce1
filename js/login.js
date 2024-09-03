document.addEventListener("DOMContentLoaded", () => {
  let currentPage = document.body.dataset.page; // Assumes the page has a data-page attribute
  let form = document.getElementById("form");
  let fName_input = document.getElementById("fName_input");
  let email_input = document.getElementById("email_input");
  let password_input = document.getElementById("password_input");
  let confirm_password = document.getElementById("confirm_password");
  let error_msg = document.getElementById("error-msg");
  let loginSection = document.getElementById("login-section");
  let userInfoSection = document.getElementById("user-info-section");
  let userNameSpan = document.getElementById("user-name");
  let logoutBtn = document.getElementById("logout-btn");

  if (currentPage === "signup") {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); 
      let errors = getSignUpErrors(
        fName_input.value,
        email_input.value,
        password_input.value,
        confirm_password.value
      );

      if (errors.length > 0) {
        error_msg.innerText = errors.join(". ");
      } else {
        saveUserToLocalStorage(
          fName_input.value,
          email_input.value,
          password_input.value
        );
        window.location.href = "login.html";
      }
    });
  } else if (currentPage === "login") {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); 
      let errors = getSigninErrors(email_input.value, password_input.value);

      if (errors.length > 0) {
        error_msg.innerText = errors.join(". ");
      } else {
        if (validateUser(email_input.value, password_input.value)) {
          localStorage.setItem("loggedInUser", email_input.value);
          window.location.href = "index.html";
        } else {
          error_msg.innerText = "You must register";
        }
      }
    });
  } else if (currentPage === "index") {
    let loggedInUserEmail = localStorage.getItem("loggedInUser");

    if (loggedInUserEmail) {
      let user = getUserByEmail(loggedInUserEmail);
      if (user) {
        loginSection.style.display = "none";
        userInfoSection.style.display = "block";
        userNameSpan.innerText = `Welcome ${user.firstname}`;
      }
    } else {
      loginSection.style.display = "block";
      userInfoSection.style.display = "none";
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
      });
    }
  }

  function getSignUpErrors(firstname, email, password, confirmPassword) {
    let errors = [];
    if (firstname === "" || firstname == null) {
      errors.push("First Name is Required");
      fName_input.parentElement.classList.add("incorrect");
    }
    if (email === "" || email == null) {
      errors.push("Email is Required");
      email_input.parentElement.classList.add("incorrect");
    }
    if (password === "" || password == null) {
      errors.push("Password is Required");
      password_input.parentElement.classList.add("incorrect");
    }
    if (password.length < 8) {
      errors.push("Password must have at least 8 characters");
    }
    if (!/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push(
        "Password must contain at least one uppercase letter and one special character"
      );
    }
    if (password !== confirmPassword) {
      errors.push("Password does not match");
      password_input.parentElement.classList.add("incorrect");
      confirm_password.parentElement.classList.add("incorrect");
    }
    return errors;
  }

  function getSigninErrors(email, password) {
    let errors = [];
    if (email === "" || email == null) {
      errors.push("Email is Required");
      email_input.parentElement.classList.add("incorrect");
    }
    if (password === "" || password == null) {
      errors.push("Password is Required");
      password_input.parentElement.classList.add("incorrect");
    }
    return errors;
  }

  function saveUserToLocalStorage(firstname, email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ firstname, email, password });
    localStorage.setItem("users", JSON.stringify(users));
  }

  function validateUser(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(
      (user) => user.email === email && user.password === password
    );
  }

  function getUserByEmail(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find((user) => user.email === email);
  }

  // Clear error messages on input
  let allInputs = [
    fName_input,
    email_input,
    password_input,
    confirm_password,
  ].filter((input) => input !== null);
  allInputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", () => {
        if (input.parentElement.classList.contains("incorrect")) {
          input.parentElement.classList.remove("incorrect");
          error_msg.innerHTML = "";
        }
      });
    }
  });
});
