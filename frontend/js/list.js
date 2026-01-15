fetch("http://localhost:5000/api/students")
  .then(res => res.json())
  .then(data => {
    document.getElementById("count").innerText = data.length;

    const container = document.getElementById("students");
    container.innerHTML = "";

    data.forEach(s => {
      container.innerHTML += `
        <div class="card">
          <img src="${s.avatar}" />
          <div>
            <h3>${s.first_name} ${s.last_name}</h3>
            <p>DOB: ${s.dob}</p>
            <p>Phone: ${s.phone}</p>
            <p>Course: ${s.course}</p>
          </div>
        </div>
      `;
    });
  });

