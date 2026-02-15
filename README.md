# GGApp

<p align="center">
  <strong>GlyphGrid Full-Stack Inventory & Weather Application</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet" alt=".NET 8.0"/>
  <img src="https://img.shields.io/badge/Angular-20-DD0031?logo=angular" alt="Angular 20"/>
  <img src="https://img.shields.io/badge/React_Native-0.74-61DAFB?logo=react" alt="React Native"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/CI%2FCD-Jenkins-D24939?logo=jenkins" alt="Jenkins"/>
  <img src="https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker" alt="Docker"/>
</p>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
  - [Models](#models)
  - [Services](#services)
  - [Database](#database)
- [Frontend](#frontend)
  - [React Native (GGAppFrontend)](#react-native---ggappfrontend)
  - [Angular SSR (GGANGULAR)](#angular-ssr---ggangular)
  - [Angular (GGAppAngular)](#angular---ggappangular)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Getting Started](#getting-started)
- [License](#license)

---

## Overview

**GGApp** is a full-stack application developed by **GlyphGrid**, featuring an ASP.NET Core 8.0 backend API with multiple frontend clients. The application provides:

- **Inventory Management** — Low stock alert monitoring with threshold-based notifications
- **Weather Forecasting** — 5-day weather forecast display with temperature conversion

The project demonstrates a modern multi-platform approach with a shared backend serving a React Native mobile app, an Angular SSR web application, and a standalone Angular web client.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Clients                         │
│                                                                 │
│  ┌─────────────────┐  ┌───────────────┐  ┌───────────────────┐  │
│  │  React Native   │  │  Angular SSR  │  │    Angular Web    │  │
│  │  (GGAppFrontend)│  │  (GGANGULAR)  │  │  (GGAppAngular)  │  │
│  │                 │  │               │  │                   │  │
│  │  • Weather      │  │  • Low Stock  │  │  • Weather        │  │
│  │    Forecast     │  │    Alerts     │  │    Forecast       │  │
│  └────────┬────────┘  └──────┬────────┘  └────────┬──────────┘  │
│           │                  │                    │              │
└───────────┼──────────────────┼────────────────────┼──────────────┘
            │                  │                    │
            │      REST API (HTTP/HTTPS)            │
            │                  │                    │
┌───────────┴──────────────────┴────────────────────┴──────────────┐
│                     ASP.NET Core 8.0 Backend                     │
│                                                                  │
│  ┌────────────────────────┐  ┌─────────────────────────────────┐ │
│  │ WeatherForecastController │  │    InventoryController        │ │
│  │ GET /api/WeatherForecast  │  │ GET /api/Inventory/           │ │
│  │                           │  │     low-stock-alerts          │ │
│  └────────────────────────┘  └──────────┬──────────────────────┘ │
│                                         │                        │
│  ┌──────────────────────────────────────┴───────────────────────┐ │
│  │              InventoryService (IInventoryService)            │ │
│  └──────────────────────────────┬──────────────────────────────┘ │
│                                 │                                │
│  ┌──────────────────────────────┴──────────────────────────────┐ │
│  │             EF Core InMemory Database                       │ │
│  │             (AppDbContext → InventoryItems)                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Swagger/OpenAPI │ CORS │ Dependency Injection                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer         | Technology                                          |
|---------------|------------------------------------------------------|
| **Backend**   | ASP.NET Core 8.0, Entity Framework Core 8.0 (InMemory), Swagger/OpenAPI |
| **Frontend 1**| React Native 0.74 (TypeScript), Redux, Axios        |
| **Frontend 2**| Angular 20 (SSR), Angular Signals, RxJS, Express    |
| **Frontend 3**| Angular 18+, HttpClient, RxJS                        |
| **Testing**   | xUnit + FluentAssertions + Moq (.NET), Karate (API), Jest + Selenium-Appium (UI), Jasmine + Karma (Angular) |
| **CI/CD**     | Jenkins (Declarative Pipeline), Docker               |
| **Runtime**   | .NET 8.0, Node.js ≥ 18, Java 11+ (Karate tests)    |

---

## Project Structure

```
GGApp_Test/
├── backend/
│   ├── GGAppBackend/                  # ASP.NET Core 8.0 Web API
│   │   ├── Controllers/
│   │   │   ├── InventoryController.cs     # Low stock alerts endpoint
│   │   │   └── WeatherForecastController.cs # Weather forecast endpoint
│   │   ├── Models/
│   │   │   ├── InventoryItem.cs           # Inventory entity model
│   │   │   ├── InvetoryItemReqDto.cs      # Inventory request DTO
│   │   │   ├── LowStockItemReqDto.cs      # Low stock alert response DTO
│   │   │   └── WeatherForecast.cs         # Weather forecast model
│   │   ├── Services/
│   │   │   ├── IInventoryService.cs       # Inventory service interface
│   │   │   └── InventoryService.cs        # Inventory service implementation
│   │   ├── Data/
│   │   │   └── AppDbContext.cs            # EF Core DbContext
│   │   ├── Program.cs                     # Application entry point
│   │   └── appsettings.json               # Application configuration
│   └── GGAppBackend.Tests/               # Backend unit/integration tests
│       └── Controllers/
│           └── WeatherForecastControllerTests.cs
│
├── frontend/
│   ├── GGAppFrontend/                 # React Native mobile app
│   │   ├── src/
│   │   │   ├── App.tsx                    # Main application component
│   │   │   ├── config.ts                  # API URL configuration
│   │   │   ├── components/
│   │   │   │   └── WeatherForecast.tsx    # Weather forecast component
│   │   │   └── services/
│   │   │       └── WeatherService.ts      # Weather API service
│   │   ├── __tests__/                     # Frontend unit tests
│   │   └── package.json
│   │
│   ├── GGANGULAR/                     # Angular SSR web application
│   │   ├── src/app/
│   │   │   ├── app.ts                     # Root component
│   │   │   ├── low-stock-alerts/          # Low stock alerts feature
│   │   │   │   ├── low-stock-alerts.component.ts
│   │   │   │   ├── low-stock-alerts.component.css
│   │   │   │   └── low-stock-alerts.component.spec.ts
│   │   │   ├── services/
│   │   │   │   ├── inventory.service.ts   # Inventory API service (Signals)
│   │   │   │   └── weather.ts
│   │   │   └── models/
│   │   │       └── low-stock-alert.ts     # Low stock alert interface
│   │   └── package.json
│   │
│   └── GGAppAngular/                  # Angular standalone web app
│       ├── src/app/
│       │   ├── app.component.ts           # Root component
│       │   ├── components/
│       │   │   └── weather-forecast.component.ts
│       │   ├── services/
│       │   │   └── weather.service.ts
│       │   └── models/
│       │       └── weather-forecast.model.ts
│       └── package.json
│
├── tests/
│   ├── api/                           # Karate API integration tests
│   │   ├── src/WeatherForecast.feature
│   │   ├── pom.xml
│   │   └── karate.jar
│   └── ui/                            # Selenium/Appium UI tests
│       ├── src/WeatherForecast.spec.ts
│       ├── TestEnvironment.ts
│       └── package.json
│
├── projectutils/
│   └── docker/
│       └── Dockerfile                 # CI/CD build environment image
│
├── .github/instructions/              # GitHub workflow instructions
├── Jenkinsfile                        # CI/CD pipeline definition
├── package.json                       # Root workspace configuration
└── .gitignore
```

---

## Backend

### API Endpoints

| Method | Endpoint                            | Description                            | Response                    |
|--------|-------------------------------------|----------------------------------------|-----------------------------|
| `GET`  | `/api/WeatherForecast`              | Returns 5-day weather forecast         | `WeatherForecast[]`         |
| `GET`  | `/api/Inventory/low-stock-alerts`   | Returns items below reorder threshold  | `LowStockItemReqDto[]`     |

> **Swagger UI** is available at `/swagger` when running in Development mode.

### Models

#### InventoryItem (Entity)
```csharp
public class InventoryItem
{
    public int Id { get; set; }
    public string ItemName { get; set; }
    public string Category { get; set; }
    public int Quantity { get; set; }
    public int ReorderLevel { get; set; }
    public DateTime CreatedDate { get; set; }
}
```

#### LowStockItemReqDto (Response DTO)
```csharp
public class LowStockItemReqDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int StockLevel { get; set; }
    public int LowStockThreshold { get; set; }
}
```

#### WeatherForecast
```csharp
public class WeatherForecast
{
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
    public string? Summary { get; set; }
}
```

### Services

| Service               | Interface             | Description                                          |
|-----------------------|------------------------|------------------------------------------------------|
| `InventoryService`    | `IInventoryService`    | Queries inventory items where `Quantity ≤ ReorderLevel` and returns `LowStockItemReqDto` projections |

### Database

- **Provider:** Entity Framework Core InMemory (`LowStockAlertDb`)
- **DbSet:** `InventoryItems` — Stores all inventory item records
- **Tracking:** Uses `AsNoTracking()` for optimized read-only queries

### Backend Configuration

- **CORS:** Configured to allow all origins, methods, and headers
- **Dependency Injection:** `IInventoryService` → `InventoryService` (Scoped)
- **HTTPS Redirection:** Enabled
- **Target Framework:** .NET 8.0

---

## Frontend

### React Native — GGAppFrontend

A cross-platform mobile app (Android / iOS / Windows) built with **React Native 0.74** and **TypeScript**.

**Features:**
- Tomorrow's weather forecast display (temperature in °C/°F, summary)
- Dark/Light mode support
- Axios-based API communication

**Key Files:**
| File                    | Description                                     |
|-------------------------|-------------------------------------------------|
| `App.tsx`               | Root component with dark mode detection          |
| `WeatherForecast.tsx`   | Displays tomorrow's weather with loading state   |
| `WeatherService.ts`     | Fetches weather data via Axios from backend API  |
| `config.ts`             | API base URL configuration (`localhost:5209`)    |

**Dependencies:** React 18.2, React Native 0.74, Redux, Axios

---

### Angular SSR — GGANGULAR

A server-side rendered Angular 20 web application with **Angular Signals** for reactive state management.

**Features:**
- **Low Stock Alerts Dashboard** — Displays products below reorder threshold
  - Loading, error, and empty state handling
  - Critical badge for items at ≤ 50% threshold
  - Refresh and error dismissal actions
- Server-Side Rendering with Express
- OnPush change detection for optimal performance

**Key Files:**
| File                                | Description                                      |
|-------------------------------------|--------------------------------------------------|
| `low-stock-alerts.component.ts`     | Standalone component with inline template         |
| `inventory.service.ts`              | HTTP service using Angular Signals (`signal`)     |
| `low-stock-alert.ts`               | TypeScript interface matching `LowStockItemReqDto`|
| `app.ts`                           | Root component importing `LowStockAlertsComponent`|

**Dependencies:** Angular 20.1, Express 5, RxJS 7.8

---

### Angular — GGAppAngular

A standalone Angular web application focused on **Weather Forecast** display.

**Features:**
- Weather forecast component with styled card layout
- OnPush change detection strategy
- Modular architecture (components, services, models)

**Key Files:**
| File                               | Description                                      |
|------------------------------------|--------------------------------------------------|
| `weather-forecast.component.ts`    | Weather display component                         |
| `weather.service.ts`               | Weather data service with HttpClient              |
| `weather-forecast.model.ts`        | TypeScript model for weather forecast             |
| `app.component.html`              | Root template with header and weather component   |

---

## Testing

### Test Suites Overview

| Test Suite               | Framework                              | Location                                | Description                          |
|--------------------------|----------------------------------------|-----------------------------------------|--------------------------------------|
| **Backend Unit Tests**   | xUnit + FluentAssertions + Moq         | `backend/GGAppBackend.Tests/`           | Integration tests using `WebApplicationFactory` |
| **API Integration Tests**| Karate 1.4.1 (Java)                    | `tests/api/`                            | BDD-style API contract testing       |
| **UI End-to-End Tests**  | Jest + Selenium-Appium + WinAppDriver  | `tests/ui/`                             | Windows UI automation testing        |
| **Angular Unit Tests**   | Jasmine + Karma                        | `frontend/GGANGULAR/`                  | Component-level unit tests           |
| **React Native Tests**   | Jest + React Testing Library           | `frontend/GGAppFrontend/__tests__/`    | Component rendering tests            |

### Running Tests

```bash
# Backend (.NET) tests
cd backend
dotnet test GGAppBackend.Tests

# React Native frontend tests
cd frontend/GGAppFrontend
yarn test

# Angular (GGANGULAR) tests
cd frontend/GGANGULAR
yarn test

# API integration tests (requires Java 11+ and running backend)
cd tests/api
# Windows:
run.bat
# Linux/macOS:
./run.sh

# UI tests (requires WinAppDriver)
cd tests/ui
yarn test
```

---

## CI/CD Pipeline

The project uses a **Jenkins Declarative Pipeline** with a custom Docker build agent.

### Pipeline Stages

```
Clone Repository → Install Dependencies → Build Frontend → Build Backend → Frontend Tests → Backend Tests
```

| Stage                    | Description                                                |
|--------------------------|------------------------------------------------------------|
| **Clone Repository**     | Checks out from GitHub (`GlyphGrid/GGApp_Test`)           |
| **Install Dependencies** | Installs Yarn, enables Corepack, restores .NET packages    |
| **Build Frontend**       | Runs `yarn cache clean && yarn install` for GGAppFrontend  |
| **Build Backend**        | Builds `GGAppBackend.Tests` with Release configuration     |
| **Frontend Tests**       | Executes `yarn test` on the React Native project           |
| **Backend Tests**        | Runs `dotnet test GGAppBackend.Tests`                      |

### Docker Build Environment

The CI/CD Docker image (`kieranec/quasarpoint:0.0.8`) is based on **Ubuntu 24.04** and includes:
- .NET SDK 8.0
- Node.js 22.5.0 (via NVM)
- OpenJDK 17
- Git, curl, unzip

---

## Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js ≥ 18](https://nodejs.org/) with Yarn
- [Java 11+](https://adoptium.net/) (for Karate API tests)

### Run Backend

```bash
cd backend/GGAppBackend
dotnet restore
dotnet run
```

The API will be available at `https://localhost:5209` (or the configured port).  
Swagger UI: `https://localhost:5209/swagger`

### Run React Native Frontend

```bash
cd frontend/GGAppFrontend
yarn install

# Android
yarn android

# iOS
yarn ios

# Windows
yarn windows
```

### Run Angular SSR Frontend (GGANGULAR)

```bash
cd frontend/GGANGULAR
yarn install
yarn start
```

Navigate to `http://localhost:4200/`

### Run Angular Frontend (GGAppAngular)

```bash
cd frontend/GGAppAngular
npm install
ng serve
```

Navigate to `http://localhost:4200/`

---

## License

This project is developed by **GlyphGrid**. All rights reserved.
