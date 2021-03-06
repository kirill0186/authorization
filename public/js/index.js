window.onload = () => {
  const signUpForm = document.getElementById("signup-form");

  signUpForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(document.getElementById("signup-form"));

    fetch("/signup", {
      method: "POST",
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(({ status }) => {
        switch (status) {
          case "signup":
            let email = document.getElementById("email");
            localStorage["email"] = email.value;
            window.location.pathname = `/profile/${email.value}`;
            alert("Your signup bonus: 100")
            break;
          case "error":
            alert("User already exists. Sign In")
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};
