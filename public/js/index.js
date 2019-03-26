window.onload = () => {
  document.getElementById("sign-up").onclick = () => {
    let email = document.getElementById("email");
    localStorage["email"] = email.value;
  };
};
