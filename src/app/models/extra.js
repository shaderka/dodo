const { Schema, model, models } = require('mongoose')

const ExtraSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{ timestamps: true }
)

export const Extra = models?.Extra || model('Extra', ExtraSchema)
