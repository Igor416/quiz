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
			<div className='col-10 d-flex justify-content-between position-relative'>
				<Link to='/' className='h1 no-link'>
					<img
						style={{maxHeight: '150%', transform: 'translate(-37.5%, -50%)'}}
						src='/static/assets/hat.png'
						className='position-absolute img-fluid'
					/>
					<span>Своя игра</span>
				</Link>
				<a href={isLoggedIn ? '/auth/logout/' : 'auth/login/'} className='no-link position-relative'>
					<button className='btn btn-lg bg-green'>{isLoggedIn ? 'Выйти' : 'Войти'}</button>
					<img
						style={{maxHeight: '200%', transform: 'translateY(-25%)'}}
						src='/static/assets/gingy.png'
						className='position-absolute img-fluid'
					/>
				</a>
			</div>
			<div className='col-1' />
		</div>
		{isLoggedIn && <Outlet />}
	</div>
}
