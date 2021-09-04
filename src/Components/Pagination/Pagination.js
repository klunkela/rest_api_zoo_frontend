import React from "react";
import s from "./Pagination.module.css";

function Pagination(props) {
    let pages = props.pages
    let currentPage = props.currentPage
    let pagesToShow1 = []
    let pagesToShow2 = []
    let pagesToShow3 = []
    let is3Pages = false
    if (pages > 6) {
        if (currentPage == 1) {
            pagesToShow1.push(1, 2, 3, 4, 5, 6)
            pagesToShow2.push(pages)
        } else if (currentPage == 2 || currentPage == 3 || currentPage == 4) {
            pagesToShow1.push(1, 2, 3, 4, 5, 6)
            pagesToShow2.push(pages)
        } else if (currentPage == pages) {
            pagesToShow1.push(1)
            pagesToShow2.push(pages - 5, pages - 4, pages - 3, pages - 2, pages - 1, pages)
        } else if (currentPage == pages - 1 || currentPage == pages - 2 || currentPage == pages - 3) {
            pagesToShow1.push(1)
            pagesToShow2.push(pages - 5, pages - 4, pages - 3, pages - 2, pages - 1, pages)
        } else {
            is3Pages = true
            pagesToShow1.push(1)
            pagesToShow2.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2)
            pagesToShow3.push(pages)
        }
    }
    else {
        for (let i = 1; i < pages; i++) {
            pagesToShow1.push(i)
        }
        return <div>

            {
                pagesToShow1.map(e =>
                    <button key={e} onClick={() => props.setCurrentPage(e)}
                            className={Number(e) == currentPage ?
                                s.pagination_selected : s.pagination_not_selected}>{e}</button>)
            }
        </div>
    }

    return (
        <div>
            {
                is3Pages &&
                pagesToShow1.map(e =>
                    <button key={e} onClick={() => props.setCurrentPage(e)}
                            className={Number(e) == currentPage ?
                                s.pagination_selected : s.pagination_not_selected}>{e}</button>)
            }
            {is3Pages && <>...</>}
            {
                is3Pages &&
                pagesToShow2.map(e =>
                    <button key={e} onClick={() => props.setCurrentPage(e)}
                            className={Number(e) == currentPage ?
                                s.pagination_selected : s.pagination_not_selected}>{e}</button>)
            }
            {is3Pages && <>...</>}
            {
                is3Pages &&
                pagesToShow3.map(e =>
                    <button key={e} onClick={() => props.setCurrentPage(e)}
                            className={Number(e) == currentPage ?
                                s.pagination_selected : s.pagination_not_selected}>{e}</button>)
            }
            {
                !is3Pages &&
                pagesToShow1.map(e =>
                    <button key={e} onClick={() => props.setCurrentPage(e)}
                            className={Number(e) == currentPage ?
                                s.pagination_selected : s.pagination_not_selected}>{e}</button>)
            }
            {!is3Pages && <>...</>}
            {
                !is3Pages &&
                pagesToShow2.map(e =>
                    <button key={e} onClick={() => props.setCurrentPage(e)}
                            className={Number(e) == currentPage ?
                                s.pagination_selected : s.pagination_not_selected}>{e}</button>)
            }
        </div>
    )
}

export default Pagination