// Represents the content of a RichText object in Notion
class Content {
  constructor(public content: string) {}
}

// Represents a RichText object in Notion
export class RichText {
  public type: string = "text"; // Default type for RichText is "text"
  public text: Content;

  constructor(content: string) {
    // Initialize the Content object with the provided text
    this.text = new Content(content);
  }
}

// Add more basic objects here
