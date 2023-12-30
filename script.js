// Sample data
const departments = [
    { departmentId: 1, name: 'HR' },
    { departmentId: 2, name: 'IT' },
    { departmentId: 3, name: 'Accounting' },
    { departmentId: 4, name: 'Marketing' },
    { departmentId: 5, name: 'Public Relation' },
    { departmentId: 6, name: 'Management' },
    
  ];
  
  const employees = [
    { id: 1, name: 'Saket Ashwani', departmentId: 1 },
    { id: 2, name: 'Mr .Vijay Pandey', departmentId: 2 },
  ];
  
 // Function to display employee list
function displayEmployeeList(filteredEmployees) {
    const employeeListDiv = document.getElementById('employeeList');
    employeeListDiv.innerHTML = '';
  
    (filteredEmployees || employees).forEach(employee => {
      const department = departments.find(dep => dep.departmentId === employee.departmentId);
      const card = `
        <div class="card mb-3 ">
          <div class="card-body">
            <h5 class="card-title">${employee.name}</h5>
            <p class="card-text">Department: ${department ? department.name : 'Unknown'}</p>
            <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
            <button class="btn btn-primary" onclick="editEmployee(${employee.id})">Edit</button>
          </div>
        </div>
      `;
      employeeListDiv.innerHTML = employeeListDiv.innerHTML+ card;
    });
  }
  
  
  // Function to delete an employee
  function deleteEmployee(employeeId) {
    employees.splice(employees.findIndex(emp => emp.id === employeeId), 1);
    displayEmployeeList();
  }
  
  // Function to edit an employee
  function editEmployee(employeeId) {
    const newName = prompt('Enter new name:');
    const newDepartment = prompt('Enter new department ID:');
    
    const index = employees.findIndex(emp => emp.id === employeeId);
    if (index !== -1) { // -1 isliye emoployee exist krta h ki nhi 
      employees[index].name = newName || employees[index].name;
      employees[index].departmentId = parseInt(newDepartment) || employees[index].departmentId;
         // Update Info.
      
      displayEmployeeList();
    }
  }
  
  // Event listener for the "Add Employee" form
  document.getElementById('addEmployeeForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const employeeName = document.getElementById('employeeName').value;
    const employeeDepartment = document.getElementById('employeeDepartment').value;
  
    const newEmployee = {
      id: employees.length + 1,
      name: employeeName,
      departmentId: parseInt(employeeDepartment),
    };
  
    employees.push(newEmployee);
    displayEmployeeList();
  
    // Clear the form fields
    document.getElementById('employeeName').value = '';
    document.getElementById('employeeDepartment').value = '';
  });
  
  // Event listener for the search input
  document.getElementById('searchInput').addEventListener('input', function () {
    const searchValue = this.value.trim().toLowerCase();
    const filteredEmployees = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchValue) ||
      departments.find(dep => dep.departmentId === employee.departmentId)?.name.toLowerCase().includes(searchValue)
    );
  
    displayEmployeeList(filteredEmployees);
  });
  
  // Initial display of employee list
  displayEmployeeList();
  