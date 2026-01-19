document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;

  if (!nameRegex.test(formData.get("firstName")) ||
      !nameRegex.test(formData.get("lastName"))) {
    alert("Name must contain only alphabets");
    return;
  }

  if (!phoneRegex.test(formData.get("phone"))) {
    alert("Phone number must be 10 digits");
    return;
  }

  if (!emailRegex.test(formData.get("email"))) {
    alert("Invalid email format");
    return;
  }

  const res = await fetch("http://localhost:5000/api/students", {
    method: "POST",
    body: formData
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.message);
    return;
  }

  alert(result.message);
  window.location.href = "students.html";
});

function cancel() {
  window.location.href = "students.html";
}
