![Build .NET Core backend](https://github.com/lhargil/health-wise-app/workflows/Build%20.NET%20Core%20backend/badge.svg) ![Build Angular frontend](https://github.com/lhargil/health-wise-app/workflows/Build%20Angular%20frontend/badge.svg)

# Description

Health wise is an easy-to-use app to keep track of your health information. It contains forms for inputting your health details as well as a dashboard with charts for at-a-glance information.

## Blood pressure tracking

A calendar UI is utilized to ease the task of inputting blood pressure readings.

# Technical details

Health wise is composed of two main projects, the frontend app and the backend API. The frontend is built using Angular and TailwindCSS. The backend API is built using ASP.NET Core with Entityframework Core - MySQL for the database. NSwag is used to generate the Open API details.

# Running the applications

## Frontend

`npm run start` - Run the frontend application using the ASP.NET Core backend.

`npm run start:local` - Run the frontend application using the Angular in-memory web api. This is useful when quickly prototyping new API endpoints.

## Backend

A MySQL database is required to run the API. Once installed, set the connection string `ConnectionStrings:HealthWiseDb` to your MySQL configuration.

`dotnet run` - Run the backend wusing defaults.
