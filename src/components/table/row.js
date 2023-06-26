import PropTypes from "prop-types";


const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;


const Row = ({ rowData, headers }) => {

    const renderCell = (type, val) => {
        switch (type) {
            case "startDate":
                return Intl.DateTimeFormat(systemLocale).format(new Date(val));
            default:
                return val;
        }
    };

    return <tr>
        {
            headers.map(h => {
                return <td key={h.rowDataKey}>{renderCell(h.rowDataKey, rowData[h.rowDataKey])}</td>;
            })
        }
    </tr>;
};

Row.propTypes = {
    rowData: PropTypes.object,
    headers: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        rowDataKey: PropTypes.string,
    }))
};

Row.defaultProps = {
    rowData: [],
    headers: []
};



export default Row;