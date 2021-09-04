
export const getVisitsSelector= (state) => {
    return state.visits.get_visits
}
export const visitsCountSelector= (state) => {
    return state.visits.visits_count
}
export const putVisitSelector= (state) => {
    return state.visits.put_visit
}
export const getVisitSelector= (state) => {
    return state.visits.get_visit
}
export const getAccessLevelsVisitsSelector= (state) => {
    return state.visits.access_levels_visits
}