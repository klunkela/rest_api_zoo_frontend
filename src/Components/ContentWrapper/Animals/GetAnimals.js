import React, {useState} from 'react';
import s from "./Animals.module.css";
import Pagination from "../../Pagination/Pagination";
import Animal from "./Animal";
import {useDispatch, useSelector} from "react-redux";
import {animalsCountSelector, getAnimalsSelector} from "../../../redux/animals_selectors";
import {setAnimalsCount, setGetAnimals} from "../../../redux/animals_reducer";

function GetAnimals(props) {
    let dispatch = useDispatch()

    let animalsCount = useSelector(animalsCountSelector)
    dispatch(setAnimalsCount())
    let [currentPage, setCurrentPage] = useState(1)
    let [limit, setLimit_] = useState("100")
    let setLimit = (lim) => {
        setLimit_(lim)
        setCurrentPage(1)
    }
    let pages = Math.ceil(animalsCount / Number(limit))

    let animals = useSelector(getAnimalsSelector)
    dispatch(setGetAnimals(currentPage, limit))

    return (
        <div className={s.animals_content}>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <select value={limit} onChange={e => {
                setLimit(e.target.value)
            }}>
                <option value="100">100</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
            {animals.map(e => <Animal key={e.id} {...e} setIsPutAnimalShowing={props.setIsPutAnimalShowing}
            levels={props.levels} level={props.level}/>)}
        </div>
    );
}

export default GetAnimals;