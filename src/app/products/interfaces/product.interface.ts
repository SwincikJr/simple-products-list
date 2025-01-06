import { ProductType } from "./productType.interface"

export interface Product {
    id: string,
    productTypeId: string,
    name: string,
    createdAt: string,
    productType?: ProductType
}