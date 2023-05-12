export const getStarships = async ( page = 1 ) => {
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`)
  const data = await response.json()
  if (data.detail === 'Not found') return [];
  return data.results
}

export const getStarshipDetail = async (id) => {
  const response = await fetch(`https://swapi.dev/api/starships/${id}`)
  const { 
    films, created, edited, url, 
    cost_in_credits, length, crew, 
    consumables, MGLT, pilots, ...rest
  } = await response.json()
  return {...rest}
}

export const getStarshipByKeyword = async (keyword, page = 1) => {
  const response = await fetch(`https://swapi.dev/api/starships/?search=${keyword}&page=${page}`)
  const data = await response.json()
  if (data.detail === 'Not found') return [];
  return data.results
}