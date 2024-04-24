import mongoose, { model, models, Schema } from 'mongoose'

const OrderSchema = new Schema(
	{
		user: mongoose.Types.ObjectId,
		streetAddress: String,
		cartProducts: Object,
		status: mongoose.Types.ObjectId,
	},
	{ timeseries: true }
)

export const Order = models?.Order || model('Order', OrderSchema)
