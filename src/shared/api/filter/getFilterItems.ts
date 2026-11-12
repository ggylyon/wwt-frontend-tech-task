import type { FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

const MOCK_DELAY_MS = 300

export const getFilterItems = async (): Promise<FilterItem[]> => {
	await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS))

	return filterData.filterItems as FilterItem[]
}
