import { useQuery } from 'react-query'
import { ICharacter } from '../interfaces/character.interface'
import useMarvelServiceForQuery from '../services/marvelServiceForQuery/marvelServiceForQuery'

const useCharacter = (id: number | string | null) => {
	const { getCharacter } = useMarvelServiceForQuery()

	return useQuery<ICharacter, Error, ICharacter>(
		['character', id],
		() => getCharacter(id!),
		{
			enabled: !!id,
			staleTime: 2 * 60 * 1000,
			refetchOnWindowFocus: false
		}
	)
}

export default useCharacter
