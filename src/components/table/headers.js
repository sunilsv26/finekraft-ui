import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";

import icons from "../../assests/icons/index";
import classes from "./style.module.css";

const Headers = ({ headers, showSortIcon, onSort }) => {
    const [activeHeader, setActiveHeader] = useState({ name: '', className: "" });

    const handleSort = (e) => {
        const attributeValue = e.currentTarget.getAttribute('data-sort');
        const className = e.currentTarget.classList.contains("nosort") ? "asc" : e.currentTarget.classList.contains("asc") ? "dsc" : 'nosort';
        setActiveHeader({ name: attributeValue, className });
        onSort({ name: attributeValue, type: className });
    };

    useEffect(() => {
        setActiveHeader({ name: '', className: "" });
    }, []);

    useEffect(() => {
        setActiveHeader({ name: '', className: "" });
    }, [onSort]);

    const renderIcon = (key) => {
        if (key === activeHeader.name) {
            if (activeHeader.className === "asc") {
                return <img src={icons.sorted_up} alt="sorted_up" />;
            } else if (activeHeader.className === "dsc") {
                return <img src={icons.sorted_down} alt="sorted_down" />;
            } else {
                return <img src={icons.sorted_none} alt="sorted_none" />;
            }
        }
        return <img src={icons.sorted_none} alt="sorted_none" />;
    };
    return (
        <tr>
            {headers.map(h => {
                return (
                    <th
                        key={h.rowDataKey}
                        data-sort={h.rowDataKey}
                        onClick={handleSort}
                        className={activeHeader.name === h.rowDataKey ? activeHeader.className : "nosort"}
                    >
                        <div className={classes.colmn_header}>
                            <div>{h.title}</div>
                            {showSortIcon ? renderIcon(h.rowDataKey) : null}
                        </div>

                    </th>
                );
            })}
        </tr>
    );
};

Headers.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        rowDataKey: PropTypes.string,
    })),
    showSortIcon: PropTypes.bool,
    onSort: PropTypes.func
};

Headers.defaultProps = {
    headers: [],
    showSortIcon: true
};

export default memo(Headers);