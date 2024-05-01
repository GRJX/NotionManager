import { RichText } from "./NotionBasicModel";

// Abstract base class for different property types
abstract class Properties {
  constructor(public type: string) {}
}

// Represents a Title property type in Notion
export class Title extends Properties {
  public title: RichText[];

  constructor(rich_text: RichText[]) {
    super("title"); // Set the property type as "title"
    this.title = rich_text; // Set the rich text content
  }
}

// Represents a Number property type in Notion
export class Number extends Properties {
  public number: number;

  constructor(number: number) {
    super("number"); // Set the property type as "number"
    this.number = number; // Set the numeric value
  }
}

// Represents a Text property type in Notion
export class Text extends Properties {
  public rich_text: RichText[];

  constructor(rich_text: RichText[]) {
    super("rich_text"); // Set the property type as "rich_text"
    this.rich_text = rich_text; // Set the rich text content
  }
}

// Represents a Select property type in Notion
export class Select extends Properties {
  public select: { name: string };

  constructor(name: string) {
    super("select"); // Set the property type as "select"
    this.select = { name }; // Set the select option name
  }
}

// Add more page properties here