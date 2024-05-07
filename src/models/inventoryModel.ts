import { Product, ProductSKU } from './productModels';

export interface Inventory {
	_id?: string;
	product?: Product | null;
	productSKU?: ProductSKU | null;
	originalQuantity?: number;
	soldQuantity?: number;
	currentQuantity?: number;
	historyImport: HistoryImport[];
}

export interface HistoryImport {
	_id?: string;
	product?: Product | null;
	productCode?: string | null;
	productSKU?: ProductSKU | null;
	productSKUBarcode?: string | null;
	quantityImport?: number;
	priceImport?: number;
	inventoryId?: string;
	createdAt?: string;
}

export interface InventoryParams {
	offset?: string;
	limit?: string;
	currentQuantity?: string;
}
