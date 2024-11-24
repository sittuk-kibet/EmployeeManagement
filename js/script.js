const addEmployee = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;

    try {
        const response = await fetch('http://localhost:4000/api/employees/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, position, department }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add employee: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Employee added:', data); // Log the response data

        loadEmployees(); // Reload the employees
    } catch (error) {
        console.error('Error adding employee:', error);
    }
};

const loadEmployees = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/employees/all');
        const employees = await response.json();

        if (!Array.isArray(employees)) {
            throw new Error('Invalid employee data');
        }

        const employeeList = document.getElementById('employeeList');
        employeeList.innerHTML = '';

        employees.forEach(emp => {
            const li = document.createElement('li');
            li.textContent = `${emp.name} - ${emp.position} (${emp.department})`;
            employeeList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading employees:', error);
    }
};
