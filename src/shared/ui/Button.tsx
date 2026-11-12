import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
	primary: 'bg-brand-200 text-white hover:bg-brand-300 active:bg-brand-300',
	secondary:
		'border border-grey-200 bg-white text-black hover:border-grey-300 hover:bg-grey-100'
}

export const Button = ({
	variant = 'primary',
	type = 'button',
	className = '',
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={`inline-flex min-h-14 min-w-[184px] cursor-pointer items-center justify-center rounded-lg px-8 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClassNames[variant]} ${className}`}
		{...props}
	/>
)
