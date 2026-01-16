document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  // FIRST & LAST NAME VALIDATION
  const namePattern = /^[A-Za-z]+$/;

  const firstName = formData.get("firstName").trim();
  const lastName = formData.get("lastName").trim();

  if (!firstName || !lastName) {
    alert("First Name and Last Name are required");
    return; 
  }

  if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
    alert("First and Last Name should contain only alphabets");
    return;
  }

  // DOB VALIDATION
  const dob = new Date(formData.get("dob"));
  const today = new Date();

  if (dob > today) {
    alert("Date of Birth cannot be in the future");
    return;
  }

  // PHONE NUMBER VALIDATION
  const phone = formData.get("phone").trim();

// Check only digits
if (!/^\d+$/.test(phone)) {
  alert("Phone number must contain digits only");
  return;
}

// Check length
if (phone.length !== 10) {
  alert("Enter only 10-digit number");
  return;
}

// Check starting digit (India)
const phonePattern = /^[6-9]\d{9}$/;
if (!phonePattern.test(phone)) {
  alert("Enter a valid 10-digit phone number");
  return;
}


  // IMAGE VALIDATION
  
  const imageFile = document.querySelector('input[name="photo"]').files[0];

  if (!imageFile) {
    alert("Please upload an image");
    return;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(imageFile.type)) {
    alert("Only JPG and PNG images are allowed");
    return;
  }

  if (imageFile.size > 2 * 1024 * 1024) {
    alert("Image size must be less than 2MB");
    return;
  }
  
  // NOW SEND DATA
  const res = await fetch("http://localhost:5000/api/students", {
    method: "POST",
    body: formData
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.message || "Registration failed");
    return;
  }

  alert(result.message);
  window.location.href = "index.html";
});

