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
					className="py-16 text-center text-gray-500"
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
					<p className="text-gray-700">{t('error')}</p>
					<Button
						variant="outline"
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
			className="max-w-[1280px]"
		>
			<div className="flex max-h-[calc(100dvh-2rem)] flex-col">
				<header className="relative mx-6 border-b border-gray-200 pt-10 pb-6 sm:mx-10">
					<h2
						id={titleId}
						className="text-center text-3xl font-medium sm:text-[40px] sm:leading-tight"
					>
						{t('title')}
					</h2>
					<CloseButton
						aria-label={t('close')}
						className="absolute top-6 -right-2"
						onClick={onClose}
					/>
				</header>

				<form
					id={formId}
					className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-10"
					onSubmit={handleSubmit}
				>
					{renderContent()}
				</form>

				<footer className="mx-6 grid grid-cols-1 items-center gap-4 border-t border-gray-200 py-8 sm:mx-10 sm:grid-cols-[1fr_auto_1fr]">
					<Button
						type="submit"
						form={formId}
						disabled={!filterItems}
						className="sm:col-start-2"
					>
						{t('apply')}
					</Button>
					<button
						type="button"
						className="cursor-pointer justify-self-center text-base font-medium text-gray-900 underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary sm:justify-self-end"
						onClick={() => setSelection({})}
					>
						{t('clear')}
					</button>
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
