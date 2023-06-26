import classes from "./style.module.css";


const Error = ({ onReload }) => {
    return (
        <div className={classes.error_outer}>
            <h3>Something went wrong </h3>
            <button onClick={onReload}>Reload</button>
        </div>
    );
};

export default Error;