# URL Health Monitor - Backend & Frontend

This project is a URL health monitoring system that allows users to track website availability, response times, and uptime percentage. The system includes a Rails API backend for managing monitors and performing health checks, and a React frontend for visualization.

## Backend (Rails API)

The backend is a Ruby on Rails API that provides endpoints for managing monitors, checks, and statistics.
It uses Sidekiq + Redis for background jobs and includes Basic Authentication for security.

### Features

✅ CRUD for Site Monitors (Create, Read, Update, Delete)

✅ Background Jobs using Sidekiq to check URL availability

✅ Authentication (Basic Auth)

✅ Statistics (Uptime Percentage & Average Response Time)

✅ Scheduled Jobs (Sidekiq Scheduler) for automatic health checks

✅ Full Test (RSpec)


### How to Run the Project (Backend)

#### Prerequisites

Make sure you have the following installed:

* Docker 

#### Clone the Repository

```
git clone`https://github.com/marquesaline/url-health-monitor.git
cd url-health-monitor
```

#### Set Up the Environment Variables

Copy the `.env.example` file to .env and fill in the required variables:

```
cp .env.example .env
```

#### Start the Backend Services

Run the following command to build and start all services:

```
docker-compose up -d --build
```

This will start:

* Rails API (on port 3000)
* PostgreSQL Database (on port 5432)
* Redis (for Sidekiq)
* Sidekiq Worker (to process background jobs)

#### Create & Migrate the Database

Once the services are running, create and migrate the database:

```
docker-compose run --rm api bundle exec rails db:create db:migrate
```

#### Running the API

Once everything is set up, you can access the API at:

```
http://localhost:3000
```

Since authentication is required, you will need to send requests with Basic Auth using the credentials from the .env file.

### Running Tests

To run all tests:

```
docker-compose up test
```



