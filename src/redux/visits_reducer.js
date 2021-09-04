import {animalsAPI, visitsAPI} from "../api/api";

let _ = require('lodash');

const SET_VISITS_COUNT = 'SET_VISITS_COUNT'
const SET_GET_VISITS = 'SET_GET_VISITS'
const SET_PUT_VISIT = 'SET_PUT_VISIT'
const SET_GET_VISIT = 'SET_GET_VISIT'
const SET_VISITS_LOGOUT = "SET_VISITS_LOGOUT"
const SET_ACCESS_LEVELS_VISITS = "SET_ACCESS_LEVELS_VISITS"

let initialState = {
    get_visits: [],
    visits_count: 0,
    put_visit: "",
    get_visit: "",
    access_levels_animals: ""
}

const visits_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VISITS_COUNT: {
            return {
                ...state,
                visits_count: action.visits_count
            }
        }
        case SET_PUT_VISIT: {
            return {
                ...state,
                put_visit: JSON.stringify(action.put_visit)
            }
        }
        case SET_GET_VISIT: {
            return {
                ...state,
                get_visit: JSON.stringify(action.get_visit)
            }
        }
        case SET_VISITS_LOGOUT: {
            return {
                ...state,
                get_visits: [],
                visits_count: 0,
                put_visit: "",
                get_visit: "",
                access_levels_animals: ""
            }
        }
        case SET_ACCESS_LEVELS_VISITS: {
            return {
                ...state,
                access_levels_visits: JSON.stringify(action.access_levels_visits)
            }
        }
        case SET_GET_VISITS: {
            if (!_.isEqual(state.get_visits, action.get_visits)) return {
                ...state,
                get_visits: action.get_visits
            }
        }

        default: {
            return state;
        }
    }
}

export let setVisitsCount_ = (visits_count) => {
    return {type: SET_VISITS_COUNT, visits_count}
}

export const setVisitsCount = () => {
    return (dispatch) => {
        visitsAPI.getVisitsCount().then(res => {
            dispatch(setVisitsCount_(res.data))
        })
    }
}

export let setPutVisit_ = (put_visit) => {
    return {type: SET_PUT_VISIT, put_visit}
}

export const setPutVisit = (visit_id) => {
    return (dispatch) => {
        visitsAPI.getVisit(visit_id).then(res => {
            dispatch(setPutVisit_(res.data))
        })
    }
}
export let setGetVisit_ = (get_visit) => {
    return {type: SET_GET_VISIT, get_visit}
}

export const setGetVisit = (visit_id) => {
    return (dispatch) => {
        visitsAPI.getVisit(visit_id).then(res => {
            if (res) dispatch(setGetVisit_(res.data))
            else dispatch(setGetVisit_(null))
        })
    }
}
export let setGetVisits_ = (get_visits) => {
    return {type: SET_GET_VISITS, get_visits}
}

export const setGetVisits = (currentPage, limit) => {
    return (dispatch) => {
        visitsAPI.getVisits(currentPage, limit).then(res => {
            dispatch(setGetVisits_(res.data))
        })
    }
}

export let setAccessLevelsVisits_ = (access_levels_visits) => {
    return {type: SET_ACCESS_LEVELS_VISITS, access_levels_visits}
}

export const setAccessLevelsVisits = () => {
    return async (dispatch) => {
        await visitsAPI.getAccessLevels().then(res => {
            if (res) dispatch(setAccessLevelsVisits_(res.data))
            else dispatch(setAccessLevelsVisits_(null))
        })
    }
}

export const postVisit = (ticket_price, worker_id) => {
    return (dispatch) => {
        visitsAPI.postVisit(ticket_price, worker_id).then(res => {
            if (res.status == 200) {
                alert("success")
                dispatch(setGetVisits())
            } else {
                alert(res.data.message)
            }
        })

    }
}

export const deleteVisit = (visit_id) => {
    return (dispatch) => {
        visitsAPI.deleteVisit(visit_id).then(res => {
            if (res.status == 200) {
                dispatch(setGetVisits())
            }
        })
    }
}

export const putVisit = (visit_id) => {
    return (dispatch) => {
        visitsAPI.getVisit(visit_id).then(res => {
            dispatch(putVisit_(res.data))
        })
    }
}
export const putVisit_ = (put_visit) => {
    return {type: SET_PUT_VISIT, put_visit}
}

export const putVisitPush = (id, ticket_price, worker_id) => {
    return (dispatch) => {
        visitsAPI.putVisit(id, ticket_price, worker_id).then(res => {
            if (res.status == 200) {
                alert("success")
                dispatch(setGetVisits())
            }
        })
    }
}

export const logout_visits = () => {
    return {type: SET_VISITS_LOGOUT}
}

export default visits_reducer
