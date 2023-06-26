import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

import Loader from "../loader/loader";
import Action from "./action";
import Error from "./error";
import Headers from "./headers";
import Pagination from "./pagination";
import Row from "./row";

import classes from "./style.module.css";

import { debounce, getTypeoFValue } from "../../util/utility";

const Table = ({
    headers,
    data,
    recordsPerPage,
    totalCount,
    clientPagination,
    updateTableData,
    error,
    loading }) => {
    const [currentData, setCurrentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [seachKey, setSearch] = useState("");
    const [entriesPerPage, setEntries] = useState(() => recordsPerPage);
    const [sorting, setSorting] = useState({ data: [], sorting: false });
    // In case of client search
    const [filter, setFilterData] = useState([]);


    const setTableData = (page, perPage) => {
        if (clientPagination) {
            const startIndex = page * perPage - (perPage);
            const lastIndex = page * perPage;
            setFilterData(prev => {
                setSearch(old => {
                    setCurrentData((old ? prev : data).slice(startIndex, lastIndex));
                    return old;
                });
                return prev;
            });

        } else {
            setCurrentData(data);
        }

    };

    useEffect(() => {
        setTableData(1, entriesPerPage);
    }, [data]);


    const handleEntry = useCallback((e) => {
        setEntries(+e.target.value);
        setCurrentPage(1);
        setSorting({ sorting: false, data: [] });
        if (clientPagination) {
            setTableData(1, +e.target.value);
        } else {
            updateTableData(1, +e.target.value, seachKey);
        }

    }, [seachKey, currentData]);


    const handleSearch = useCallback((e) => {
        const value = e.target.value;
        setSorting({ sorting: false, data: [] });
        setSearch(value);
        setCurrentPage(1);
        if (clientPagination) {
            const filteredData = data.filter(row => {
                return Object.values(row).some(val => {
                    const lowercase = String(val).toLowerCase();
                    if (lowercase.includes(value.toLowerCase())) {
                        return row;
                    }
                });
            });
            setFilterData(filteredData);
            setTableData(1, entriesPerPage);
        } else {
            debounce(() => updateTableData(1, entriesPerPage, e.target.value), 600)();
        }
    }, [data, filter, seachKey]);


    const changeTableData = (page, perPage) => {
        setCurrentPage(page);
        if (clientPagination) {
            setTableData(page, perPage);
        } else {

            updateTableData(page, perPage, seachKey);
        }

    };

    const onPageChange = useCallback(({ type, page }) => {
        setSorting({ sorting: false, data: [] });
        switch (type) {
            case "next":
                changeTableData(currentPage + 1, entriesPerPage);
                break;
            case "prev":
                changeTableData(currentPage - 1, entriesPerPage);
                break;
            case "page":
                changeTableData(page, entriesPerPage);
                break;
            default:
                break;
        }
    }, [currentPage, entriesPerPage, currentData]);

    const handleReload = () => {
        if (clientPagination) {
            setTableData(currentPage, entriesPerPage);
        } else {
            updateTableData(currentPage, entriesPerPage);
        }
    };


    const handleSort = useCallback(({ name, type }) => {
        let data = [...currentData];
        switch (type) {
            case "asc":
                data.sort((a, b) => {
                    switch (getTypeoFValue(a[name])) {
                        case "string":
                            return a[name].localeCompare(b[name]);
                        case "date":
                            return new Date(a[name]) - new Date(b[name]);
                        case "number":
                            return a[name] - b[name];
                        default:
                            break;
                    }
                });
                break;

            case "dsc":
                data.sort((a, b) => {
                    switch (getTypeoFValue(a[name])) {
                        case "string":
                            return b[name].localeCompare(a[name]);
                        case "date":
                            return new Date(b[name]) - new Date(a[name]);
                        case "number":
                            return b[name] - a[name];
                        default:
                            break;
                    }
                });
            default:
                break;
        }
        setSorting({ sorting: true, data });
    }, [headers, currentData]);

    return (
        <div className={classes.table_outer}>
            <Action onEntryChange={handleEntry} onSearch={handleSearch} recordsPerPage={entriesPerPage} search={seachKey} />
            <div className={classes.table_container}>
                <Loader loading={loading} />
                {error ? <Error onReload={handleReload} /> : currentData.length ?
                    <table>
                        <thead>
                            <Headers headers={headers} onSort={handleSort} />
                        </thead>
                        <tbody>
                            {
                                sorting.sorting ? sorting.data.map(row => {
                                    return <Row key={row._id} rowData={row} headers={headers} />;
                                }) :
                                    currentData.map(row => {
                                        return <Row key={row._id} rowData={row} headers={headers} />;
                                    })
                            }
                        </tbody>
                        <tfoot>
                            <Headers headers={headers} showSortIcon={false} />
                        </tfoot>
                    </table> : <h3>No Records</h3>}
            </div>
            {currentData.length ?
                <Pagination
                    currentPage={currentPage}
                    recordsPerPage={entriesPerPage}
                    totalRecords={(clientPagination && seachKey) ? filter.length : totalCount}
                    onPageChange={onPageChange} /> : null}

        </div>

    );
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        rowDataKey: PropTypes.string,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    recordsPerPage: PropTypes.number.isRequired,
    clientPagination: PropTypes.bool.isRequired,
    totalCount: PropTypes.number,
    updateTableData: PropTypes.func,
    error: PropTypes.bool,
    loading: PropTypes.bool
};

Table.defaultProps = {
    headers: [],
    data: [],
    recordsPerPage: 10,
    clientPagination: true,
    error: false,
    loading: false
};


export default memo(Table);