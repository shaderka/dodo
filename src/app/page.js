'use client'

import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Head from 'next/head'
import FloatingPizza from './components/floatingPizza'
import Filter from './components/filter'
import { useEffect, useState } from 'react'
import Categories from './profile/categories/page'
import MenuItemTile from './components/layout/menuItemTile'
import MenuItem from './components/layout/menuItem'

export default function Home() {
	const [cats, setCats] = useState([])
	const [menuItems, setMenuItems] = useState([])

	useEffect(() => {
		fetch('/api/categories').then(res => {
			res.json().then(cats => setCats(cats))
		})
		fetch('/api/menu-items').then(res => {
			res.json().then(items => setMenuItems(items))
		})
	}, [])

	cats.map(c => {
		if (c.name == 'Другое') cats.push(cats.splice(cats.indexOf(c), 1)[0])
		if (c.name == 'Пиццы') cats.unshift(cats.splice(cats.indexOf(c), 1)[0])
	})

	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<div className='flex-grow'>
				<Filter />
				{cats?.length > 0 &&
					cats.map(
						c =>
							menuItems.filter(item => item.category == c._id).length > 0 && (
								<div key={c._id} id={c.name} className=' mt-12'>
									<h1 className='text-4xl font-extrabold'>{c.name}</h1>
									<div className='grid sm:grid-cols-3 gap-4 mt-6'>
										{menuItems
											.filter(item => item.category == c._id)
											.map(item => (
												<MenuItem key={item._id} {...item} />
											))}
									</div>
								</div>
							)
					)}
			</div>
			<Footer />
		</div>
	)
}
