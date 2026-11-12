import { type FilterItem, FilterType } from '@/shared/api/types/Filter'

import {
	isOptionSelected,
	toSearchRequestFilter,
	toSelection,
	toggleOption
} from './selection'

const filterItems: FilterItem[] = [
	{
		id: 'MEAL',
		name: 'Meal',
		type: FilterType.OPTION,
		options: [
			{ id: 'breakfast', name: 'Breakfast' },
			{ id: 'lunch', name: 'Lunch' }
		]
	},
	{
		id: 'BED',
		name: 'Bed',
		type: FilterType.OPTION,
		options: [{ id: 'twin', name: 'Twin' }]
	}
]

describe('filter selection', () => {
	it('toggles options immutably', () => {
		const initial = {}
		const selected = toggleOption(initial, 'MEAL', 'lunch')

		expect(initial).toEqual({})
		expect(isOptionSelected(selected, 'MEAL', 'lunch')).toBe(true)
		expect(
			isOptionSelected(toggleOption(selected, 'MEAL', 'lunch'), 'MEAL', 'lunch')
		).toBe(false)
	})

	it('maps selection to SearchRequestFilter in API order, skipping empty and unknown', () => {
		const result = toSearchRequestFilter(
			{ BED: [], MEAL: ['lunch', 'unknown', 'breakfast'], UNKNOWN: ['x'] },
			filterItems
		)

		expect(result).toEqual([
			{
				id: 'MEAL',
				type: FilterType.OPTION,
				optionsIds: ['breakfast', 'lunch']
			}
		])
	})

	it('round-trips saved filter to selection', () => {
		const saved = toSearchRequestFilter(
			{ MEAL: ['lunch'], BED: ['twin'] },
			filterItems
		)

		expect(toSelection(saved)).toEqual({ MEAL: ['lunch'], BED: ['twin'] })
	})
})
