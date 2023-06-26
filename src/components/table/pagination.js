import PropTypes from "prop-types";



import classes from "./style.module.css";

const Pagination = ({ recordsPerPage, totalRecords, currentPage, onPageChange }) => {

    const handleNextClick = () => {
        onPageChange({ type: "next" });
    };

    const handlePrevClick = () => {
        onPageChange({ type: "prev" });
    };

    const handePageClick = (page) => {
        onPageChange({ type: "page", page });
    };

    return (
        <div className={classes.pagination}>
            <div>
                {`Showing ${(currentPage * recordsPerPage) - (recordsPerPage - 1)} to ${totalRecords < currentPage * recordsPerPage ? totalRecords : currentPage * recordsPerPage} of ${totalRecords} entries`}
            </div>
            <div className={classes.page_numbers}>
                <button
                    disabled={currentPage === 1}
                    onClick={handlePrevClick}
                >
                    Previous
                </button>
                {
                    Array(Math.ceil(totalRecords / recordsPerPage)).fill("").map((_, i) => {
                        return (
                            <button
                                key={i}
                                onClick={() => handePageClick(i + 1)}
                                className={currentPage === i + 1 ? classes.active_btn : ""}
                            >{i + 1}
                            </button>
                        );
                    })
                }
                <button
                    disabled={currentPage === Math.ceil(totalRecords / recordsPerPage) || totalRecords === 0}
                    onClick={handleNextClick}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    recordsPerPage: PropTypes.number,
    totalRecords: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func
};

Pagination.defaultProps = {


};

export default Pagination;