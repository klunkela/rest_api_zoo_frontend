import React from 'react';
import {Route} from "react-router-dom";
import Animals from "./Animals/Animals";
import Visits from "./Visits/Visits";

function Content(props) {
    return (
        <div>
            <Route
                path="/animals"
                render={() => <Animals/>}
            />
            <Route
                path="/visits"
                render={() => <Visits/>}
            />
        </div>
    );
}

export default Content;