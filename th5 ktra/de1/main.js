const STORAGE_KEY = "students";

const DEFAULT_STUDENTS = [
  { id: "SV001", name: "Nguyễn Văn A", email: "a.nguyen@example.com", phone: "0123456789", major: "IT", gender: "Nam" },
  { id: "SV002", name: "Trần Thị B", email: "b.tran@example.com", phone: "0987654321", major: "Business", gender: "Nữ" },
  { id: "SV003", name: "Phạm Văn C", email: "c.pham@example.com", phone: "0912345678", major: "Design", gender: "Nam" },
  { id: "SV004", name: "Lê Thị D", email: "d.le@example.com", phone: "0934567890", major: "IT", gender: "Nữ" },
  { id: "SV005", name: "Hoàng Văn E", email: "e.hoang@example.com", phone: "0901234567", major: "Business", gender: "Nam" },
];

const $id = (id) => document.getElementById(id);
const qs = (s) => document.querySelector(s);

const FIELD_META = [
  { key: "name", id: "fullName", validate: (v) => (v.trim() ? null : "Họ và tên không được để trống.") },
  { key: "id", id: "studentId", validate: (v) => (/^SV\d{3,}$/i.test(v.trim()) ? null : "Mã sinh viên phải theo định dạng SVxxx (ví dụ SV001).") },
  { key: "email", id: "email", validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Email không hợp lệ.") },
  { key: "phone", id: "phone", validate: (v) => (/^\d{9,11}$/.test(v.trim()) ? null : "Số điện thoại phải là số và có 9-11 chữ số.") },
  { key: "major", id: "major", validate: (v) => (v ? null : "Vui lòng chọn ngành học.") },
  { key: "gender", id: "gender", validate: (v) => (["Nam", "Nữ"].includes(v) ? null : "Vui lòng chọn giới tính.") },
];

const readStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [...DEFAULT_STUDENTS];
  } catch {
    return [...DEFAULT_STUDENTS];
  }
};
const writeStore = (students) => localStorage.setItem(STORAGE_KEY, JSON.stringify(students));

const queryParam = (k) => new URLSearchParams(location.search).get(k);

const clearErrors = () => {
  document.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  document.querySelectorAll(".invalid-feedback").forEach((el) => (el.textContent = ""));
};

const setFieldError = (fieldId, msg) => {
  const el = $id(fieldId);
  if (el) el.classList.add("is-invalid");
  const fb = $id(fieldId + "Error");
  if (fb) fb.textContent = msg;
};

const collectForm = () => {
  const out = {};
  FIELD_META.forEach((f) => {
    if (f.key === "gender") {
      const r = qs("input[name='gender']:checked");
      out.gender = r ? r.value : "";
    } else {
      out[f.key] = ($id(f.id)?.value || "").trim();
    }
  });
  return out;
};

const validate = (student, { isEdit = false, originalId = "" } = {}) => {
  const errors = {};
  FIELD_META.forEach((f) => {
    const v = student[f.key] ?? "";
    const msg = f.validate(v);
    if (msg) errors[f.key] = msg;
  });

  const idNorm = (student.id || "").trim().toUpperCase();
  const exists = readStore().some((s) => s.id.toUpperCase() === idNorm);
  if (exists && (!isEdit || originalId.toUpperCase() !== idNorm)) {
    errors.id = "Mã sinh viên đã tồn tại.";
  }
  return errors;
};

const showErrors = (errors) => {
  clearErrors();
  Object.entries(errors).forEach(([k, msg]) => {
    const meta = FIELD_META.find((f) => f.key === k);
    if (!meta) return;
    if (k === "gender") {
      const el = $id("genderError");
      if (el) el.textContent = msg;
    } else setFieldError(meta.id, msg);
  });
};

const loadEditData = () => {
  const sid = queryParam("sid");
  if (!sid) return null;
  const student = readStore().find((s) => s.id.toUpperCase() === sid.toUpperCase());
  if (!student) return null;

  $id("formTitle").textContent = "Sửa thông tin sinh viên";
  $id("fullName").value = student.name;
  $id("studentId").value = student.id;
  $id("studentId").setAttribute("readonly", "readonly");
  $id("email").value = student.email;
  $id("phone").value = student.phone;
  $id("major").value = student.major;
  const g = qs(`input[name="gender"][value="${student.gender}"]`);
  if (g) g.checked = true;
  return student.id;
};

const renderList = () => {
  const students = readStore();
  const tbody = qs("#studentTable tbody");
  const empty = $id("emptyState");
  if (!tbody) return;

  if (!students.length) {
    tbody.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }
  if (empty) empty.style.display = "none";

  const rows = students.map((s) => {
    return `<tr>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.id)}</td>
      <td>${escapeHtml(s.email)}</td>
      <td>${escapeHtml(s.phone)}</td>
      <td>${escapeHtml(s.major)}</td>
      <td>${escapeHtml(s.gender)}</td>
      <td class="text-end">
        <button type="button" class="btn btn-warning btn-sm me-2" data-action="edit" data-id="${escapeAttr(s.id)}">Sửa</button>
        <button type="button" class="btn btn-danger btn-sm" data-action="delete" data-id="${escapeAttr(s.id)}">Xóa</button>
      </td>
    </tr>`;
  }).join("");
  tbody.innerHTML = rows;
};

// minimal escaping for safety in generated HTML
const escapeHtml = (s = "") => String(s)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const escapeAttr = (s = "") => escapeHtml(s).replaceAll('"', "&quot;");

const initListPage = () => {
  renderList();
  qs("#studentTable")?.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-action]");
    if (!b) return;
    const action = b.dataset.action;
    const id = b.dataset.id;
    if (action === "edit") {
      location.href = `register-student.html?sid=${encodeURIComponent(id)}`;
      return;
    }
    if (action === "delete" && confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
      writeStore(readStore().filter((s) => s.id.toUpperCase() !== id.toUpperCase()));
      renderList();
    }
  });
};

const initFormPage = () => {
  const originalId = loadEditData();
  $id("cancelBtn")?.addEventListener("click", () => (location.href = "students.html"));

  $id("studentForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const student = collectForm();
    const errors = validate(student, { isEdit: Boolean(originalId), originalId });
    if (Object.keys(errors).length) {
      showErrors(errors);
      return;
    }

    const students = readStore();
    if (originalId) {
      const idx = students.findIndex((s) => s.id.toUpperCase() === originalId.toUpperCase());
      if (idx > -1) students[idx] = student;
    } else {
      students.unshift(student);
    }
    writeStore(students);
    location.href = "students.html";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if ($id("studentTable")) initListPage();
  if ($id("studentForm")) initFormPage();
});
