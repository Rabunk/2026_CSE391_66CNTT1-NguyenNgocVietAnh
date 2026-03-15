const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const successMessage = document.getElementById("successMessage");

function showError(field, message) {
    document.getElementById(field + "Error").textContent = message;
}

function clearError(field) {
    document.getElementById(field + "Error").textContent = "";
}

function validateFullname() {
    const value = fullname.value.trim();
    if (value === "") {
        showError("fullname", "Không được để trống");
        return false;
    }
    if (value.length < 3) {
        showError("fullname", "Phải ≥ 3 ký tự");
        return false;
    }
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (!regex.test(value)) {
        showError("fullname", "Chỉ được chứa chữ cái");
        return false;
    }
    clearError("fullname");
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
        showError("email", "Không được để trống");
        return false;
    }
    if (!regex.test(value)) {
        showError("email", "Email không hợp lệ");
        return false;
    }
    clearError("email");
    return true;
}

function validatePhone() {
    const value = phone.value.trim();
    const regex = /^0\d{9}$/;
    if (!regex.test(value)) {
        showError("phone", "SĐT phải 10 số và bắt đầu bằng 0");
        return false;
    }
    clearError("phone");
    return true;
}

function validatePassword() {
    const value = password.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(value)) {
        showError("password", "≥8 ký tự, có chữ hoa, chữ thường và số");
        return false;
    }
    clearError("password");
    return true;
}

function validateConfirmPassword() {
    if (confirmPassword.value !== password.value) {
        showError("confirmPassword", "Mật khẩu không khớp");
        return false;
    }
    clearError("confirmPassword");
    return true;
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        showError("gender", "Phải chọn giới tính");
        return false;
    }
    clearError("gender");
    return true;
}

function validateTerms() {
    if (!terms.checked) {
        showError("terms", "Phải đồng ý điều khoản");
        return false;
    }
    clearError("terms");
    return true;
}



fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);
fullname.addEventListener("input", () => clearError("fullname"));
email.addEventListener("input", () => clearError("email"));
phone.addEventListener("input", () => clearError("phone"));
password.addEventListener("input", () => clearError("password"));
confirmPassword.addEventListener("input", () => clearError("confirmPassword"));

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const valid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirmPassword() &
        validateGender() &
        validateTerms();
    if (valid) {
        form.style.display = "none";
        successMessage.classList.remove("d-none");
        successMessage.textContent =
            "Đăng ký thành công! 🎉 Xin chào " + fullname.value;
    }
});