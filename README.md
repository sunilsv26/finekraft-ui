# Finekraft UI Task

## System requirements.

1.Node.js:
React projects require Node.js, which is a JavaScript runtime environment. You'll need to install Node.js on your system.

[Link to download](https://nodejs.org/en/download)

## Table of Contents

- [Installation](#installation)
- [Background](#background)
- [Usage](#usage)

## Installation

1. Go to the project's directory
1. Install dependencies: `npm install`

## Background

Task is to create the above table UI using React JS in which

1. User should be able to search any text in the search bar on the top right any of the column fields to get the desired result rows.
1. User should be able to sort the table rows based on the columns by clicking on the header as shown in the image. Columns should have clear indicators whether the column is unsorted, ascending or descending.
1. User should be able to view the number of rows as per the page size selected in the dropdown. They can click on the pagination buttons to navigate through the pages.

## Usage

1. In Projects src/config.config.js file add the initial config

   > API_URL => For Connecting to backend service ['http://localhost:8000']

   > SERVER_PAGINATION => Pagination on client side/server side [true/false]

1. Make sure backend service is up and runnig.

1. Go to the project's directory.

1. Start the development server: `npm start`.

## Test

1. Go to the project's directory.

1. Start test : `npm run test`.

## Screen Shots

1. All
   ![Screenshot](/src/assests/images/1.png "This is a sample image.")

1. Search
   ![Screenshot](/src/assests/images/2.png "This is a sample image.")

1. No of entries Change
   ![Screenshot](/src/assests/images/3.png "This is a sample image.")

1. Postion Column Sorted
   ![Screenshot](/src/assests/images/4.png "This is a sample image.")
