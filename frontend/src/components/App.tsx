import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { getAuthStatus } from '../api'

export default function App() {
	const [isLoggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		getAuthStatus().then(setLoggedIn);
	}, [])

	return <div
		style={{backgroundImage: 'linear-gradient(315deg, var(--light-red), var(--bs-red) 74%)', height: '100vh'}}
		className='d-flex flex-column text-white'
	>
		<div className='d-flex py-5 shadow-lg'>
			<div className='col-1' />
			<div className='col-10 d-flex justify-content-between'>
				<Link to='/' className='h1 no-link'>Своя игра</Link>
				<a href={isLoggedIn ? '/auth/logout/' : 'auth/login/'} className='no-link'>
					<button className='btn btn-lg bg-green'>{isLoggedIn ? 'Выйти' : 'Войти'}</button>
				</a>
			</div>
			<div className='col-1' />
		</div>
		<div className='d-flex flex-grow-1 mt-5 pt-5'>
			<div className='col-1' />
			{isLoggedIn && <div className='col-10'>
				<Outlet />
			</div>}
			<div className='col-1' />
		</div>
	</div>
}
