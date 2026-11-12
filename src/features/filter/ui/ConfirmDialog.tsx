import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, CloseButton, Dialog } from '@/shared/ui'

interface ConfirmDialogProps {
	/** Return to editing without a decision */
	onDismiss: () => void
	/** Keep the previously saved filter */
	onDiscard: () => void
	/** Save the new filter */
	onConfirm: () => void
}

export const ConfirmDialog = ({
	onDismiss,
	onDiscard,
	onConfirm
}: ConfirmDialogProps) => {
	const { t } = useTranslation('filter')
	const titleId = useId()

	return (
		<Dialog
			labelledBy={titleId}
			onClose={onDismiss}
		>
			<div className="relative flex h-full flex-col px-5 pt-8 pb-6 md:px-8 md:pt-10 md:pb-10">
				<CloseButton
					aria-label={t('confirm.close')}
					className="absolute top-6 right-3 md:top-8 md:right-6"
					onClick={onDismiss}
				/>
				{/* "Headline 2": Inter Medium 40px */}
				<h2
					id={titleId}
					className="px-10 text-center text-[32px] leading-tight font-medium md:text-[40px]"
				>
					{t('confirm.title')}
				</h2>
				<div className="mt-auto flex flex-col gap-4 pt-8 md:mt-16 md:flex-row md:justify-center md:gap-8 md:pt-0">
					<Button
						variant="secondary"
						onClick={onDiscard}
					>
						{t('confirm.discard')}
					</Button>
					<Button
						autoFocus
						onClick={onConfirm}
					>
						{t('confirm.apply')}
					</Button>
				</div>
			</div>
		</Dialog>
	)
}
