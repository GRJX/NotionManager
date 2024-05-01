# Notion Manager

## Overview
Notion Manager is a tool designed to interact with Notion databases via the Notion API. The tool provides services to manage pages and databases, utilizing a modular architecture to ensure ease of maintenance and scalability.

## Features
- Interact with Notion databases via the Notion API
- Modular architecture with separate modules for clients, models, and services
- Command-line interface for database and page operations
- Utilities for configuration management and date-time handling

## Project Structure

```
src
|-- clients
|   |-- NotionDatabaseClient.ts
|   |-- NotionPageClient.ts
|-- models
|   |-- NotionBasicModel.ts
|   |-- NotionDatabaseModel.ts
|   |-- NotionPageModel.ts
|-- service
|   |-- NotionDatabaseService.ts
|   |-- NotionPageService.ts
|-- utils
|   |-- ConfigHelper.ts
|   |-- DateTimeHandler.ts
.vscode
|-- launch.json
dist
log
node_modules
.gitignore
.eslint.rc.js
package-lock.json
package.json
tsconfig.json
```

## Requirements
- Node.js v14 or later
- NPM v7 or later

## Installation
1. Clone the repository:
   ```
   git clone <repository_url>
   ```
2. Navigate to the project directory:
    ```
    cd NOTIONMANAGER
    ```
3. Install the dependencies:
    ```
    cd npm install
    ```
## Usage

### Notion Integration
1. Go to the [Notion integrations](https://www.notion.so/my-integrations) website and create and name your integration (i.e. `typescript-integration`). 
2. Copy the secret for later use (see [Configuration](#configuration)).
3. Open Notion and go to the page or database you want to integrate.
4. Click on the 3 dots in the top right corner and go to `Connections` and select your integration (`typescript-integration`).

### Configuration
Configuration can be managed using the `.env` file located at the root of the project. Set the necessary environment variables.
- `LOG_LEVEL`: Set default value to `INFO`.
- `NOTION_SECRET`: Your Notion API integration token.
- `NOTION_PAGE_ID`: The Notion page to interact with.
- `NOTION_DATABASE_ID`: The Notion database to interact with.

*Note*: The Notion ID's is embedded in your page or database site. Copy the site link by clicking on the 3 dots in the top right corner and click `Copy link`.

### Scripts
- **Clean:** Remove all files from the dist folder:
    ```
    npm run clean
    ```
- `build`: Clean the dist folder and transpile TypeScript files:
    ```bash
    npm run build
    ```
- `page`: Execute the page script:
    ```
    npm run page
    ```
    Execute in debug mode:
    ```
    npm run page:debug
    ```
- `database`: Execute the database script:
    ```
    npm run db
    ```
    Execute in debug mode:
    ```
    npm run db:debug
    ```
### Logs

Logs will be generated in the `./log` directory with detailed information on the execution.

## Documentation
For more documentation on how to integrate and extend the interactions with Notion, see [Notion API OVerview](https://developers.notion.com/docs/getting-started).
