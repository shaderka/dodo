'use client'

import { useEffect, useState } from 'react'
import EditableImage from './editableImage'
import { usePathname } from 'next/navigation'
import FormPizza from './menuItemFormPizza'
import { toast, Toaster } from 'sonner'

export default function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || '')
	const [name, setName] = useState(menuItem?.name)
	const [description, setDescription] = useState(menuItem?.description || '')
	const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
	const [sizes, setSizes] = useState(menuItem?.sizes || [])
	const [category, setCategory] = useState(menuItem?.category || '')
	const [cats, setCats] = useState([])
	const [extrasList, setExtrasList] = useState([])
	const [extrasPrices, setExtrasPrices] = useState(menuItem?.extrasPrices || [])
	const [isPizza, setIsPizza] = useState(true)
	const [pizzaId, setPizzaId] = useState('')

	const path = usePathname()

	useEffect(() => {
		fetch('/api/categories').then(res => {
			res.json().then(categories => {
				setCats(categories)
			})
		})
		fetch('/api/extras').then(res => {
			res.json().then(extras => {
				setExtrasList(extras)
			})
		})
	}, [])

	const findPizza = () => {
		cats.map(c => {
			if (!pizzaId) {
				if (c.name == 'Пиццы') setPizzaId(c._id)
			}
		})
	}

	findPizza()

	return (
		<form
			className='flex mb-10 mt-10'
			onSubmit={e => {
				if (!category) {
					if (pizzaId) setCategory(pizzaId)
					else {
						toast.error('Ошибка')
						return
					}
				}
				onSubmit(e, {
					image,
					name,
					description,
					basePrice,
					sizes,
					extrasPrices,
					category,
				})
			}}
		>
			<Toaster position='top-center' richColors />
			<EditableImage link={image} setLink={setImage} />
			<div className='grow ml-16'>
				<div className='relative z-0 grow mb-5 group mr-6'>
					<input
						onChange={e => {
							setName(e.target.value)
						}}
						type='text'
						name='name'
						id='name'
						className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
						placeholder=' '
						value={name}
					/>
					<label
						htmlFor='name'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Название
					</label>
				</div>
				<div className='relative z-0 grow mb-5 group mr-6'>
					<textarea
						onChange={e => {
							setDescription(e.target.value)
						}}
						name='desc'
						id='desc'
						className=' min-h-[100px] resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
						placeholder=' '
						value={description}
					/>
					<label
						htmlFor='desc'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Описание
					</label>
				</div>
				<div className='relative z-0 grow mb-5 group mr-6'>
					<input
						onChange={e => {
							setBasePrice(e.target.value)
						}}
						type='text'
						name='price'
						id='price'
						className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
						placeholder=' '
						value={basePrice}
					/>
					<label
						htmlFor='price'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Цена
					</label>
				</div>
				<div className='relative z-0 grow mb-5 group mr-6'>
					<select
						onChange={e => {
							setCategory(e.target.value)
							if (e.target.value == pizzaId) setIsPizza(true)
							else setIsPizza(false)
						}}
						type='text'
						name='category'
						id='category'
						className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
						placeholder=' '
						value={category || pizzaId}
					>
						{cats?.length > 0 &&
							cats.map(c => (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							))}
					</select>
					<label
						htmlFor='category'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Категория
					</label>
				</div>
				{isPizza && (
					<FormPizza
						sizes={sizes}
						setSizes={setSizes}
						extrasPrices={extrasPrices}
						setExtrasPrices={setExtrasPrices}
						extrasList={extrasList}
					></FormPizza>
				)}

				<button
					type='submit'
					className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center mb-4'
				>
					{path.includes('new') ? 'Добавить' : 'Сохранить'}
				</button>
			</div>
		</form>
	)
}
