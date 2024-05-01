import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "../models/NotionBasicModel";
import { Divider, Heading1, Heading2, Heading3, Todo } from "../models/NotionPageModel";
import { logger } from "../utils/Logger";
import NotionPageClient from "../clients/NotionPageClient";

// Service to manage page-level operations
export default class NotionPageService {
  private blocks: IBlock[] = [];
  private client: NotionPageClient;

  constructor(client: NotionPageClient) {
    this.client = client;
  }

  /**
   * Creates a grocery list from the provided data structure and sends it to Notion
   * @param object Data structure containing the grocery list
   */
  public createGroceryList(object: any): void {
    try {
      // Add headings and list items for the grocery list
      this.addHeading1(object.title);
      this.addHeading2(object.supermarket.name);
      object.supermarket.items.forEach((item: string) => this.addTodo(item));
      this.addDivider();
      this.addHeading3(object.pharmacy.name);
      object.pharmacy.items.forEach((item: string) => this.addTodo(item));

      // Set the generated blocks in the Notion page
      this.client.setPageBlocks(this.blocks);
      logger.info("Grocery list has been successfully created and sent to Notion.");
    } catch (error) {
      logger.error("Error creating grocery list:", error);
      throw error;
    }
  }

  /**
   * Adds a heading1 to the page blocks
   * @param richText The text for the heading1
   */
  private addHeading1(richText: string): void {
    const newHeading = new Heading1([new RichText(richText)]);
    this.blocks.push(newHeading);
    logger.debug(`Added Heading1 block: ${richText}`);
  }

  /**
   * Adds a heading2 to the page blocks
   * @param richText The text for the heading2
   */
  private addHeading2(richText: string): void {
    const newHeading = new Heading2([new RichText(richText)]);
    this.blocks.push(newHeading);
    logger.debug(`Added Heading2 block: ${richText}`);
  }

  /**
   * Adds a heading3 to the page blocks
   * @param richText The text for the heading3
   */
  private addHeading3(richText: string): void {
    const newHeading = new Heading3([new RichText(richText)]);
    this.blocks.push(newHeading);
    logger.debug(`Added Heading3 block: ${richText}`);
  }

  /**
   * Adds a TODO item to the page blocks
   * @param richText The text for the TODO item
   */
  private addTodo(richText: string): void {
    const newTodo = new Todo([new RichText(richText)]);
    this.blocks.push(newTodo);
    logger.debug(`Added TODO block: ${richText}`);
  }

  /**
   * Adds a divider to the page blocks
   */
  private addDivider(): void {
    this.blocks.push(new Divider());
    logger.debug("Added a Divider block.");
  }
}
