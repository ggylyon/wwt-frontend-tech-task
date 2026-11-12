import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface CheckboxProps
	extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
	label: ReactNode
}

export const Checkbox = ({
	label,
	className = '',
	...props
}: CheckboxProps) => (
	<label
		className={`flex cursor-pointer items-start gap-4 text-base leading-6 ${className}`}
	>
		<input
			type="checkbox"
			className="peer sr-only"
			{...props}
		/>
		<span
			aria-hidden="true"
			className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-gray-400 bg-white text-white transition-colors peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary peer-checked:[&>svg]:opacity-100"
		>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				className="size-3.5 opacity-0"
			>
				<path
					d="M3 8.5 6.5 12 13 4.5"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
		<span>{label}</span>
	</label>
)
