import { connectMongoDB } from '@/app/lib/mongodb'
import { MenuItem } from '@/app/models/menuitem'
import { Order } from '@/app/models/order'

export async function GET(req) {
	await connectMongoDB()

	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')

	let ord = []
	const orders = await Order.find()
	orders.map(async order => {
		const item = await MenuItem.findById(order.cartProducts.item)
		const name = item.name
		let pizzaSiza
		item.sizes.map(size => {
			if (size._id === order.cartProducts.size) console.log(size)
			else console.log(size._id, order.cartProducts.size)
		})

		// products.map(async item => {
		// 	const prod = await MenuItem.findById(item.item)

		// })
	})
	//const items = await MenuItem.find({"sizes._id":order.})
	return Response.json(true)
}
