import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/entities/filter'
import { FilterModal } from '@/features/filter'
import { Button } from '@/shared/ui'

export const App = () => {
	const { t } = useTranslation('home')
	const resultTitleId = useId()
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const filter = useFilterStore(state => state.filter)

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center gap-10 px-4 py-16">
			<h1 className="text-center text-4xl text-gray-600 sm:text-6xl">
				{t('title')}
			</h1>

			<Button
				aria-haspopup="dialog"
				onClick={() => setIsFilterOpen(true)}
			>
				{t('openFilter')}
			</Button>

			<section
				aria-labelledby={resultTitleId}
				className="w-full"
			>
				<h2
					id={resultTitleId}
					className="mb-3 text-xl font-medium"
				>
					{t('selectedFilter')}
				</h2>
				<pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
					<code>{JSON.stringify(filter, null, 2)}</code>
				</pre>
			</section>

			{isFilterOpen && <FilterModal onClose={() => setIsFilterOpen(false)} />}
		</main>
	)
}
