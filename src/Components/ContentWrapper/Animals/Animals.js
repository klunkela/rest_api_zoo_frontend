import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    getAccessLevelsAnimalsSelector,
    putAnimalSelector
} from "../../../redux/animals_selectors";

import s from "./Animals.module.css";
import PutAnimal from "./PutAnimal";
import GetAnimals from "./GetAnimals";
import PostAnimal from "./PostAnimal";
import GetAnimal from "./GetAnimal";
import {getUserDataSelector} from "../../../redux/me_selectors";
import {setAccessLevelsAnimals} from "../../../redux/animals_reducer";

function Animals(props) {

    let putAnimalJSON = useSelector(putAnimalSelector)
    let putAnimal;
    if (putAnimalJSON) putAnimal = JSON.parse(putAnimalJSON)
    let closePutAnimal = () => {
        setIsPutAnimalShowing(false)
    }

    let [isPutAnimalShowing, setIsPutAnimalShowing] = useState(false)

    let level = useSelector(getUserDataSelector).access_level
    let levelsJSON = useSelector(getAccessLevelsAnimalsSelector)
    let dispatch = useDispatch()
    dispatch(setAccessLevelsAnimals())
    let levels;
    if (levelsJSON) levels = JSON.parse(levelsJSON)

    return (
        <div>
            {levels &&
            <div className={s.animals_wrapper}>
                {
                    levels.findAll.indexOf(level)!=-1 &&
                    <GetAnimals setIsPutAnimalShowing={setIsPutAnimalShowing} level={level} levels={levels}/>
                }
                <div className={s.animals_side_content}>
                    {
                        levels.create.indexOf(level)!=-1 &&
                        <PostAnimal/>
                    }
                    {
                        levels.update.indexOf(level)!=-1 &&
                        <>

                            {isPutAnimalShowing && <PutAnimal putAnimal={putAnimal}/>}
                            {isPutAnimalShowing && putAnimal && <button onClick={() => closePutAnimal()}>close</button>}
                        </>
                    }
                    {
                        levels.find.indexOf(level)!=-1 &&
                        <GetAnimal setIsPutAnimalShowing={setIsPutAnimalShowing} level={level} levels={levels}/>
                    }

                </div>
            </div>
            }
        </div>
    )
}

export default Animals;