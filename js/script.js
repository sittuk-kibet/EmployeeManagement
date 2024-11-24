const loadEmployees = async () => {
    const response = await fetch('http://localhost:5000/api/employees/all');
    const employees = await response.json();
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';
    employees.forEach(emp => {
        const li = document.createElement('li');
        li.textContent = `${emp.name} - ${emp.position} (${emp.department})`;
        employeeList.appendChild(li);
    });
};

const addEmployee = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;

    await fetch('http://localhost:5000/api/employees/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, position, department }),
    });

    loadEmployees();
};
