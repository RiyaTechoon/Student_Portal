document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
  
  // NAME VALIDATION 
  if (!nameRegex.test(formData.get("firstName")) ||
      !nameRegex.test(formData.get("lastName"))) {
    alert("Name must contain only alphabets");
    return;
  }

  // PHONE VALIDATION 
  if (!phoneRegex.test(formData.get("phone"))) {
    alert("Phone number must be 10 digits");
    return;
  }

  // TELEPHONE VALIDATION 
  const telephone = formData.get("telephone");

  if (telephone) {
    const telPattern = /^\d{3}-\d{3}-\d{3}$/;

    if (!telPattern.test(telephone)) {
      alert("Telephone must be in format: 123-456-789");
      return;
    }
  }

  // EMAIL VALIDATION 
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
