import type { FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

const MOCK_DELAY_MS = 300

/** Mock API request. Replace with a real `fetch` once the endpoint exists. */
export const getFilterItems = async (): Promise<FilterItem[]> => {
	await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS))

	return filterData.filterItems as FilterItem[]
}
