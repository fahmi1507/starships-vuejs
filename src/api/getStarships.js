export const getStarships = async ( page = 1 ) => {
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`)
  const data = await response.json()
  if (data.detail === 'Not found') return [];
  return data.results
}

export const getStarshipDetail = async (id) => {
  const response = await fetch(`https://swapi.dev/api/starships/${id}`)
  const data = await response.json()
  return data
}

export const getStarshipByKeyword = async (keyword, page = 1) => {
  const response = await fetch(`https://swapi.dev/api/starships/?search=${keyword}&page=${page}`)
  const data = await response.json()
  if (data.detail === 'Not found') return [];
  return data.results
}