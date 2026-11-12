import { type FilterItem, FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

/** Selected option ids grouped by filter id — the modal's working (draft) state */
export type FilterSelection = Record<string, string[]>

export const toSelection = (filter: SearchRequestFilter): FilterSelection =>
	Object.fromEntries(filter.map(item => [item.id, [...item.optionsIds]]))

export const isOptionSelected = (
	selection: FilterSelection,
	filterId: string,
	optionId: string
) => selection[filterId]?.includes(optionId) ?? false

export const toggleOption = (
	selection: FilterSelection,
	filterId: string,
	optionId: string
): FilterSelection => {
	const current = selection[filterId] ?? []
	const next = current.includes(optionId)
		? current.filter(id => id !== optionId)
		: [...current, optionId]

	return { ...selection, [filterId]: next }
}

/**
 * Converts the draft selection to the API output format.
 * Filters and options keep the order from the API, unknown ids and
 * filters without selected options are dropped.
 */
export const toSearchRequestFilter = (
	selection: FilterSelection,
	filterItems: FilterItem[]
): SearchRequestFilter =>
	filterItems.flatMap(item => {
		const selectedIds = selection[item.id] ?? []
		const optionsIds = item.options
			.map(option => option.id)
			.filter(id => selectedIds.includes(id))

		return optionsIds.length > 0
			? [{ id: item.id, type: FilterType.OPTION, optionsIds }]
			: []
	})
