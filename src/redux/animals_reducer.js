import {animalsAPI} from "../api/api";
import {getAnimalSelector} from "./animals_selectors";
import {useSelector} from "react-redux";
import {setMe_} from "./me_reducer";

let _ = require('lodash');

const SET_ANIMALS_COUNT = 'ANIMALS_COUNT'
const SET_GET_ANIMALS = 'GET_ANIMALS'
const SET_PUT_ANIMAL = 'PUT_ANIMAL'
const SET_GET_ANIMAL = 'GET_ANIMAL'
const SET_ACCESS_LEVELS_ANIMALS = "SET_ACCESS_LEVELS_ANIMALS"
const SET_ANIMALS_LOGOUT = "SET_ANIMALS_LOGOUT"
let initialState = {
    get_animals: [],
    animals_count: 0,
    put_animal: "",
    get_animal: "",
    access_levels_animals: ""
}

const animals_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ANIMALS_COUNT: {
            return {
                ...state,
                animals_count: action.animals_count
            }
        }
        case SET_PUT_ANIMAL: {
            return {
                ...state,
                put_animal: JSON.stringify(action.put_animal)
            }
        }
        case SET_GET_ANIMAL: {
            return {
                ...state,
                get_animal: JSON.stringify(action.get_animal)
            }
        }
        case SET_ANIMALS_LOGOUT: {
            return {
                ...state,
                get_animals: [],
                animals_count: 0,
                put_animal: "",
                get_animal: "",
                access_levels_animals: ""
            }
        }
        case SET_ACCESS_LEVELS_ANIMALS: {
            return {
                ...state,
                access_levels_animals: JSON.stringify(action.access_levels_animals)
            }
        }
        case SET_GET_ANIMALS: {
            if (!_.isEqual(state.get_animals, action.get_animals)) return {
                ...state,
                get_animals: action.get_animals
            }
        }

        default: {
            return state;
        }
    }
}

export let setAnimalsCount_ = (animals_count) => {
    return {type: SET_ANIMALS_COUNT, animals_count}
}

export const setAnimalsCount = () => {
    return (dispatch) => {
        animalsAPI.getAnimalsCount().then(res => {
            dispatch(setAnimalsCount_(res.data))
        })
    }
}

export let setPutAnimal_ = (put_animal) => {
    return {type: SET_PUT_ANIMAL, put_animal}
}

export const setPutAnimal = (animal_id) => {
    return (dispatch) => {
        animalsAPI.getAnimal(animal_id).then(res => {
            dispatch(setPutAnimal_(res.data))
        })
    }
}
export let setGetAnimal_ = (get_animal) => {
    return {type: SET_GET_ANIMAL, get_animal}
}

export const setGetAnimal = (animal_id) => {
    return (dispatch) => {
        animalsAPI.getAnimal(animal_id).then(res => {
            if (res) dispatch(setGetAnimal_(res.data))
            else dispatch(setGetAnimal_(null))
        })
    }
}
export let setGetAnimals_ = (get_animals) => {
    return {type: SET_GET_ANIMALS, get_animals}
}

export const setGetAnimals = (currentPage, limit) => {
    return (dispatch) => {
        animalsAPI.getAnimals(currentPage, limit).then(res => {
            dispatch(setGetAnimals_(res.data))
        })
    }
}

export let setAccessLevelsAnimals_ = (access_levels_animals) => {
    return {type: SET_ACCESS_LEVELS_ANIMALS, access_levels_animals}
}

export const setAccessLevelsAnimals = () => {
    return async (dispatch) => {
        await animalsAPI.getAccessLevels().then(res => {
            if (res) dispatch(setAccessLevelsAnimals_(res.data))
            else dispatch(setAccessLevelsAnimals_(null))
        })
    }
}

export const postAnimal = (cage_id, type, name, cold_resistant) => {
    return (dispatch) => {
        animalsAPI.postAnimal(cage_id, type, name, cold_resistant).then(res => {
            if (res.status == 200) {
                alert("success")
                dispatch(setGetAnimals())
            } else {
                alert(res.data.message)
            }
        })

    }
}

export const deleteAnimal = (animal_id) => {
    return (dispatch) => {
        animalsAPI.deleteAnimal(animal_id).then(res => {
            if (res.status == 200) {
                dispatch(setGetAnimals())
            }
        })
    }
}

export const putAnimal = (animal_id) => {
    return (dispatch) => {
        animalsAPI.getAnimal(animal_id).then(res => {
            dispatch(putAnimal_(res.data))
        })
    }
}
export const putAnimal_ = (put_animal) => {
    return {type: SET_PUT_ANIMAL, put_animal}
}

export const putAnimalPush = (id, cage_id, type, name, cold_resistant) => {
    return (dispatch) => {
        animalsAPI.putAnimal(id, cage_id, type, name, cold_resistant).then(res => {
            if (res.status == 200) {
                alert("success")
                dispatch(setGetAnimals())
            }
        })
    }
}

export const logout_animals = () => {
    return {type: SET_ANIMALS_LOGOUT}
}
export default animals_reducer
