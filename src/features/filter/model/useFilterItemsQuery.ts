import { useQuery } from '@tanstack/react-query'

import { filterQueryKeys, getFilterItems } from '@/shared/api/filter'

export const useFilterItemsQuery = () =>
	useQuery({
		queryKey: filterQueryKeys.items(),
		queryFn: getFilterItems,
		staleTime: Infinity
	})
