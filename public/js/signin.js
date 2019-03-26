window.onload = () => {
  const signInForm = document.getElementById("signin-form");

  signInForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(document.getElementById("signin-form"));

    fetch("/signin", {
      method: "POST",
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(({ status }) => {
        switch (status) {
          case "signin":
            let email = document.getElementById("email");
            localStorage["email"] = email.value;
            window.location.pathname = `/profile/${email.value}`;
            break;
          case "pass_error":
            alert("Incorrect password. Try again.");
            break;
          case "unregistrated":
            alert("Such user not exist. Sign Up.");
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};
