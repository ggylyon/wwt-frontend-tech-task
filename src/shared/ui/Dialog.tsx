import { type ReactNode, useEffect, useRef } from 'react'

interface DialogProps {
	labelledBy: string
	onClose: () => void
	className?: string
	children: ReactNode
}

/**
 * Modal built on the native `<dialog>` element: focus trap, `Esc` handling,
 * top-layer stacking and `inert` background come from the browser.
 * Mount it to open, unmount it to close.
 */
export const Dialog = ({
	labelledBy,
	onClose,
	className = '',
	children
}: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = dialogRef.current

		if (dialog && !dialog.open) {
			dialog.showModal()
		}

		return () => dialog?.close()
	}, [])

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={labelledBy}
			aria-modal="true"
			className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-hidden rounded-2xl bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/50 ${className}`}
			onCancel={event => {
				event.preventDefault()
				onClose()
			}}
			onClick={event => {
				// Click on the backdrop: content is wrapped, so only the backdrop targets the dialog itself
				if (event.target === event.currentTarget) {
					onClose()
				}
			}}
		>
			{children}
		</dialog>
	)
}
