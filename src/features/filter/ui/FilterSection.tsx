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
	<fieldset className="border-b border-grey-200 py-6 last:border-b-0 md:py-8">
		<legend className="sr-only">{item.name}</legend>
		<h3
			aria-hidden="true"
			className="mb-4 text-xl leading-7 font-medium md:mb-6"
		>
			{item.name}
		</h3>
		<ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 md:gap-y-6">
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
