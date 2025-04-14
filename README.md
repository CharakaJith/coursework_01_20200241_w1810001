<div align="center">
  <h2 ="center">CountryScope</h2>
</div>

![Home page](./client/src//assets/images/screenshot.png)

### This project is a secure API middleware service built for the Advanced Server-Side Web Development module (Coursework 01). It interfaces with RestCountries.com to fetch and filter country data including name, currency, capital, languages, and flag.

### The app features full user authentication, API key management, and secure data storage using SQLite with password hashing and session handling. It follows a polyglot architecture and is fully containerized with Docker for easy local deployment.

### Built With

- [![React][React.js]][React-url]
- [![Node][Node.js]][Node-url]
- [![Express][Express.js]][Express.js-url]
- [![Sequelize][Sequelize]][Sequelize-url]
- [![SQLite][SQLite]][SQLite-url]
- [![Docker][Docker]][Docker-url]
- [![Swagger][Swagger]][Swagger-url]

## Getting Started

### Prerequisites

- node.js: [Node.js download page](https://nodejs.org/en/download)
- React.js: [React official website](https://reactjs.org/)
- SQLite: [SQLite download page](https://www.sqlite.org/download.html)
- Docker: [Docker download page](https://www.docker.com/products/docker-desktop/)

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/CharakaJith/coursework_01_20200241_w1810001.git
   ```
2. Set up the project
   i. Install NPM packages
   ```bash
   npm run install:all
   ```
   ii. Create database tables
   ```bash
   npm run migrate:up
   ```

### Start the project

1. Start the server and client
   ```bash
   npm run start
   ```

### Other scripts

1. Start the development server
   ```bash
   npm run dev
   ```
2. Start the client
   ```bash
   npm run server
   ```
3. Undo the most recent database migration
   ```bash
   npm run migrate:down
   ```
4. Undo all database migrations
   ```bash
   npm run migrate:down:all
   ```

## Documentations

- [Postman API documentation](https://documenter.getpostman.com/view/28014836/2sB2ca7KxT)
- [System architecture diagram]()

## Contact

Email: [charaka.info@gmail.com](mailto:charaka.info@gmail.com) | LinkedIn: [Charaka Jith Gunasinghe](https://www.linkedin.com/in/charaka-gunasinghe-6742861b9/)

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-12A952?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express.js-url]: https://expressjs.com/
[SQLite]: https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://sqlite.org/download.html
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Swagger]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black
[Swagger-url]: https://swagger.io/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
