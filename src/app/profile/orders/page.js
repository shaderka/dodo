'use client'

import Link from 'next/link'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import Reciept from '@/app/components/reciept'

export default function OrdersPage() {
	const [orders, setOrders] = useState([])

	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	if (!isAdm) {
		router.push('/profile')
	}

	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = () => {
		fetch('/api/orders').then(res => {})
	}

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				<div className='max-w-[600px] mx-auto'>orders</div>
				<Reciept />
			</div>
			<Footer />
		</div>
	)
}
