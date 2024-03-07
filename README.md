# FAMS Dashboard (UI)

The Fresher Academy Management System (FAMS) is a comprehensive software solution designed to efficiently manage and streamline the operations of a fresher academy of FPT. FAMS encompasses a range of features including user management, syllabus management, and training program and class management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

Clone this project to your local directory

```sh
git clone http://git.fa.edu.vn/hcm24_cpl_react_03/nhom-2.git
```

To run this project, at least node version 20 is required and `yarn` is setup also
You could run this project by 2 approachs:

- `yarn`

```sh
## Install all the libraries and dependencies
yarn

## This should prepare the server environment
yarn docker:prepare:db
yarn docker:prepare:backend

## Start the server
yarn docker:start:db
yarn docker:start:backend

## Run the UI
yarn dev
```
