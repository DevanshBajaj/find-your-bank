<h1 align="center">Find Your Bank</h1>

<p align="center">A Single Page App to display table of all the banks in a specific city with search functionality based on various parameters/categories built with React.JS.
</br>This was built as take home assignment for my internship interview with [Groww](https://groww.in/)</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/d48bb71b-8d75-4d54-9e46-debed9601e55/deploy-status)](https://app.netlify.com/sites/bankls/deploys)

</br>

## [Live Website](https://bankls.netlify.app/)

## Tech Stack and Process

First step was to setup development environment for which I used Vite as it provides better performance and less cluttered environment, also HMR is great while testing.</br>
Second step was to fetch the data using given API and cache its response on localstorage fors a limited time to provide faster switching between the cities and to avoid multiple API calls in quick succession.</br>
Third step was to create pagination for table for performance improvement after that next step was to add dropdown and input field to filter cities and search categories.</br>
Fourth step was to improve UI and check for any conditions.</br>
Final step was to add favorite functionality with other improvements necessary for performance.

### Libraries

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/) is used for various UI components
- [Emotion CSS](https://emotion.sh/docs/introduction) is used to style the UI, It is used by MUI as a styling engine
-

### Build Tool

[Vite JS](https://vitejs.dev/) is used for tooling as CRA replacement

</br>

## Run Locally

```sh
git clone git@github.com:DevanshBajaj/find-your-bank.git

yarn

yarn dev
```

</br>
</br>

# License

```
MIT License

Copyright (c) 2022 Devansh Bajaj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
