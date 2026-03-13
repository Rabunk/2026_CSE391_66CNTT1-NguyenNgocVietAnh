// Kịch bản:
// - Có thẻ hồ sơ hiển thị: Họ tên, Tuổi, Ngành học
// - Nhấn "Chỉnh sửa" → hiện form chỉnh sửa, ẩn nút chỉnh sửa
//   Các ô input tự động điền giá trị hiện tại
// - Nhấn "Lưu" → cập nhật thông tin hiển thị, ẩn form, hiện nút chỉnh sửa
// - Nhấn "Huỷ" → ẩn form, không thay đổi gì, hiện lại nút chỉnh sửa

// Bước 1: Truy xuất các phần tử DOM cần tác động
// Các phần tử hiển thị
const displayName = document.getElementById("displayName");
const displayAge = document.getElementById("displayAge");
const displayMajor = document.getElementById("displayMajor");

// Các ô input trong form chỉnh sửa
const editName = document.getElementById("editName");
const editAge = document.getElementById("editAge");
const editMajor = document.getElementById("editMajor");

// Các nút và form
const editFormContainer = document.getElementById("editForm");
const btnEditProfile = document.getElementById("btnEditProfile");
const btnSaveProfile = document.getElementById("btnSaveProfile");
const btnCancelEdit = document.getElementById("btnCancelEdit");

// Bước 2: Gắn sự kiện click cho nút "Chỉnh sửa hồ sơ"
btnEditProfile.addEventListener("click", function () {
    // TODO: Điền giá trị hiện tại vào các ô input
    //       Gợi ý: editName.value = displayName.textContent
    //              editAge.value = displayAge.textContent
    //              editMajor.value = displayMajor.textContent
    editName.value = displayName.textContent;
    editAge.value = displayAge.textContent;
    editMajor.value = displayMajor.textContent;
    // TODO: Hiện form chỉnh sửa → editFormContainer.style.display = "block"
    editFormContainer.style.display = "block";
    // TODO: Ẩn nút chỉnh sửa → btnEditProfile.style.display = "none"
    btnEditProfile.style.display = "none";
});

// Bước 3: Gắn sự kiện click cho nút "Lưu"
btnSaveProfile.addEventListener("click", function () {
    // TODO: Lấy giá trị từ các ô input
    const newName = editName.value.trim();
    const newAge = editAge.value.trim();
    const newMajor = editMajor.value.trim();

    // TODO: Kiểm tra nếu có ô nào trống → alert và return
    if (newName === "" || newAge === "" || newMajor === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    // TODO: Cập nhật nội dung hiển thị
    //       Gợi ý: displayName.textContent = newName
    //              displayAge.textContent = newAge
    //              displayMajor.textContent = newMajor
    displayName.textContent = newName;
    displayAge.textContent = newAge;
    displayMajor.textContent = newMajor;
    // TODO: Ẩn form chỉnh sửa → editFormContainer.style.display = "none"
    editFormContainer.style.display = "none";
    // TODO: Hiện lại nút chỉnh sửa → btnEditProfile.style.display = "block"
    btnEditProfile.style.display = "block";
});

// Bước 4: Gắn sự kiện click cho nút "Huỷ"
btnCancelEdit.addEventListener("click", function () {
    // TODO: Ẩn form chỉnh sửa → editFormContainer.style.display = "none"
    editFormContainer.style.display = "none";
    // TODO: Hiện lại nút chỉnh sửa → btnEditProfile.style.display = "block"
    btnEditProfile.style.display = "block";
});
