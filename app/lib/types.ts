export interface Product extends Record<string, any> {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: Array<string>
}

export interface ProductsList extends Record<string, any> {
	products: Product[]
	total: number
	skip: number
	limit: number
}

