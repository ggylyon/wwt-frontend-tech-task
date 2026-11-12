import type { ComponentPropsWithoutRef } from 'react'

export const CloseButton = ({
	className = '',
	...props
}: Omit<ComponentPropsWithoutRef<'button'>, 'children'>) => (
	<button
		type="button"
		className={`flex size-10 cursor-pointer items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary ${className}`}
		{...props}
	>
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			className="size-6"
		>
			<path
				d="M6 6l12 12M18 6 6 18"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	</button>
)
