import { render, screen, waitFor } from '@testing-library/react';
import Table from './components/table/table';

const headers = [
  {
    "title": "Name",
    "rowDataKey": "name"
  },
  {
    "title": "Position",
    "rowDataKey": "position"
  },
  {
    "title": "Office",
    "rowDataKey": "office"
  },
  {
    "title": "Age",
    "rowDataKey": "age"
  },
  {
    "title": "Start Date",
    "rowDataKey": "startDate"
  },
  {
    "title": "Salary",
    "rowDataKey": "salary"
  }
];

const data = [
  {
    "_id": "649934690765cb9c11588ec8",
    "name": "Abbie Larkin",
    "position": "Data Analyst",
    "office": "London",
    "age": 53,
    "startDate": "2018-10-21T01:59:21.760Z",
    "salary": 82456,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ecb",
    "name": "Ari Willms",
    "position": "Product Manager",
    "office": "Tokyo",
    "age": 38,
    "startDate": "2021-08-07T02:48:19.765Z",
    "salary": 69274,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ecc",
    "name": "Romaine Pollich",
    "position": "Web Developer",
    "office": "London",
    "age": 39,
    "startDate": "2018-11-21T15:51:05.307Z",
    "salary": 112435,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ecd",
    "name": "Jayme Boehm",
    "position": "Data Analyst",
    "office": "San Francisco",
    "age": 47,
    "startDate": "2017-01-17T13:06:59.426Z",
    "salary": 64348,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ece",
    "name": "Rebeka Feil",
    "position": "Data Analyst",
    "office": "San Francisco",
    "age": 29,
    "startDate": "2017-10-14T01:42:40.722Z",
    "salary": 125002,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ecf",
    "name": "Krista Kuhn",
    "position": "Product Manager",
    "office": "Tokyo",
    "age": 49,
    "startDate": "2012-05-19T07:07:26.402Z",
    "salary": 60490,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588eca",
    "name": "Lillian Dach",
    "position": "Software Engineer",
    "office": "New York",
    "age": 49,
    "startDate": "2022-10-13T22:51:28.571Z",
    "salary": 141146,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ec9",
    "name": "Jacky Ankunding",
    "position": "Software Engineer",
    "office": "San Francisco",
    "age": 25,
    "startDate": "2017-01-05T15:03:16.110Z",
    "salary": 67405,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ed2",
    "name": "Jacey Windler",
    "position": "Data Analyst",
    "office": "London",
    "age": 45,
    "startDate": "2021-06-18T00:14:37.120Z",
    "salary": 68430,
    "__v": 0
  },
  {
    "_id": "649934690765cb9c11588ed3",
    "name": "Henry Pfannerstill",
    "position": "Web Developer",
    "office": "New York",
    "age": 53,
    "startDate": "2014-02-17T10:07:17.905Z",
    "salary": 57200,
    "__v": 0
  }
];

test('renders tabel comp', async () => {
  render(<Table headers={headers} data={data} recordsPerPage={4} totalCount={data.length} clientPagination error={false} loading={false} />);

  const Search = screen.getByText("Search");
  expect(Search).toBeInTheDocument();

  const Show = screen.getByText("Show");
  expect(Show).toBeInTheDocument();

  const entries = screen.getByText("entries");
  expect(entries).toBeInTheDocument();

  const nameHeaders = screen.getAllByText("Name");
  nameHeaders.forEach((nameHeader) => {
    expect(nameHeader).toBeInTheDocument();
  });
  const positionHeaders = screen.getAllByText("Position");
  positionHeaders.forEach((positionHeader) => {
    expect(positionHeader).toBeInTheDocument();
  });

  const officeHeaders = screen.getAllByText("Office");
  officeHeaders.forEach((officeHeader) => {
    expect(officeHeader).toBeInTheDocument();
  });

  const ageHeaders = screen.getAllByText("Age");
  ageHeaders.forEach((ageHeader) => {
    expect(ageHeader).toBeInTheDocument();
  });

  const startDateheaders = screen.getAllByText("Start Date");

  startDateheaders.forEach((startDateheader) => {
    expect(startDateheader).toBeInTheDocument();
  });

  const SalaryHeaders = screen.getAllByText("Salary");
  SalaryHeaders.forEach((SalaryHeader) => {
    expect(SalaryHeader).toBeInTheDocument();
  });


  const Previous = screen.getByText("Previous");
  expect(Previous).toBeInTheDocument();

  const Next = screen.getByText("Next");
  expect(Next).toBeInTheDocument();

  const page1 = screen.getByText("1");
  expect(page1).toBeInTheDocument();

  const page2 = screen.getByText("2");
  expect(page2).toBeInTheDocument();

  const page3 = screen.getByText("3");
  expect(page3).toBeInTheDocument();


  // Check first row
  await waitFor(() => {
    const randomName = screen.getByText("Abbie Larkin");
    expect(randomName).toBeInTheDocument();
  });
});
