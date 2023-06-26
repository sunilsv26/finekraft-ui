import PropTypes from "prop-types";
import { memo } from "react";
import classes from "./style.module.css";

const Action = ({ recordsPerPage, onEntryChange, onSearch, search }) => {

    return (
        <header className={classes.table_action}>
            <div className={classes.control}>
                <label>Show</label>
                <input type="number" value={recordsPerPage} onChange={onEntryChange} min={1} max={10} />
                <span>entries</span>
            </div>
            <div className={classes.control}>
                <label>Search</label>
                <input type="search" onChange={onSearch} value={search} />
            </div>
        </header>);
};

Action.propTypes = {
    recordsPerPage: PropTypes.number,
    onEntryChange: PropTypes.func,
    onSearch: PropTypes.func,
    search: PropTypes.string
};

Action.defaultProps = {
    recordsPerPage: 10,
    search: ""
};

export default memo(Action);