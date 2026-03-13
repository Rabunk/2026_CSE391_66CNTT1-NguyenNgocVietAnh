// Kịch bản:
// - Có một khung nội dung mẫu (preview box)
// - Nhấn các nút màu → thay đổi màu nền của khung nội dung
// - Nhấn nút cỡ chữ (Nhỏ/Vừa/Lớn) → thay đổi cỡ chữ trong khung
// - Nhấn nút "Ẩn / Hiện" → ẩn hoặc hiện khung nội dung

// Bước 1: Truy xuất các phần tử DOM cần tác động
const previewBox = document.getElementById("previewBox");
const btnToggleVisibility = document.getElementById("btnToggleVisibility");

// Các nút thay đổi cỡ chữ
const btnSizeSmall = document.getElementById("btnSizeSmall");
const btnSizeNormal = document.getElementById("btnSizeNormal");
const btnSizeLarge = document.getElementById("btnSizeLarge");

// Lấy tất cả các nút màu
const allColorButtons = document.querySelectorAll(".btn-color");

// Bước 2: Gắn sự kiện click cho từng nút màu (dùng vòng lặp)
// Gợi ý: Duyệt qua allColorButtons, mỗi nút lấy data-color rồi gán cho previewBox
for (let i = 0; i < allColorButtons.length; i++) {
    allColorButtons[i].addEventListener("click", function () {
        // TODO: Lấy giá trị màu từ thuộc tính data-color của nút được click
        //       Gợi ý: this.getAttribute("data-color")
        const color = this.getAttribute("data-color");
        // TODO: Gán màu đó cho previewBox.style.backgroundColor
        previewBox.style.backgroundColor = color;
    });
}

// Bước 3: Gắn sự kiện click cho nút "Nhỏ"
btnSizeSmall.addEventListener("click", function () {
    // TODO: Đổi previewBox.style.fontSize thành "12px"
    previewBox.style.fontSize = "12px";
});

// Bước 4: Gắn sự kiện click cho nút "Vừa"
btnSizeNormal.addEventListener("click", function () {
    // TODO: Đổi previewBox.style.fontSize thành "16px"
    previewBox.style.fontSize = "16px";
});

// Bước 5: Gắn sự kiện click cho nút "Lớn"
btnSizeLarge.addEventListener("click", function () {
    // TODO: Đổi previewBox.style.fontSize thành "22px"
    previewBox.style.fontSize = "22px";
});

// Bước 6: Gắn sự kiện click cho nút "Ẩn / Hiện"
btnToggleVisibility.addEventListener("click", function () {
    // TODO: Kiểm tra nếu previewBox đang hiện (display !== "none")
    //       → ẩn: previewBox.style.display = "none"
    //       Nếu đang ẩn → hiện: previewBox.style.display = "block"
    if (previewBox.style.display !== "none") {
        previewBox.style.display = "none";
    }
    else {
        previewBox.style.display = "block";
    }
});
