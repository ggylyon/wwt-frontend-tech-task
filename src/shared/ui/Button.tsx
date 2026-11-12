import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
	primary: 'bg-primary text-white hover:bg-primary-hover',
	outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
}

export const Button = ({
	variant = 'primary',
	type = 'button',
	className = '',
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={`inline-flex min-h-16 min-w-46 cursor-pointer items-center justify-center rounded-lg px-8 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${variantClassNames[variant]} ${className}`}
		{...props}
	/>
)
