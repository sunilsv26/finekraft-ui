import classes from "./loader.module.css";


const Loader = ({ loading }) => {


    return (
        loading ?
            <div className={classes.background}>
                <div className={classes.spinner}></div>
            </div>
            : null
    );

};

export default Loader;