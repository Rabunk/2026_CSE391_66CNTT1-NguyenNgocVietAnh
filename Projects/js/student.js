// Kịch bản:
// - Có bảng danh sách sinh viên với 2 dòng mẫu
// - Người dùng nhập Họ tên + Email → nhấn "Thêm sinh viên" → thêm dòng mới vào bảng
// - Mỗi dòng có nút "Xoá" → xoá dòng đó khỏi bảng
// - Sau mỗi lần thêm/xoá → cập nhật lại cột STT cho đúng thứ tự

// Bước 1: Truy xuất các phần tử DOM cần tác động
const inputStudentName = document.getElementById("inputStudentName");
const inputStudentEmail = document.getElementById("inputStudentEmail");
const btnAddStudent = document.getElementById("btnAddStudent");
const studentTableBody = document.getElementById("studentTableBody");

// Bước 2: Gắn sự kiện xoá cho các nút "Xoá" có sẵn trong bảng
// Gợi ý: Dùng querySelectorAll để lấy tất cả nút .btn-delete hiện tại
const existingDeleteButtons = studentTableBody.querySelectorAll(".btn-delete");
for (let i = 0; i < existingDeleteButtons.length; i++) {
    existingDeleteButtons[i].addEventListener("click", function () {
        // TODO: Xoá dòng <tr> chứa nút này
        //       Gợi ý: this.closest("tr") để lấy dòng cha
        //       Gợi ý: studentTableBody.removeChild(row) để xoá
        const row = this.closest("tr");
        studentTableBody.removeChild(row);
        // TODO: Gọi hàm updateStudentOrder() để cập nhật lại STT
        updateStudentOrder();
    });
}

// Bước 3: Gắn sự kiện click cho nút "Thêm sinh viên"
btnAddStudent.addEventListener("click", function () {
    // Bước 3.1: Lấy giá trị từ các ô input
    const studentName = inputStudentName.value.trim();
    const studentEmail = inputStudentEmail.value.trim();

    // Bước 3.2: Kiểm tra dữ liệu nhập
    // TODO: Nếu studentName hoặc studentEmail rỗng
    //       → alert("Vui lòng nhập đầy đủ thông tin!") rồi return
    if (studentName === "" || studentEmail === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    // Bước 3.3: Tạo dòng <tr> mới
    // TODO: Tạo phần tử <tr> bằng document.createElement("tr")
    const newRow = document.createElement("tr");
    // Bước 3.4: Tạo các ô <td> cho STT, Họ tên, Email, Hành động
    // TODO: Tạo <td> cho STT → textContent tạm = ""
    const tdOrder = document.createElement("td");
    tdOrder.textContent = "";
    // TODO: Tạo <td> cho Họ tên → textContent = studentName
    const tdName = document.createElement("td");
    tdName.textContent = studentName;
    // TODO: Tạo <td> cho Email → textContent = studentEmail
    // TODO: Tạo <td> cho Hành động → chứa nút "Xoá"
    const tdEmail = document.createElement("td");
    tdEmail.textContent = studentEmail;
    const tdAction = document.createElement("td");
    // Bước 3.5: Tạo nút "Xoá" trong ô Hành động
    // TODO: Tạo <button> có class "btn-delete" và textContent = "Xoá"
    // TODO: Gắn sự kiện click cho nút xoá:
    //       - Xoá dòng <tr> khỏi bảng
    //       - Gọi updateStudentOrder()
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Xoá";
    tdAction.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
        const row = this.closest("tr");
        studentTableBody.removeChild(row);
        updateStudentOrder();
    });
    // Bước 3.6: Ghép các <td> vào <tr>, rồi thêm <tr> vào <tbody>
    // TODO: appendChild từng <td> vào <tr>
    // TODO: appendChild <tr> vào studentTableBody
    newRow.appendChild(tdOrder);
    newRow.appendChild(tdName);
    newRow.appendChild(tdEmail);
    newRow.appendChild(tdAction);
    studentTableBody.appendChild(newRow);
    // Bước 3.7: Xoá giá trị ô input và cập nhật STT
    // TODO: Đặt inputStudentName.value = "" và inputStudentEmail.value = ""
    // TODO: Gọi hàm updateStudentOrder()
    inputStudentName.value = "";
    inputStudentEmail.value = "";
    updateStudentOrder();
});

// Bước 4: Hàm cập nhật lại số thứ tự
function updateStudentOrder() {
    // TODO: Lấy tất cả các dòng <tr> trong studentTableBody
    //       Gợi ý: studentTableBody.querySelectorAll("tr")
    const allRows = studentTableBody.querySelectorAll("tr");
    // TODO: Duyệt vòng lặp, gán lại giá trị cột đầu tiên = i + 1
    //       Gợi ý: allRows[i].cells[0].textContent = i + 1
    for (let i = 0; i < allRows.length; i++) {
        allRows[i].cells[0].textContent = i + 1;
    }
}
