// Kịch bản:
// Kho chứa một số loại trái cây
// - Người dùng nhập tên trái cây vào ô input
// - Khi click nút "Tìm kiếm", nếu trái cây có trong kho → hiển thị tên + hình ảnh
//   Nếu không có → hiển thị thông báo "Không tìm thấy"

// Bước 1: Truy xuất các phần tử DOM cần tác động
const inputFruitName = document.getElementById("inputFruitName");
const btnSearchFruit = document.getElementById("btnSearchFruit");
const resultMessage = document.getElementById("resultMessage");
const resultImageContainer = document.getElementById("resultImageContainer");

// Danh sách trái cây có sẵn trong kho
const availableFruits = ["apple", "banana", "orange", "grape", "mango"];

// Bước 2: Gắn sự kiện click cho nút tìm kiếm
btnSearchFruit.addEventListener("click", function () {
    // Bước 3: Lấy giá trị người dùng nhập, chuẩn hoá về chữ thường
    const searchedFruitName = inputFruitName.value.trim().toLowerCase();

    // Bước 4: Kiểm tra trái cây có trong kho hay không
    if (availableFruits.includes(searchedFruitName)) {
        // Tìm thấy → hiển thị kết quả
        resultMessage.textContent = "Chúng tôi có " + searchedFruitName + " trong kho!";
        resultMessage.classList.add("found");
        resultImageContainer.innerHTML =
            '<img src="images/' + searchedFruitName + '.jpg" alt="' + searchedFruitName + '">';
    } else {
        // Không tìm thấy → hiển thị thông báo mặc định
        resultMessage.textContent = "Không tìm thấy trái cây này!";
        resultMessage.classList.remove("found");
        resultImageContainer.innerHTML =
            '<img src="images/no-image.jpg" alt="No Image">';
    }

    // Bước 5: Xoá giá trị trong ô input sau khi hiển thị kết quả
    inputFruitName.value = "";
});
