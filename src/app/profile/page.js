'use client'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { resolve } from 'styled-jsx/css'
import { signOut, signIn } from 'next-auth/react'
import { CLIENT_PUBLIC_FILES_PATH } from 'next/dist/shared/lib/constants'

export default function Profile() {
	const router = useRouter()
	const session = useSession()
	const { status, update } = session

	// let Name = session?.data?.userData?.fio
	// let Email = session?.data?.userData?.email

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [oldEmail, setOldEmail] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		if (status === 'authenticated') {
			// setName(session?.data?.userData?.fio)
			// setEmail(session?.data?.userData?.email)
			fetch('api/profile').then(response => {
				response.json().then(data => {
					console.log(data)
					setOldEmail(data.email)
					setName(data.fio)
					setEmail(data.email)
					setIsAdmin(data.admin)
				})
			})
		}
	}, [session, status])

	if (status === 'unauthenticated') {
		router.push('/')
	}

	const handleProfile = async e => {
		e.preventDefault()

		const resUE = await fetch('api/userExists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		})

		const { user } = await resUE.json()

		if (user && email != oldEmail) {
			toast.error('Email уже используется')
			return
		}

		const res = await fetch('api/profile', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email }),
		})

		console.log(res)
		if (res.ok) {
			toast.success('Изменения сохранены')
			setOldEmail(email)
			update()
		}
	}

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				<form className='max-w-md mx-auto mt-10' onSubmit={handleProfile}>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							onChange={e => {
								setEmail(e.target.value)
							}}
							type='email'
							name='email'
							id='email'
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
							placeholder=' '
							value={email}
						/>
						<label
							htmlFor='email'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							Email
						</label>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							onChange={e => setName(e.target.value)}
							type='text'
							name='name'
							id='name'
							value={name}
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
							placeholder=' '
						/>
						<label
							htmlFor='name'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							Имя
						</label>
					</div>

					<button
						type='submit'
						className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center '
					>
						Сохранить
					</button>
				</form>
			</div>
			<Footer />
		</div>
	)
}
