const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:5000/api/students/${id}`)
  .then(res => res.json())
  .then(s => {
    document.getElementById("studentCard").innerHTML = `
      <div class="student-card">
        <img src="${s.avatar}" alt="avatar">
        <div class="info">
          <h2>${s.first_name} ${s.last_name}</h2>
          <p>
        <strong>
            <i class="fa-solid fa-building icon"></i>
            ${s.company_name}
        </strong>
        </p>

        <p class="contact-line">
        <span>
            <i class="fa-solid fa-phone icon"></i>
            ${s.phone}
        </span>

        <span>
            <i class="icon">☎</i>
            ${s.telephone || "-"}
        </span>
        </p>

        <p>
        <i class="fa-solid fa-envelope icon"></i>
        ${s.email}
        </p>

        </div>
      </div>
    `;
  });

function goBack() {
  window.location.href = "students.html";
}
