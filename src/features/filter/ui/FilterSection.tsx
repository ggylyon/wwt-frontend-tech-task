import { type FilterSelection, isOptionSelected } from '@/entities/filter'
import type { FilterItem } from '@/shared/api/types/Filter'
import { Checkbox } from '@/shared/ui'

interface FilterSectionProps {
	item: FilterItem
	selection: FilterSelection
	onToggle: (filterId: string, optionId: string) => void
}

export const FilterSection = ({
	item,
	selection,
	onToggle
}: FilterSectionProps) => (
	<fieldset className="border-b border-gray-200 py-8 last:border-b-0">
		<legend className="sr-only">{item.name}</legend>
		<h3
			aria-hidden="true"
			className="mb-6 text-2xl font-medium"
		>
			{item.name}
		</h3>
		<ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
			{item.options.map(option => (
				<li key={option.id}>
					<Checkbox
						label={option.name}
						title={option.description}
						checked={isOptionSelected(selection, item.id, option.id)}
						onChange={() => onToggle(item.id, option.id)}
					/>
				</li>
			))}
		</ul>
	</fieldset>
)
