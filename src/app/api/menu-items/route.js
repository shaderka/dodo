import { connectMongoDB } from '@/app/lib/mongodb'
import { MenuItem } from '@/app/models/menuitem'
import mongoose from 'mongoose'

export async function POST(req) {
	const data = await req.json()
	console.log(data)
	const itemDoc = await MenuItem.create(data)
	return Response.json(itemDoc)
}

export async function PUT(req) {
	await connectMongoDB()
	const { _id, ...data } = await req.json()
	await MenuItem.findByIdAndUpdate(_id, data)
	return Response.json(true)
}

export async function GET() {
	await connectMongoDB()
	return Response.json(await MenuItem.find())
}

export async function DELETE() {
	await connectMongoDB()
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')
	await MenuItem.deleteOne({ _id })
	return Response.json(true)
}
