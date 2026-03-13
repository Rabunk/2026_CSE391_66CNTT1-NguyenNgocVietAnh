// Kịch bản: Nhấp chọn nút "Thêm đoạn văn mới"
// Kết quả: Thêm một đoạn văn mới vào cuối danh sách

// Bước 1: Truy xuất các phần tử DOM cần tác động
const paragraphListContainer = document.getElementById("paragraphList");
const btnAddParagraph = document.getElementById("btnAddParagraph");

// Biến đếm số thứ tự đoạn văn
let paragraphCount = paragraphListContainer.children.length;

// Bước 2: Gắn sự kiện click cho nút thêm đoạn văn
btnAddParagraph.addEventListener("click", function () {
    // Tăng biến đếm
    paragraphCount++;

    // Tạo phần tử <p> mới
    const newParagraphEl = document.createElement("p");
    newParagraphEl.textContent = "Đoạn văn " + paragraphCount;

    // Thêm phần tử mới vào cuối danh sách trên cây DOM
    paragraphListContainer.appendChild(newParagraphEl);
});