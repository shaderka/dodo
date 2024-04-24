import { Extra } from '@/app/models/extra'
import { NextResponse } from 'next/server'

export async function POST(req) {
	const { name } = await req.json()
	const cat = await Extra.findOne({ name })
	if (cat) return Response.json({ message: 'exists' }, { status: 444 })
	const catDoc = await Extra.create({ name })
	return Response.json(true)
}

export async function PUT(req) {
	const { _id, name } = await req.json()
	const cat = await Extra.findOne({ name })
	if (cat) return Response.json({ message: 'exists' }, { status: 444 })
	await Extra.updateOne({ _id }, { name })
	return Response.json(true)
}

export async function GET() {
	return Response.json(await Extra.find().sort({ name: 1 }))
}

export async function DELETE(req) {
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')
	await Extra.deleteOne({ _id })
	return Response.json(true)
}
