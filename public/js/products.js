window.onload = () => {
  let email = document.getElementById("email");
  email.innerHTML = localStorage["email"]
    ? `<a href="/profile/${localStorage["email"]}">Your profile</a>`
    : "Not loggined";
};

function buyItem(id) {
  fetch(`/buy?email=${localStorage["email"]}&id=${id}`, { method: "GET" })
    .then(res => res.json())
    .then(({msg, bonus}) => {
        alert(`${msg} ${bonus}`)
    })
    .catch(err => {
      console.log(err);
    });
}
