# Group 7 Design Project - Fitness App

## Overview
This is a React Native TypeScript project bootstrapped with Expo.

## Getting Started
To set up your development environment and start working on this project, follow the steps below:

### 1. Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (v6 or later)
- Expo CLI (install globally using npm)
```sh
npm install -g expo-cli
```
- Typescript
```sh
npm install -g typescript
```

**Also, download the [Expo Go](https://expo.dev/client) app for your phone**

### 2. Installing dependencies
Open your terminal or command prompt to this folder (../front-end). Run the following command to install dependencies:
```sh
npm install
```

### 3. Start the backend server
Follow the steps on backend branch!

**Change the BASE_URL variable in /src/services/API.ts to the ip address that shows up in the terminal when you start the backend server!**

### 4. Start the development server
To start the development server run the command:
```sh
npx expo start
```
This will present a QR-code in the terminal which you scan and Expo Go will run the app on your phone.

To open the app in browser press w!

#### If you get an error referencing *AppEntry.js* follow the steps below!
1. Locate your *node_modules* folder
2. Locate the folder called *expo*
3. Open the *AppEntry.js* file
4. Change the path on line 3 to ```"../../src/App"```
5. Save and reload!