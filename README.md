# Stock Price Chart Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Description

This Project is a FundManager providing user with below functionalities

- On load of the project will display a dashboard with filters
- User will be able to view the Line Graph by default
- On hover of the nodes of the line data user is able to view the precise date and price at that instance
- User can select max upto 3 stocks to view in the same graph
- User can select date range to view the data
- For the line graph there is a an extra dropdown to see the different types of price of the stocks selected (i.e., high, low, close, open)
- The profile is clickable and a drawer is displayed where we can view user data and their funds
- There is another tab displaying the financial candle chart to display the same data in a different form
- In the scenario of any failed API call user is notified via a UI Notification regarding the error

## Techstack

- ReactJS
- Typescript
- Webpack
- ChartJS (react-chartjs)
- Antd
- Jest
- React testing library
- CSS
- Axios

## How to run the project

In the project directory, you can run:

### `npm install`

This command is used to install the dependencies required for the project

*(Note: This project was developed using node v18.17.0)*

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
#### Tech used
- React Testing library
- Jest

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The app is ready to be deployed!

## How to navigate through the code
- App.tsx: Main smart component responsible for rendering the App and having API interaction
- StockSelector.tsx: Select component allowing user to multi-select stocks
- DateRangePicker.tsx: Date range picker for fetching stock data
- UserProfile.tsx: Drawer displaying user information and their funds
- StockChart.tsx: Line graph to display stock data with prices on the y-axis and dates on the x-axis
- CandleStickChart.tsx: Stock data rendered in the form of Candle stick chart


## Assumption

- The Stocks are hard coded on the Frontend, which can be obtained from an API call (API call was avoided because of limited calls that can be made - 5 calls/min)
- The User data is currently hard coded, which can also be obtained from an API call
- This project is not configured for multiple environments (eg: qa, dev, prod)

## Decisions taken

- No external store has been implemented cause of the following reasons:
    - as in this SPA there is only 1 API call and the state management is simple
    - the component interaction is limited
    - no multi-page navigation
hence concluded that implementing a store might be an overkill
- Have added a combination of different types of tests to test the components i.e., Snapshot tests, unit tests to test APIs and unit tests to test components
- Have added additional profile as I wanted to create a story with the requirements provided because usually the apps have an overview of the user profile
- The financial candle chart is an additional feature added but will require more time to debug and implement the cursor across the graph
