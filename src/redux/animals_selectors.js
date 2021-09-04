
export const getAnimalsSelector= (state) => {
    return state.animals.get_animals
}
export const animalsCountSelector= (state) => {
    return state.animals.animals_count
}
export const putAnimalSelector= (state) => {
    return state.animals.put_animal
}
export const getAnimalSelector= (state) => {
    return state.animals.get_animal
}
export const getAccessLevelsAnimalsSelector= (state) => {
    return state.animals.access_levels_animals
}