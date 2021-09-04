import React from "react";
import {useSelector} from "react-redux";
import {getUserDataSelector} from "../../redux/me_selectors";
import Wrapper from "../ContentWrapper/Wrapper";

let ContentWrapper = (props) => {
    let userData = useSelector(getUserDataSelector)
    return <div>
        <Wrapper/>
    </div>
}

export default ContentWrapper;
