# FriendLend Frontend Documentation

This document provides the setup instructions and component details for the FriendLend decentralized application (DApp) frontend. FriendLend is a peer-to-peer lending platform built on the Ethereum blockchain.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (comes with Node.js) [joey using 9.2.0]
- Git

## Installation and Setup

### Clone the Repository

To get started, clone the front-end repository and navigate into it:

```bash
git clone https://github.com/your-username/friendlend-frontend.git
cd friendlend-frontend
```
This will install all required dependencies, including React libraries and Ethereum interaction libraries like web3.

### Install Dependencies

Install the necessary npm packages:

```bash
npm install
```

### Start the Development Server

To see your application in action, launch the local development server:

```bash
npm start
```
After running the command, your default web browser should automatically open to http://localhost:3000 where you can see your running application.

## Dependencies Overview

Our front-end application relies on several key dependencies:

- `react`: The core library for building the user interface.
- `react-dom`: Allows React to interact with the DOM.
- `web3`: Essential for interacting with Ethereum blockchain from the web browser.
- `@truffle/contract`: Assists in creating a JavaScript representation of our smart contracts which makes it easier to interact with.
- `chakraui`: Library for preset frontend componenets

To install these dependencies, you will need to run:

```bash
npm install react react-dom web3 @truffle/contract
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## Components Structure

The application's front-end consists of the following components:

### `App`
The root component that orchestrates the entire application, maintaining the core state and facilitating interaction among all child components.

### `Topbar`
A presentational component that shows the name of the app and can be used in the future to add navigation.

### `Dashboard`
Serves as the main hub for users, displaying personal loan information, balance, and active loan requests. It acts as a container for various interactive components.

### `LoanList`
This component renders a list of all the active loan requests. It fetches and displays data from the blockchain, updating in real-time as new loans are requested or filled.

### `LoanItem`
A child component of `LoanList` that represents an individual loan request. It displays the loan details and provides the functionality to contribute to the loan.

### `MemberList`
Displays a list of all current and pending members. It allows existing members to vote on pending invitations and view the FriendLend score and join date of each member.

## Smart Contract Integration

The smart contract functions are integrated within the React components using the `web3` and `@truffle/contract` libraries. This ensures that our front-end can communicate effectively with the Ethereum blockchain.

For example, to connect to the `depositFunds` function in the smart contract:

```javascript
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import FriendLendContract from './contracts/FriendLend.json';

const web3 = new Web3(window.ethereum);

const App = () => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initContract = async () => {
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FriendLendContract.networks[networkId];
            const instance = new web3.eth.Contract(
                FriendLendContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            setContract(instance);
        };
        initContract();
    }, []);

    const depositFunds = async (amount) => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.depositFunds(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
    };

    // ...
};
```

