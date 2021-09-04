import {applyMiddleware, combineReducers, createStore} from "redux";
import me_reducer from "./me_reducer";
import thunkMiddleware from "redux-thunk"
import animals_reducer from "./animals_reducer";
import visits_reducer from "./visits_reducer";

let reducers = combineReducers(
    {
        me: me_reducer,
        animals: animals_reducer,
        visits: visits_reducer
    }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store