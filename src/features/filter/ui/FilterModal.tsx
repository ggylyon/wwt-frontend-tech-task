import { type FormEvent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	toSearchRequestFilter,
	toSelection,
	toggleOption,
	useFilterStore
} from '@/entities/filter'
import { Button, CloseButton, Dialog } from '@/shared/ui'

import { useFilterItemsQuery } from '../model/useFilterItemsQuery'
import { ConfirmDialog } from './ConfirmDialog'
import { FilterSection } from './FilterSection'

interface FilterModalProps {
	onClose: () => void
}

export const FilterModal = ({ onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const titleId = useId()
	const formId = useId()

	const savedFilter = useFilterStore(state => state.filter)
	const setFilter = useFilterStore(state => state.setFilter)
	const {
		data: filterItems,
		isPending,
		isError,
		refetch
	} = useFilterItemsQuery()

	// Draft is pre-filled with the saved filter and lives only while the modal is mounted
	const [selection, setSelection] = useState(() => toSelection(savedFilter))
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const handleToggle = (filterId: string, optionId: string) =>
		setSelection(current => toggleOption(current, filterId, optionId))

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsConfirmOpen(true)
	}

	const handleConfirm = () => {
		if (filterItems) {
			setFilter(toSearchRequestFilter(selection, filterItems))
		}
		onClose()
	}

	const renderContent = () => {
		if (isPending) {
			return (
				<p
					role="status"
					className="py-16 text-center text-grey-300"
				>
					{t('loading')}
				</p>
			)
		}

		if (isError) {
			return (
				<div
					role="alert"
					className="flex flex-col items-center gap-4 py-16 text-center"
				>
					<p className="text-grey-400">{t('error')}</p>
					<Button
						variant="secondary"
						onClick={() => refetch()}
					>
						{t('retry')}
					</Button>
				</div>
			)
		}

		return filterItems.map(item => (
			<FilterSection
				key={item.id}
				item={item}
				selection={selection}
				onToggle={handleToggle}
			/>
		))
	}

	return (
		<Dialog
			labelledBy={titleId}
			onClose={onClose}
		>
			{/* Side paddings follow the popup grids: 20px on mobile (375), 32px on desktop (1280) */}
			<div className="flex h-full flex-col md:max-h-[calc(100dvh-4rem)]">
				<header className="relative mx-5 border-b border-grey-200 pt-8 pb-6 md:mx-8 md:pt-10">
					{/* "Headline 2": Inter Medium 40px */}
					<h2
						id={titleId}
						className="px-10 text-center text-[32px] leading-tight font-medium md:text-[40px]"
					>
						{t('title')}
					</h2>
					<CloseButton
						aria-label={t('close')}
						className="absolute top-6 -right-2 md:top-8"
						onClick={onClose}
					/>
				</header>

				<form
					id={formId}
					className="min-h-0 flex-1 overflow-y-auto px-5 md:px-8"
					onSubmit={handleSubmit}
				>
					{renderContent()}
				</form>

				<footer className="mx-5 flex flex-col gap-4 border-t border-grey-200 py-6 md:mx-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:py-8">
					{/* "Hyper link button": Inter Medium 16px, primary.100 */}
					<button
						type="button"
						className="min-h-14 cursor-pointer self-center text-base font-medium text-primary-100 underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-brand-200 md:col-start-3 md:row-start-1 md:min-h-0 md:justify-self-end"
						onClick={() => setSelection({})}
					>
						{t('clear')}
					</button>
					<Button
						type="submit"
						form={formId}
						disabled={!filterItems}
						className="md:col-start-2 md:row-start-1"
					>
						{t('apply')}
					</Button>
				</footer>
			</div>

			{isConfirmOpen && (
				<ConfirmDialog
					onDismiss={() => setIsConfirmOpen(false)}
					onDiscard={onClose}
					onConfirm={handleConfirm}
				/>
			)}
		</Dialog>
	)
}
