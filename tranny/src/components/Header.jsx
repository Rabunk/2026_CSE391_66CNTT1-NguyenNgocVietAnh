import React from 'react'

export default function Header({ searchTerm, onSearch }) {
	return (
		<header className="app-header py-3">
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center gap-4">
					<h1 className="fw-bold text-white mb-0">Quản lý nhân sự</h1>
					<nav className="d-flex gap-3 align-items-center">
						<a className="text-white-50 text-decoration-none">Trang chủ</a>
						<a className="text-white-50 text-decoration-none">Liên hệ</a>
					</nav>
				</div>
				<div className="d-flex align-items-center gap-2">
					<input
						id="searchInput"
						value={searchTerm}
						onChange={e => onSearch(e.target.value)}
						type="text"
						className="form-control search-input"
						placeholder="Tìm kiếm..."
					/>
					<button id="searchBtn" className="btn btn-sm btn-light ms-2" onClick={() => onSearch(searchTerm)}>
						Tìm
					</button>
				</div>
			</div>
		</header>
	)
}

