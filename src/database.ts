import NotionDatabaseClient from "./clients/NotionDatabaseClient";
import NotionDatabaseService from "./service/NotionDatabaseService";
import { getEnvVariable } from "./utils/ConfigHelper";
import { logger } from "./utils/Logger";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Interface representing the details of items
interface IItemDetails {
  store: string;
  name: string;
  amount: number;
  remark: string;
}

// Interface representing the structure of a grocery list
interface IGroceryList {
  title: string;
  groceries: IItemDetails[];
}

/**
 * Create a grocery list on a Notion page.
 * @param token The Notion integration token
 */
async function toNotionDatabase(token: string) {
  // Retrieve the Notion page ID from environment variables
  const databaseId = getEnvVariable("NOTION_DATABASE_ID");

  // Initialize the Notion client and service
  const databaseClient = new NotionDatabaseClient(token, databaseId);
  const databaseService = new NotionDatabaseService(databaseClient);

  // Example input data for the grocery list
  const groceryList: IGroceryList = {
    title: "Grocery List Example",
    groceries: [
      {
        store: "Albert Heijn",
        name: "Pindakaas",
        amount: 2,
        remark: "100% met stukjes",
      },
      {
        store: "Albert Heijn",
        name: "Chocopasta",
        amount: 2,
        remark: "Huismerk",
      },
      {
        store: "Albert Heijn",
        name: "Brood",
        amount: 1,
        remark: "Volkoren",
      },
      {
        store: "Albert Heijn",
        name: "Melk",
        amount: 1,
        remark: "2 liter pak",
      },
      {
        store: "Kruitvat",
        name: "Tandpasta",
        amount: 1,
        remark: "Voor gevoellige tanden",
      },
      {
        store: "Kruitvat",
        name: "Deo",
        amount: 4,
        remark: "Roller in de aanbieding",
      },
    ],
  };

  // Create the grocery list on the Notion page
  logger.info(`Creating grocery list on Notion page with ID '${databaseId}'.`);
  await databaseService.addObjectToDb(groceryList);
  logger.info("Successfully created grocery list on Notion page.");
}

async function main() {
  try {
    // Retrieve the Notion integration token from environment variables
    const integrationToken = getEnvVariable("NOTION_SECRET");

    // Proceed to create the grocery list on the Notion page
    await toNotionDatabase(integrationToken);
  } catch (error) {
    logger.error("Error executing main function:", error);
    throw Error;
  }
}

// Execute the main function
main();
