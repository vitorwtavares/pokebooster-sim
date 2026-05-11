import { useQuery } from '@tanstack/react-query'

import { fetchPackCards } from '@/services/requests'

export const usePackCardsQuery = (setId: string, totalCardsInSet: number) =>
  useQuery({
    queryKey: ['packCards', setId, totalCardsInSet],
    queryFn: () => fetchPackCards(setId, totalCardsInSet),
    enabled: false,
    staleTime: 0,
    gcTime: 0,
  })
