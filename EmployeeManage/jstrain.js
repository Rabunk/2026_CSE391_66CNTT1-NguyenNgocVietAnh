document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const employeeTableBody = document.querySelector("#EmployeeTable tbody");
    const addEmployBtn = document.getElementById("addEmployBtn");
    const noData = document.getElementById("noData");

    const modalEl = document.getElementById('employeeModal');
    const employeeModal = new bootstrap.Modal(modalEl);
    const form = document.getElementById('employeeForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const positionInput = document.getElementById('positionInput');

    function renderTable(data) {
        employeeTableBody.innerHTML = '';
        if (!data || data.length === 0) {
            noData.style.display = 'block';
            return;
        }
        noData.style.display = 'none';
        data.forEach((emp, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>${emp.position}</td>
            <td>
                <button class="btn btn-sm btn-warning btn-edit" data-id="${emp.id}">Sửa</button>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${emp.id}">Xoá</button>
            </td>`;
            employeeTableBody.appendChild(tr);
        });
    }
    renderTable(EmployeeData);

    addEmployBtn.addEventListener('click', () => {
        form.reset();
        clearCustomValidity();
        employeeModal.show();
    });

    function clearCustomValidity() {
        nameInput.setCustomValidity('');
        emailInput.setCustomValidity('');
        phoneInput.setCustomValidity('');

    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearCustomValidity();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const position = positionInput.value;

        if (!name) {
            nameInput.setCustomValidity('Ho ten khong duoc de trong');
            nameInput.reportValidity();
            return;
        }
        if (name.length > 30) {
            nameInput.setCustomValidity('Ho ten toi da 30 ky tu');
            nameInput.reportValidity();
            return;
        }
        if (!email) {
            emailInput.setCustomValidity('Email khong duoc de trong');
            emailInput.reportValidity();
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            phoneInput.setCustomValidity('Số điện thoại phải đúng 10 chữ số');
            phoneInput.reportValidity();
            return;
        }
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const newId = EmployeeData.length > 0 ? Math.max(...EmployeeData.map(x => x.id)) + 1 : 1;
        const newEmp = { id: newId, name, email, phone, position };
        EmployeeData.push(newEmp);
        renderTable(EmployeeData);
        employeeModal.hide();
    });

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        const filtered = EmployeeData.filter(e =>
            e.name.toLowerCase().includes(q) ||
            e.email.toLowerCase().includes(q) ||
            e.phone.includes(q)
        );
        renderTable(filtered);
    })

    employeeTableBody.addEventListener('click', (e) => {
        if (e.target.matches('.btn-delete')) {
            const id = Number(e.target.dataset.id);
            const idx = EmployeeData.findIndex(x => x.id === id);
            if (idx > -1 && confirm('Ban co chac muon xoa nhan su nay')) {
                EmployeeData.splice(idx, 1);
                renderTable(EmployeeData);
            }
        }

        if (e.target.matches('.btn-edit')) {
            const id = Number(e.target.dataset.id);
            const emp = EmployeeData.findIndex(x => x.id === id);
            if (!emp) return;
            nameInput.value = emp.name;
            emailInput.value = emp.email;
            phoneInput.value = emp.phone;
            positionInput.value = emp.position;
            clearCustomValidity();
            employeeModal.show();
            form.onsubmit = (ev) => {
                ev.preventDefault();
                const updatedName = nameInput.value.trim();
                const updatedEmail = emailInput.value.trim();
                const updatedPhone = phoneInput.value.trim();
                const updatedPosition = positionInput.value;
                if (!updatedName) {
                    nameInput.setCustomValidity('Ho ten khong duoc de trong');
                    nameInput.reportValidity();
                    return;
                }
                if (updatedEmail === '') {
                    emailInput.setCustomValidity('Email không được để trống');
                    emailInput.reportValidity();
                    return;
                }
                if (!/^\d{10}$/.test(updatedPhone)) {
                    phoneInput.setCustomValidity('Số điện thoại phải đúng 10 chữ số');
                    phoneInput.reportValidity();
                    return;
                }
                emp.name = updatedName;
                emp.email = updatedEmail;
                emp.phone = updatedPhone;
                emp.position = updatedPosition;
                renderTable(EmployeeData);
                employeeModal.hide();
                form.onsubmit = null;
            }
        }
    })

})