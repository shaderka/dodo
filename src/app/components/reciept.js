import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
// import template from '../reciept-template.docx'
import { Toaster, toast } from 'sonner'
export default function Reciept() {
	const path = 'http://localhost:3000/reciept-template.docx'

	const resume = {
		id: '1',
		day: '19',
		month: '04',
		year:'24',
		name:'Сырная, 30 + Томаты',
		sum: '350',
		sum_price:'350',
		price:'350',

	}

	const trigger = e => {
		e.preventDefault()
		return generateDocument(resume, path)
	}

	const generateDocument = async (resume, templatePath) => {
		try {
			PizZipUtils.getBinaryContent(templatePath, (error, content) => {
				if (error) throw error

				const zip = PizZip(content)

				const templateDoc = new Docxtemplater(zip, {
					paragraphLoop: true,
					linebreaks: true,
				})

				templateDoc.render(resume)
				const generatedDoc = templateDoc.getZip().generate({
					type: 'blob',
					mimeType:
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					compression: 'DEFLATE',
				})

				saveAs(generatedDoc, 'товарный чек.docx')
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<button
			onClick={trigger}
			className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
		>
			Печать
		</button>
	)
}
