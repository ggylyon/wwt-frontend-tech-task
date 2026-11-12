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
			className="max-w-[1280px]"
		>
			<div className="relative flex flex-col items-center gap-12 px-6 py-16 sm:px-10 sm:py-24">
				<CloseButton
					aria-label={t('confirm.close')}
					className="absolute top-6 right-6"
					onClick={onDismiss}
				/>
				<h2
					id={titleId}
					className="text-center text-3xl font-medium sm:text-[40px] sm:leading-tight"
				>
					{t('confirm.title')}
				</h2>
				<div className="flex w-full flex-col-reverse justify-center gap-4 sm:flex-row sm:gap-8">
					<Button
						variant="outline"
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
