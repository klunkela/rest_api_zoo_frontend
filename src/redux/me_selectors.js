export const isAuth_ = (state) => {
    return state.me.isAuth
}

export const getUserIdSelector = (state) => {
    return state.me.id
}

export const getUserDataSelector = (state) => {
    return state.me
}
