const initializeDropdown = () => {
  const btn = document.querySelector("#dropdownTrigger");
  btn.addEventListener("click", () => {
    const dropdown = document.querySelector("#dropdown");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove('show');
    } else {
      dropdown.classList.add('show');
    }
  })
}

initializeDropdown();