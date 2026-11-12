export const filterQueryKeys = {
	all: ['filter'] as const,
	items: () => [...filterQueryKeys.all, 'items'] as const
}
