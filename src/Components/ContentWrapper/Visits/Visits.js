import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    getAccessLevelsVisitsSelector,
    putVisitSelector
} from "../../../redux/visits_selectors";

import s from "./Visits.module.css";
import PutVisit from "./PutVisit";
import GetVisits from "./GetVisits";
import PostVisit from "./PostVisit";
import GetVisit from "./GetVisit";
import {getUserDataSelector} from "../../../redux/me_selectors";
import {setAccessLevelsVisits} from "../../../redux/visits_reducer";

function Visits(props) {

    let putVisitJSON = useSelector(putVisitSelector)
    let putVisit;
    if (putVisitJSON) putVisit = JSON.parse(putVisitJSON)
    let closeVisitNow = () => {
        setIsPutVisitShowing(false)
    }
    let [isPutVisitShowing, setIsPutVisitShowing] = useState(false)

    let level = useSelector(getUserDataSelector).access_level
    let levelsJSON = useSelector(getAccessLevelsVisitsSelector)
    let dispatch = useDispatch()
    dispatch(setAccessLevelsVisits())
    let levels;
    if (levelsJSON) levels = JSON.parse(levelsJSON)
    return (
        <div>
            {levels &&
            <div className={s.visits_wrapper}>
                {
                    levels.findAll.indexOf(level) != -1 &&
                    <GetVisits setIsPutVisitShowing={setIsPutVisitShowing} level={level} levels={levels}/>
                }
                <div className={s.visits_side_content}>
                    {
                        levels.create.indexOf(level) != -1 &&
                        <PostVisit/>
                    }
                    {
                        levels.update.indexOf(level) != -1 &&
                        <>
                            {isPutVisitShowing && <PutVisit putVisit={putVisit}/>}
                            {isPutVisitShowing && putVisit && <button onClick={() => closeVisitNow()}>close</button>}
                        </>
                    }
                    {
                        levels.find.indexOf(level) != -1 &&
                        <GetVisit setIsPutVisitShowing={setIsPutVisitShowing} level={level} levels={levels}/>
                    }
                </div>
            </div>}
        </div>
    )
}

export default Visits;