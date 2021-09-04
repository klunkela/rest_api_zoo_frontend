import React from 'react';
import Header from "./Header";
import Menu from "./Menu";
import Content from "./Content";
import s from './Content.module.css';

function Wrapper(props) {
    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.under_header}>
                <Menu/>
                <Content/>
            </div>
        </div>
    );
}

export default Wrapper;