// Kịch bản:
// - Có danh sách các thẻ (tags) hiển thị sẵn: HTML, CSS, JavaScript
// - Nhập tên thẻ mới → nhấn "Thêm" → thêm thẻ mới vào danh sách
// - Mỗi thẻ có nút "×" để xoá thẻ đó
// - Nút "Xoá tất cả" → xoá toàn bộ thẻ trong danh sách
// - Không cho thêm thẻ trùng tên (không phân biệt hoa/thường)
// - Cập nhật số lượng thẻ sau mỗi thay đổi

// Bước 1: Truy xuất các phần tử DOM cần tác động
const inputTagName = document.getElementById("inputTagName");
const btnAddTag = document.getElementById("btnAddTag");
const tagContainer = document.getElementById("tagContainer");
const btnRemoveAll = document.getElementById("btnRemoveAll");
const tagCountInfo = document.getElementById("tagCountInfo");

// Bước 2: Gắn sự kiện xoá cho các nút "×" có sẵn
const existingRemoveButtons = tagContainer.querySelectorAll(".tag-remove");
for (let i = 0; i < existingRemoveButtons.length; i++) {
    existingRemoveButtons[i].addEventListener("click", function () {
        // TODO: Xoá phần tử .tag-item chứa nút này
        //       Gợi ý: this.parentElement → lấy <span class="tag-item">
        //       Gợi ý: tagContainer.removeChild(tagItem) để xoá
        const tagItem = this.parentElement;
        tagContainer.removeChild(tagItem);
        // TODO: Gọi hàm updateTagCount()
        updateTagCount();
    });
}

// Bước 3: Gắn sự kiện click cho nút "Thêm"
btnAddTag.addEventListener("click", function () {
    // Bước 3.1: Lấy giá trị nhập vào
    const tagName = inputTagName.value.trim();

    // Bước 3.2: Kiểm tra ô input trống
    // TODO: Nếu tagName rỗng → alert("Vui lòng nhập tên thẻ!") rồi return
    if ( tagName === "") {
        alert("Vui long nhap ten the!");
        return;
    }
    // Bước 3.3: Kiểm tra thẻ trùng lặp
    // TODO: Lấy tất cả .tag-item hiện có trong tagContainer
    const existingTags = tagContainer.querySelectorAll(".tag-item");
    // TODO: Duyệt vòng lặp, so sánh textContent (bỏ ký tự "×")
    //       Gợi ý: existingTag.textContent.replace("×", "").trim().toLowerCase()
    let isDuplicate = false;
    existingTags.forEach(function(existingTag) {
        const existingTagName = existingTag.textContent.replace("x", "").trim().toLowerCase();
        if (existingTagName == tagName.toLowerCase()) {
            isDuplicate = true;
        }
    });
    // TODO: Nếu trùng → alert("Thẻ này đã tồn tại!") rồi return
    if (isDuplicate) {
        alert("The nay da ton tai!");
        return;
    }

    // Bước 3.4: Tạo thẻ mới
    // TODO: Tạo <span> có class "tag-item"
    const newTag = document.createElement("span");
    newTag.classList.add("tag-item");
    // TODO: Nội dung bên trong: tagName + nút "×"
    //       Gợi ý: newTag.innerHTML = tagName + ' <button class="tag-remove">×</button>'
    newTag.innerHTML = tagName + ' <button class="tag-remove">x</button>';
    // Bước 3.5: Gắn sự kiện xoá cho nút "×" trong thẻ mới
    // TODO: Lấy nút .tag-remove bên trong thẻ vừa tạo
    //       Gợi ý: newTag.querySelector(".tag-remove")
    const removeButton = newTag.querySelector(".tag-remove");
    // TODO: Gắn sự kiện click → xoá thẻ + gọi updateTagCount()
    removeButton.addEventListener("click", function() {
        const tagItem = this.parentElement;
        tagContainer.removeChild(tagItem);
        updateTagCount();
    })
    // Bước 3.6: Thêm thẻ vào container và cập nhật
    // TODO: tagContainer.appendChild(newTag)
    tagContainer.appendChild(newTag);
    // TODO: inputTagName.value = ""
    inputTagName.value = "";
    // TODO: Gọi updateTagCount()
    updateTagCount();
});

// Bước 4: Gắn sự kiện click cho nút "Xoá tất cả"
btnRemoveAll.addEventListener("click", function () {
    // TODO: Xoá toàn bộ nội dung trong tagContainer
    //       Gợi ý: tagContainer.innerHTML = ""
    tagContainer.innerHTML = "";
    // TODO: Gọi updateTagCount()
    updateTagCount();
});

// Bước 5: Hàm cập nhật số lượng thẻ
function updateTagCount() {
    // TODO: Đếm số phần tử .tag-item trong tagContainer
    //       Gợi ý: tagContainer.querySelectorAll(".tag-item").length
    const count = tagContainer.querySelectorAll(".tag-item").length;
    // TODO: Cập nhật tagCountInfo.textContent = "Số thẻ: " + count
    tagCountInfo.textContent = "So the: " + count;
}
