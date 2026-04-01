import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function EmployeeModal({ show, onHide, onSave, EmployeeData, mode = 'add' }) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [position, setPosition] = useState('')
	const [gender, setGender] = useState('Nam')

	useEffect(() => {
		if (EmployeeData) {
			setName(EmployeeData.name || '')
			setEmail(EmployeeData.email || '')
			setPhone(EmployeeData.phone || '')
			setPosition(EmployeeData.position || '')
			setGender(EmployeeData.gender || 'Nam')
		} else {
			setName('')
			setEmail('')
			setPhone('')
			setPosition('')
			setGender('Nam')
		}
	}, [EmployeeData, show])

	function handleSubmit(e) {
		e.preventDefault()
		// validation
		if (!name.trim()) return alert('Họ tên không được để trống')
		if (name.trim().length > 30) return alert('Họ tên tối đa 30 ký tự')
		if (!email.trim()) return alert('Email không được để trống')
		if (!/^\d{10}$/.test(phone)) return alert('Số điện thoại phải đúng 10 chữ số')

		const payload = {
			...(EmployeeData || {}),
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			position,
			gender,
		}
		onSave(payload)
	}

	return (
		<Modal show={show} onHide={onHide} size="lg" centered>
			<Form onSubmit={handleSubmit}>
				<Modal.Header className="bg-primary text-white" closeButton>
					<Modal.Title>{mode === 'add' ? 'Thêm nhân sự mới' : 'Sửa nhân sự'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row g-3">
						<div className="col-md-6">
							<Form.Group>
								<Form.Label>Họ tên</Form.Label>
								<Form.Control value={name} onChange={e => setName(e.target.value)} placeholder="Nhập họ tên" />
							</Form.Group>
						</div>
						<div className="col-md-6">
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email" />
							</Form.Group>
						</div>
						<div className="col-md-6">
							<Form.Group>
								<Form.Label>Số điện thoại</Form.Label>
								<Form.Control value={phone} onChange={e => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
							</Form.Group>
						</div>
						<div className="col-md-6">
							<Form.Group>
								<Form.Label>Vị trí</Form.Label>
								<Form.Select value={position} onChange={e => setPosition(e.target.value)}>
									<option value="">-- Chọn vị trí --</option>
									<option value="Nhân viên">Nhân viên</option>
									<option value="Quản lý">Quản lý</option>
									<option value="Giám đốc">Giám đốc</option>
								</Form.Select>
							</Form.Group>
						</div>
						<div className="col-md-6">
							<Form.Label>Giới tính</Form.Label>
							<div>
								<Form.Check inline label="Nam" name="gender" type="radio" id="g-nam" checked={gender === 'Nam'} onChange={() => setGender('Nam')} />
								<Form.Check inline label="Nữ" name="gender" type="radio" id="g-nu" checked={gender === 'Nữ'} onChange={() => setGender('Nữ')} />
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="success" type="submit">Lưu</Button>
					<Button variant="secondary" onClick={onHide}>Hủy</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

