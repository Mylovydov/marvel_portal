import { useQuery } from 'react-query'
import { ICharacter } from '../interfaces/character.interface'
import useMarvelServiceForQuery from '../services/marvelServiceForQuery/marvelServiceForQuery'

const useCharacter = (id: number | string) => {
	const { getCharacter } = useMarvelServiceForQuery()
	return useQuery<ICharacter, Error, ICharacter>(
		['character', id],
		({ queryKey }) => {
			console.log(`queryKey`, queryKey)
			return getCharacter(id)
		}
	)
}

export default useCharacter
