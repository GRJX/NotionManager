import NotionDatabaseClient from "../clients/NotionDatabaseClient";
import { RichText } from "../models/NotionBasicModel";
import { Select, Title, Number, Text } from "../models/NotionDatabaseModel";
import { logger } from "../utils/Logger";

// Interface describing the structure of a Notion database page properties
interface INotionDatabaseStructure {
  Product: Title;
  Store: Select;
  Amount: Number;
  Remark: Text;
}

// Class to manage operations on a Notion database using NotionDatabaseClient
export default class NotionDatabaseService {
  private client: NotionDatabaseClient;

  // Initialize the service with a Notion database client
  constructor(client: NotionDatabaseClient) {
    this.client = client;
  }

  /**
   * Add multiple objects to the database by mapping them to the appropriate database structure.
   * @param objects An array of objects to be added to the database.
   */
  public async addObjectToDb(objects: any) {
    try {
      for (const grocery of objects.groceries) {
        const notionDbData: INotionDatabaseStructure = this.mapToDatabaseStructure(grocery);
        await this.client.setDatabaseEntry(notionDbData);
        logger.info("Object successfully added to Notion database.");
      }
    } catch (error) {
      logger.error("Error creating database object(s):", error);
      throw error;
    }    
  }
  
  /**
   * Maps an object to the Notion database structure.
   * @param object The object to map to the database structure.
   * @returns The mapped object as an INotionDatabaseStructure.
   */
  private mapToDatabaseStructure(object: any): INotionDatabaseStructure {
    return {
      Product: this.addTitle(object.name),
      Store: this.addSelect(object.store),
      Amount: this.addNumber(object.amount),
      Remark: this.addText(object.remark),
    };
  }

  // Add a title field to a database entry
  private addTitle(richText: string): Title {
    return new Title([new RichText(richText)]);
  }

  // Add a number field to a database entry
  private addNumber(number: number): Number {
    return new Number(number);
  }

  // Add a text field to a database entry
  private addText(richText: string): Text {
    return new Text([new RichText(richText)]);
  }

  // Add a select field to a database entry
  private addSelect(select: string): Select {
    return new Select(select);
  }
}
