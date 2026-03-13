// Kịch bản:
// - Có một số hiển thị giá trị ban đầu là 0
// - Nhấn nút "Tăng" → giá trị tăng thêm 1
// - Nhấn nút "Giảm" → giá trị giảm đi 1
// - Nhấn nút "Reset" → giá trị trở về 0
// - Giá trị > 0: chữ màu xanh lá | < 0: chữ màu đỏ | = 0: chữ màu đen

// Bước 1: Truy xuất các phần tử DOM cần tác động
const counterValueEl = document.getElementById("counterValue");
const btnIncrease = document.getElementById("btnIncrease");
const btnDecrease = document.getElementById("btnDecrease");
const btnReset = document.getElementById("btnReset");

// Biến lưu giá trị đếm hiện tại
let currentCount = 0;

// Bước 2: Gắn sự kiện click cho nút "Tăng"
btnIncrease.addEventListener("click", function () {
    // TODO: Tăng currentCount lên 1
    currentCount += 1;
    // TODO: Cập nhật nội dung hiển thị của counterValueEl
    counterValueEl.textContent = currentCount;
    // TODO: Gọi hàm updateCounterColor() để đổi màu
    updateCounterColor();
});

// Bước 3: Gắn sự kiện click cho nút "Giảm"
btnDecrease.addEventListener("click", function () {
    // TODO: Giảm currentCount đi 1
    currentCount -= 1;
    // TODO: Cập nhật nội dung hiển thị của counterValueEl
    counterValueEl.textContent = currentCount;
    // TODO: Gọi hàm updateCounterColor() để đổi màu
    updateCounterColor();
});

// Bước 4: Gắn sự kiện click cho nút "Reset"
btnReset.addEventListener("click", function () {
    // TODO: Đặt currentCount về 0
    currentCount = 0;
    // TODO: Cập nhật nội dung hiển thị của counterValueEl
    counterValueEl.textContent = currentCount;
    // TODO: Gọi hàm updateCounterColor() để đổi màu
    updateCounterColor();
});

// Bước 5: Hàm cập nhật màu chữ dựa vào giá trị
function updateCounterColor() {
    // TODO: Nếu currentCount > 0 → đổi màu chữ thành "green"
        if (currentCount > 0) {
            counterValueEl.style.color = "green";
        }
    // TODO: Nếu currentCount < 0 → đổi màu chữ thành "red"
        else if (currentCount > 0) {
            counterValueEl.style.color = "red";
        }
    // TODO: Nếu currentCount === 0 → đổi màu chữ thành "#333"
        else {
            counterValueEl.style.color = "#333";
        }
}
