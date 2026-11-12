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
		className={`flex cursor-pointer items-start gap-3 text-base leading-6 font-normal text-black ${className}`}
	>
		<input
			type="checkbox"
			className="peer sr-only"
			{...props}
		/>
		<span
			aria-hidden="true"
			className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border border-grey-400 bg-white text-white transition-colors peer-hover:border-black peer-checked:border-black peer-checked:bg-black peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-200 peer-checked:[&>svg]:opacity-100"
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
