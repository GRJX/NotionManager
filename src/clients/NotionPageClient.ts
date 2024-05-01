import { Client } from "@notionhq/client";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";
import { logger } from "../utils/Logger";

// Class to handle Notion page operations
class NotionPageClient {
  // Limit of blocks fetched or appended per API call
  private maxBlocks = 100;
  private notion: Client;
  public pageId: string;

  /**
   * Initializes the NotionPageClient with an integration token and page ID.
   * @param integrationToken The Notion integration token.
   * @param pageId The ID of the Notion page to operate on.
   */
  constructor(integrationToken: string, pageId: string) {
    // Initialize the Notion client with the provided token
    this.notion = new Client({ auth: integrationToken });
    this.pageId = pageId;
  }

  /**
   * Fetches all blocks from the Notion page.
   * @returns An array of blocks from the page.
   */
  public async getPageBlocks() {
    try {
      let allBlocks = [];
      let hasMore = true;
      let startCursor: string | null = null;

      while (hasMore) {
        // Fetch blocks with pagination
        const response = await this.notion.blocks.children.list({
          block_id: this.pageId,
          page_size: this.maxBlocks,
          start_cursor: startCursor ?? undefined,
        });

        allBlocks.push(...response.results); // Add new blocks to the array

        hasMore = response.has_more; // Determine if there are more blocks to fetch
        startCursor = response.next_cursor; // Set cursor for the next batch

        logger.debug(`Fetched ${response.results.length} blocks from Notion.`);
      }

      logger.info(
        `Successfully retrieved ${allBlocks.length} blocks from page '${this.pageId}'.`
      );
      return allBlocks;
    } catch (error) {
      logger.error("Error occurred while listing Notion page blocks:", error);
      process.exit(1); // Exit the process with a failure code
    }
  }

  /**
   * Appends blocks to the Notion page.
   * @param blocks The blocks to append to the page.
   */
  public async setPageBlocks(blocks: IBlock[]): Promise<void> {
    try {
      for (let i = 0; i < blocks.length; i += this.maxBlocks) {
        // Get the current segment of blocks within the limit
        const blockSegment = blocks.slice(i, i + this.maxBlocks) as unknown as BlockObjectRequest[];

        // Append the current segment of blocks to the page
        const response = await this.notion.blocks.children.append({
          block_id: this.pageId,
          children: blockSegment,
        });

        logger.debug(
          `Added ${blockSegment.length} blocks to page '${this.pageId}'.`
        );
        logger.debug("Response from Notion:", response);
      }
      logger.info(
        `Successfully appended all provided blocks to page '${this.pageId}'.`
      );
    } catch (error) {
      logger.error("Error occurred while setting blocks:", error);
      process.exit(1); // Exit the process with a failure code
    }
  }

  /**
   * Deletes a specific block by its ID.
   * @param blockId The ID of the block to delete.
   */
  public async deleteBlock(blockId: string): Promise<void> {
    try {
      // Delete the block with the given ID
      const response = await this.notion.blocks.delete({
        block_id: blockId,
      });

      logger.debug(`Successfully deleted block with ID '${blockId}':`, response);
    } catch (error) {
      logger.error(`Error occurred while deleting block '${blockId}':`, error);
      process.exit(1); // Exit the process with a failure code
    }
  }
}

export default NotionPageClient;
