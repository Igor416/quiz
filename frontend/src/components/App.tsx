import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { getAuthStatus } from '../api'

export default function App() {
	const [isLoggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		getAuthStatus().then(setLoggedIn);
	}, [])

	return <div
		style={{backgroundImage: 'linear-gradient(315deg, #6610f2, #6f42c1 75%)', height: '100vh'}}
		className='d-flex flex-column text-white'
	>
		<div className='d-flex py-5 shadow-lg'>
			<div className='col-1' />
			<div className='col-10 d-flex justify-content-between position-relative'>
				<Link to='/' className='h1 no-link'>
					<span>Своя игра</span>
				</Link>
				{!isLoggedIn ? <a href='auth/login/' className='no-link position-relative'>
					<button className='btn btn-lg bg-primary'>Войти</button>
				</a> : <button className='btn btn-lg bg-primary'>By @new_viperr_member</button>}
			</div>
			<div className='col-1' />
		</div>
		{isLoggedIn && <Outlet />}
	</div>
}
