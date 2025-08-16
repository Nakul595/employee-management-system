let employees = [];
let editIndex = -1;

const form = document.getElementById("employee-form");
const tableBody = document.querySelector("#employee-table tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const position = document.getElementById("position").value.trim();

  if (name && email && position) {
    const employee = { name, email, position };

    if (editIndex === -1) {
      employees.push(employee);
    } else {
      employees[editIndex] = employee;
      editIndex = -1;
    }

    form.reset();
    renderTable();
  }
});

function renderTable() {
  tableBody.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.position}</td>
      <td class="actions">
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editEmployee(index) {
  const emp = employees[index];
  document.getElementById("name").value = emp.name;
  document.getElementById("email").value = emp.email;
  document.getElementById("position").value = emp.position;
  editIndex = index;
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    renderTable();
  }
}

