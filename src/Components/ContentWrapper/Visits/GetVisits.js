import React, {useState} from 'react';
import s from "./Visits.module.css";
import Pagination from "../../Pagination/Pagination";
import Visit from "./Visit";
import {useDispatch, useSelector} from "react-redux";
import {visitsCountSelector, getVisitsSelector} from "../../../redux/visits_selectors";
import {setVisitsCount, setGetVisits} from "../../../redux/visits_reducer";
import GetAnimals from "../Animals/GetAnimals";

function GetVisits(props) {
    let dispatch = useDispatch()

    let visitsCount = useSelector(visitsCountSelector)
    dispatch(setVisitsCount())
    let [currentPage, setCurrentPage] = useState(1)
    let [limit, setLimit_] = useState("100")
    let setLimit = (lim) => {
        setLimit_(lim)
        setCurrentPage(1)
    }
    let pages = Math.ceil(visitsCount / Number(limit))

    let visits = useSelector(getVisitsSelector)
    dispatch(setGetVisits(currentPage, limit))
    return (
        <div className={s.visits_content}>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <select value={limit} onChange={e => {
                setLimit(e.target.value)
            }}>
                <option value="100">100</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
            {visits.map(e => <Visit key={e.id} {...e} setIsPutVisitShowing={props.setIsPutVisitShowing}
                                    level={props.level} levels={props.levels}/>)}
        </div>
    );
}

export default GetVisits;