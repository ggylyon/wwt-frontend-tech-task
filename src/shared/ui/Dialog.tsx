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
 *
 * Mobile: full-screen popup. From `md`: centered popup, max 1280px wide.
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
			className={`m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-white p-0 text-black backdrop:bg-black/40 md:m-auto md:h-auto md:max-h-[calc(100dvh-4rem)] md:w-[calc(100%-4rem)] md:max-w-7xl md:rounded-xl md:shadow-xl ${className}`}
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
