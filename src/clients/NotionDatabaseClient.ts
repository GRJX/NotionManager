import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { logger } from "../utils/Logger";

// Class to handle Notion database operations
class NotionDatabaseClient {
  private notion: Client;
  public databaseId: string;

  /**
   * Initializes the NotionDatabaseClient with an integration token and database ID.
   * @param integrationToken The Notion integration token.
   * @param databaseId The ID of the Notion database to operate on.
   */
  constructor(integrationToken: string, databaseId: string) {
    // Initialize the Notion client with the provided token
    this.notion = new Client({ auth: integrationToken });
    this.databaseId = databaseId;
  }

  /**
   * Retrieve the contents of the database, optionally using a filter.
   * @param filter The filter to apply while querying the database.
   * @returns An array of the contents retrieved from the database.
   */
  public async getDatabaseContents(
    filter: any = undefined
  ): Promise<(PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse)[]> {
    try {
      // Query the database for its contents
      const response = await this.notion.databases.query({
        database_id: this.databaseId,
        filter: filter,
      });

      logger.info(
        `Successfully retrieved contents of database with ID '${this.databaseId}'.`
      );
      return response.results;
    } catch (error) {
      logger.error("Error occurred while retrieving database contents:", error);
      throw error;
    }
  }

  /**
   * Add a new entry to the database.
   * @param databaseEntry The properties of the new database entry.
   */
  public async setDatabaseEntry(databaseEntry: any) {
    try {
      // Create a new page in the database with the specified properties
      const response = await this.notion.pages.create({
        parent: {
          database_id: this.databaseId,
        },
        properties: databaseEntry,
      });

      logger.info(
        `Successfully created a new entry in the database '${this.databaseId}'.`
      );
      logger.debug("Response from Notion:", response);
    } catch (error) {
      logger.error(
        "Error occurred while creating an entry in the database:",
        error
      );
      process.exit(1); // Exit the process with a failure code
    }
  }

  /**
   * Archive an entry in the database by its page ID.
   * @param pageId The ID of the page to archive.
   * @returns The response from Notion after updating the page.
   */
  public async archiveDatabaseEntry(pageId: string) {
    try {
      // Mark the page as archived
      const response = await this.notion.pages.update({
        page_id: pageId,
        archived: true,
      });

      logger.info(
        `Successfully archived the entry with ID '${pageId}' from the database.`
      );
      return response;
    } catch (error) {
      logger.error(
        "Error occurred while archiving the entry from the database:",
        error
      );
      throw error;
    }
  }
}

export default NotionDatabaseClient;
