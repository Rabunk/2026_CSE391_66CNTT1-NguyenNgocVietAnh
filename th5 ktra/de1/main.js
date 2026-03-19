const STORAGE_KEY = "students";

const DEFAULT_STUDENTS = [
  { id: "SV001", name: "Nguyễn Văn A", email: "a.nguyen@example.com", phone: "0123456789", major: "IT", gender: "Nam" },
  { id: "SV002", name: "Trần Thị B", email: "b.tran@example.com", phone: "0987654321", major: "Business", gender: "Nữ" },
  { id: "SV003", name: "Phạm Văn C", email: "c.pham@example.com", phone: "0912345678", major: "Design", gender: "Nam" },
  { id: "SV004", name: "Lê Thị D", email: "d.le@example.com", phone: "0934567890", major: "IT", gender: "Nữ" },
  { id: "SV005", name: "Hoàng Văn E", email: "e.hoang@example.com", phone: "0901234567", major: "Business", gender: "Nam" },
];

const $ = (id) => document.getElementById(id);

const FIELD_META = [
  { key: "name", id: "fullName", validate: (v) => (v.trim() ? null : "Họ và tên không được để trống.") },
  { key: "id", id: "studentId", validate: (v) => (/^SV\d{3,}$/i.test(v.trim()) ? null : "Mã sinh viên phải theo định dạng SVxxx (ví dụ SV001).") },
  { key: "email", id: "email", validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Email không hợp lệ.") },
  { key: "phone", id: "phone", validate: (v) => (/^\d{9,11}$/.test(v.trim()) ? null : "Số điện thoại phải là số và có 9-11 chữ số.") },
  { key: "major", id: "major", validate: (v) => (v ? null : "Vui lòng chọn ngành học.") },
  { key: "gender", id: "gender", validate: (v) => (["Nam", "Nữ"].includes(v) ? null : "Vui lòng chọn giới tính.") },
];

const getStudents = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [...DEFAULT_STUDENTS];
  try { return JSON.parse(raw) ?? [...DEFAULT_STUDENTS]; }
  catch { return [...DEFAULT_STUDENTS]; }
};

const saveStudents = (students) => localStorage.setItem(STORAGE_KEY, JSON.stringify(students));

const q = (k) => new URLSearchParams(location.search).get(k);

const setError = (id, msg) => {
  const el = $(id);
  if (!el) return;
  el.classList.add("is-invalid");
  const fb = $(`${id}Error`);
  if (fb) fb.textContent = msg;
};

const clearErrors = () => {
  document.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  document.querySelectorAll(".invalid-feedback").forEach((el) => (el.textContent = ""));
};

const buildStudent = () => {
  const data = FIELD_META.reduce((acc, f) => {
    if (f.key === "gender") {
      const r = document.querySelector("input[name='gender']:checked");
      acc.gender = r ? r.value : "";
    } else acc[f.key] = ($(f.id)?.value || "").trim();
    return acc;
  }, {});
  return data;
};

const validateStudent = (student, { isEdit = false, originalId = "" } = {}) => {
  const errors = FIELD_META.reduce((errs, f) => {
    const msg = f.validate(student[f.key] ?? "");
    if (msg) errs[f.key] = msg;
    return errs;
  }, {});

  const normalizedId = student.id.trim().toUpperCase();
  const duplicates = getStudents().some((s) => s.id.toUpperCase() === normalizedId);
  if (duplicates && (!isEdit || originalId.toUpperCase() !== normalizedId)) {
    errors.id = "Mã sinh viên đã tồn tại.";
  }
  return errors;
};

const showErrors = (errors) => {
  clearErrors();
  Object.entries(errors).forEach(([k, msg]) => {
    const f = FIELD_META.find((f) => f.key === k);
    if (!f) return;
    if (k === "gender") {
      const el = $("genderError");
      if (el) el.textContent = msg;
    } else setError(f.id, msg);
  });
};

const loadEdit = () => {
  const sid = q("sid");
  if (!sid) return null;
  const student = getStudents().find((s) => s.id.toUpperCase() === sid.toUpperCase());
  if (!student) return null;

  $("formTitle").textContent = "Sửa thông tin sinh viên";
  $("fullName").value = student.name;
  $("studentId").value = student.id;
  $("studentId").setAttribute("readonly", "readonly");
  $("email").value = student.email;
  $("phone").value = student.phone;
  $("major").value = student.major;
  const g = document.querySelector(`input[name="gender"][value="${student.gender}"]`);
  if (g) g.checked = true;
  return student.id;
};

const renderList = () => {
  const students = getStudents();
  const tbody = document.querySelector("#studentTable tbody");
  const empty = $("emptyState");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (!students.length) {
    if (empty) empty.style.display = "block";
    return;
  }
  if (empty) empty.style.display = "none";

  students.forEach((s) => {
    const tr = document.createElement("tr");
    const cols = [s.name, s.id, s.email, s.phone, s.major, s.gender];
    cols.forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });

    const act = document.createElement("td");
    act.classList.add("text-end");

    const btn = (txt, cls, action) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = cls;
      b.textContent = txt;
      b.dataset.action = action;
      b.dataset.id = s.id;
      return b;
    };

    act.appendChild(btn("Sửa", "btn btn-warning btn-sm me-2", "edit"));
    act.appendChild(btn("Xóa", "btn btn-danger btn-sm", "delete"));
    tr.appendChild(act);
    tbody.appendChild(tr);
  });
};

const initListPage = () => {
  renderList();
  document.getElementById("studentTable")?.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-action]");
    if (!b) return;
    const action = b.dataset.action;
    const id = b.dataset.id;
    if (action === "edit") return (location.href = `register-student.html?sid=${encodeURIComponent(id)}`);
    if (action === "delete" && confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
      saveStudents(getStudents().filter((s) => s.id.toUpperCase() !== id.toUpperCase()));
      renderList();
    }
  });
};

const initFormPage = () => {
  const originalId = loadEdit();
  const form = $("studentForm");
  $("cancelBtn")?.addEventListener("click", () => (location.href = "students.html"));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const student = buildStudent();
    const errors = validateStudent(student, { isEdit: Boolean(originalId), originalId });
    if (Object.keys(errors).length) return showErrors(errors);

    const students = getStudents();
    if (originalId) {
      const idx = students.findIndex((s) => s.id.toUpperCase() === originalId.toUpperCase());
      if (idx > -1) students[idx] = student;
    } else students.unshift(student);
    saveStudents(students);
    location.href = "students.html";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if ($("studentTable")) initListPage();
  if ($("studentForm")) initFormPage();
});
