const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const btnAdd = document.getElementById("btnAdd");
const tableBody = document.getElementById("tableBody");
const totalStudent = document.getElementById("totalStudent");
const avgScore = document.getElementById("avgScore");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const scoreHeader = document.getElementById("scoreHeader");
const sortIcon = document.getElementById("sortIcon");

let students = [];
let filteredStudents = [];
let sortDirection = null;

btnAdd.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addStudent();
    }
});

function addStudent() {

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "") {
        alert("Không để trống tên");
        return;
    }

    if (isNaN(score) || score < 0 || score > 10) {
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    applyFilters();

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

function scoreRanking(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable() {
    if (filteredStudents.length == 0) {
        tableBody.innerHTML = `
        <tr>
            <td colspan ="5" class="text-center text-muted">Không có sinh viên nào</td>
        </tr>`;
        return;
    }

    tableBody.innerHTML = "";

    filteredStudents.forEach((sv, index) => {

        const tr = document.createElement("tr");

        if (sv.score < 5) {
            tr.style.backgroundColor = "yellow";
        }

        const sindex = students.indexOf(sv);

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${scoreRanking(sv.score)}</td>
            <td>
                <button class="btn btn-danger btn-sm deleteBtn" data-index="${sindex}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    updateStatistics();
}
tableBody.addEventListener("click", function (e) {

    const btn = e.target.closest(".deleteBtn");

    if (!btn) return;

    const index = btn.dataset.index;

    students.splice(index, 1);

    applyFilters();
});
function updateStatistics() {

    totalStudent.textContent = students.length;

    let sum = 0;

    students.forEach(s => sum += s.score);

    let avg = students.length ? (sum / students.length).toFixed(2) : 0;

    avgScore.textContent = avg;
}

searchInput.addEventListener("input", applyFilters);

filterSelect.addEventListener("change", applyFilters);

scoreHeader.addEventListener("click", function() {
    if (sortDirection === "asc") {
        sortDirection = "desc";
        sortIcon.textContent = "▼";
    } else {
        sortDirection = "asc";
        sortIcon.textContent = "▲";
    }
    applyFilters();
});

function applyFilters() {
    const keyword = searchInput.value.trim().toLowerCase();
    const filter = filterSelect.value;

    filteredStudents = students.filter(s => {
        const matchesKeyword = s.name.toLowerCase().includes(keyword);
        let matchRank = true;

        if (filter !== "all") {
            const rank = scoreRanking(s.score).toLowerCase();
            matchRank = rank === filter;
        }
        return matchesKeyword && matchRank;
    });

    if (sortDirection === "asc") {
        filteredStudents.sort((a, b) => a.score - b.score);
    } else if (sortDirection === "desc") {
        filteredStudents.sort((a, b) => b.score - a.score);
    } else {
        sortIcon.textContent = "";
    }

    renderTable();
}
applyFilters();