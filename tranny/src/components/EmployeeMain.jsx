import React, { useMemo, useState } from 'react'
import EmployeeDataInit from '../data/employeeData'
import Header from './Header'
import EmployeeModal from './EmployeeModal'

export default function EmployeeMain() {
  const [employees, setEmployees] = useState(EmployeeDataInit)
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return employees
    return employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.includes(q)
    )
  }, [employees, query])

  function handleAdd() {
    setEditing(null)
    setShowModal(true)
  }

  function handleSave(emp) {
    if (editing) {
      setEmployees(prev => prev.map(p => (p.id === emp.id ? { ...p, ...emp } : p)))
    } else {
      const newId = employees.length ? Math.max(...employees.map(x => x.id)) + 1 : 1
      setEmployees(prev => [...prev, { ...emp, id: newId }])
    }
    setShowModal(false)
  }

  function handleEdit(id) {
    const emp = employees.find(x => x.id === id)
    if (!emp) return
    setEditing(emp)
    setShowModal(true)
  }

  function handleDelete(id) {
    if (!confirm('Bạn có chắc muốn xoá nhân sự này?')) return
    setEmployees(prev => prev.filter(x => x.id !== id))
  }

  return (
    <div>
      <Header searchTerm={query} onSearch={setQuery} onAdd={handleAdd} />
      <main className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="mb-0">Danh sách nhân sự</h2>
          <button className="btn btn-primary" onClick={handleAdd}>+ Thêm mới</button>
        </div>
        <div className="card shadow-lg employees-card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>SĐT</th>
                    <th>Vị trí</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted py-4">Không có dữ liệu</td>
                    </tr>
                  ) : (
                    filtered.map((emp, idx) => (
                      <tr key={emp.id}>
                        <td>{idx + 1}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.phone}</td>
                        <td>{emp.position}</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(emp.id)}>Sửa</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Xoá</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <EmployeeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        initialData={editing}
        mode={editing ? 'edit' : 'add'}
      />
    </div>
  )
}
