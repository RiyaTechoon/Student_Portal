const tbody = document.querySelector("#studentsTable tbody");
const countEl = document.getElementById("count");

fetch("http://localhost:5000/api/students")
  .then(res => res.json())
  .then(students => {
    countEl.textContent = students.length;

    students.forEach(s => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${s.first_name} ${s.last_name}</td>
        <td>${s.company_name}</td>
        <td>${s.phone}</td>
        <td>${s.email}</td>
        <td>
          <a href="student.html?id=${s.id}">View</a>
        </td>
      `;

      tbody.appendChild(tr);
    });
  });

