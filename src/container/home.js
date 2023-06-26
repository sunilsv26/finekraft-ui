import { useEffect, useState } from "react";

import Table from "../components/table/table";

import { SERVER_PAGINATION } from "../config/config";
import { getData } from "../util/api-client";
import { camelCaseToCapitalized } from "../util/utility";

import classes from "./home.module.css";



const Home = () => {
    const [loading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);
    const [initialData, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const setInitialData = (data) => {
        const newheaders = [];
        const { page, limit, employees, totalCount } = data;
        if (employees[0]) {
            Object.keys(employees[0]).forEach(key => {
                if (key !== "_id" && key !== "__v") {
                    newheaders.push({ title: camelCaseToCapitalized(key), rowDataKey: key });
                }

            });
        }
        setHeaders((prevHeaders) => {
            if (prevHeaders.length === 0) {
                return newheaders;
            }
            return prevHeaders;
        });
        setData([...employees]);
        setLimit(+limit || 10);
        setTotalCount(totalCount || employees.length);
    };

    const fetchTableData = async (page, perPage, filter) => {
        setLoading(true);
        let data;
        try {
            data = SERVER_PAGINATION ? await getData(`/employee?page=${page || 1}&limit=${perPage || 10}&search=${filter ? filter : ""}`) : await getData("/employee");
            setError(false);
            setLoading(false);
            setInitialData(data);
        } catch (error) {
            console.error(error);
            setError(true);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchTableData();
    }, []);


    const fetchNewData = (page, perPage, filter) => {
        fetchTableData(page, perPage, filter);
    };

    return <div className={classes.home}>
        <Table
            headers={headers}
            data={initialData}
            recordsPerPage={limit}
            totalCount={totalCount}
            clientPagination={!SERVER_PAGINATION}
            updateTableData={fetchNewData}
            error={hasError}
            loading={loading}
        />
    </div>;
};

export default Home;