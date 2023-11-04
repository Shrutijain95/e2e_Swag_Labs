# Automated E2E Test Script for Swag Labs using Playwright and TypeScript

## Overview

This project involves the development of an automated testing script using Playwright and TypeScript for evaluating the functionalities of the Swag Labs website (https://www.saucedemo.com/). The script covers a wide range of actions, including user login, product sorting, cart management, and the entire online shopping process. This report provides a detailed overview of the project, including its objectives, methodology, and results.

## Objectives

The main objectives of this project were:

- **Automate Testing**: Develop an automated testing suite using Playwright and TypeScript to thoroughly test the Swag Labs website.

- **Functional Verification**: Ensure the correctness and reliability of essential functionalities on the website, covering areas such as user authentication, product selection, cart management, and the checkout process.

- **Issue Identification**: Identify and report any issues, bugs, or irregularities encountered during the automated testing process to facilitate prompt resolution.

## Project Setup

To set up the project and execute the end-to-end tests, follow these steps:

1. **Clone the Repository**: Begin by cloning this repository to your local machine using `git clone <repository-url>`.

2. **Install Dependencies**: Install project dependencies by running `npm install` in your project's root directory.

3. **Run End-to-End Tests**: Execute the end-to-end tests with the command `npm run e2e` to automate the verification of Swap Labs website functionality.

4. **Review Results**: After running the tests, review the results to ensure that the website is functioning as expected. This process allows for comprehensive quality assurance and automated testing.

## Project Configuration Files

### `package.json`

The `package.json` file is pivotal in managing project dependencies and scripts. It contains a list of required packages under "Dependencies," ensuring that the project can access the necessary tools. The "Scripts" section defines custom commands for common tasks, streamlining operations such as running tests and managing the project. This setup enhances the project's efficiency and maintainability, simplifying development and testing processes.

### `tsconfig.json`

The `tsconfig.json` file serves as the TypeScript configuration file, specifying how the code should be transpiled. Key configurations include "target" (the ECMAScript version to target), "module" (the module system to use, e.g., CommonJS). These configurations are essential for customizing TypeScript's transpilation process to align with the project's requirements, ensuring seamless execution.

## Project Object Model

The project employs Page Object Model (POM) classes encapsulated in `pom.ts` files located in the "pages" folder. These classes represent web pages, encapsulating page elements and actions for better code organization and maintainability. POM enhances code clarity, making it easier to locate and update page-specific elements.

## Test Cases

### Cart Page

This test suite comprehensively evaluates the cart page's functionality, covering a standard user's journey from login to product selection, cart management, and checkout. It leverages Page Object Models for clarity and organization.

### Checkout

This suite meticulously examines the entire checkout process, testing user login, product selection, cart management, and the seamless checkout journey. It ensures that the website handles standard user purchases effectively.

### Complete Standard Flow

This comprehensive suite rigorously tests the complete user journey, encompassing login, product selection, cart management, checkout, successful purchase, and return to the inventory page. It emphasizes clarity and maintainability through Page Object Models and includes a user logout validation.

### Inventory Page

Focusing on the inventory page, this suite thoroughly examines sorting options and product listings. It validates image, description, and price elements, ensuring an error-free user experience. It also verifies the cart item count and navigation to the shopping cart page.

### Login Page

The "Swag Labs Login Functionality" suite concentrates on testing the login process. It verifies the presence of the Swag Labs logo, assesses login functionality for users with various roles, and ensures that users are correctly redirected to the appropriate pages. These tests contribute to a secure and user-friendly authentication system.

This extensive set of test cases ensures thorough testing of the Swag Labs website, contributing to its reliability and functionality.

In summary, this project serves as a robust framework for automated end-to-end testing of the Swag Labs website using Playwright and TypeScript. It adheres to best practices, maintains code clarity through Page Object Models, and covers a wide range of functionalities, ensuring the website's quality and user-friendliness.

