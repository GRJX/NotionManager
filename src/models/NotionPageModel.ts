import { RichText } from "./NotionBasicModel";

// Base class representing a Notion block
class Block {
  public object: string = "block"; // The object type, always "block"
  public type: string; // The specific block type

  constructor(type: string) {
    this.type = type; // Set the block type
  }
}

// Represents a Heading 1 block in Notion
export class Heading1 extends Block {
  public heading_1: { rich_text: RichText[] };

  constructor(rich_text: RichText[]) {
    super("heading_1"); // Set the block type as "heading_1"
    this.heading_1 = { rich_text }; // Set the rich text content
  }
}

// Represents a Heading 2 block in Notion
export class Heading2 extends Block {
  public heading_2: { rich_text: RichText[] };

  constructor(rich_text: RichText[]) {
    super("heading_2"); // Set the block type as "heading_2"
    this.heading_2 = { rich_text }; // Set the rich text content
  }
}

// Represents a Heading 3 block in Notion
export class Heading3 extends Block {
  public heading_3: { rich_text: RichText[] };

  constructor(rich_text: RichText[]) {
    super("heading_3"); // Set the block type as "heading_3"
    this.heading_3 = { rich_text }; // Set the rich text content
  }
}

// Represents a To-do block in Notion
export class Todo extends Block {
  public to_do: { rich_text: RichText[] };

  constructor(rich_text: RichText[]) {
    super("to_do"); // Set the block type as "to_do"
    this.to_do = { rich_text }; // Set the rich text content
  }
}

// Represents a Divider block in Notion
export class Divider extends Block {
  public divider: {}; // Divider block doesn't have additional content

  constructor() {
    super("divider"); // Set the block type as "divider"
    this.divider = {}; // Initialize divider as an empty object
  }
}

// Add more block types here
