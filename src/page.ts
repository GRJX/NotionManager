import NotionPageClient from "./clients/NotionPageClient";
import NotionPageService from "./service/NotionPageService";
import { getEnvVariable } from "./utils/ConfigHelper";
import { logger } from "./utils/Logger";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Interface representing the details of grocery items
interface IGroceryDetails {
  name: string;
  items: string[];
}

// Interface representing the structure of a grocery list
interface IGroceryList {
  title: string;
  supermarket: IGroceryDetails;
  pharmacy: IGroceryDetails;
}

/**
 * Create a grocery list on a Notion page.
 * @param token The Notion integration token
 */
async function toNotionPage(token: string) {
  // Retrieve the Notion page ID from environment variables
  const databaseId = getEnvVariable("NOTION_PAGE_ID");

  // Initialize the Notion client and service
  const pageClient = new NotionPageClient(token, databaseId);
  const pageService = new NotionPageService(pageClient);

  // Example input data for the grocery list
  const groceryListPage: IGroceryList = {
    title: "Grocery List Example",
    supermarket: {
      name: "Albert Heijn",
      items: ["Pindakaas", "Chocopast", "Brood", "Melk"],
    },
    pharmacy: {
      name: "Kruitvat",
      items: ["Tandpasta", "Deo"],
    },
  };

  // Create the grocery list on the Notion page
  logger.info(`Creating grocery list on Notion page with ID '${databaseId}'.`);
  pageService.createGroceryList(groceryListPage);
  logger.info("Successfully created grocery list on Notion page.");
}

async function main() {
  try {
    // Retrieve the Notion integration token from environment variables
    const integrationToken = getEnvVariable("NOTION_SECRET");

    // Proceed to create the grocery list on the Notion page
    await toNotionPage(integrationToken);
  } catch (error) {
    logger.error("Error executing main function:", error);
    throw Error;
  }
}

// Execute the main function
main();
