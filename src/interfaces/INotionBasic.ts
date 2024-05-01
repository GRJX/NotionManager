// Interface representing the content of a rich text object
interface IContent {
  content: string; // The actual text content
}

// Interface representing a rich text object
interface IRichText {
  type: string; // The type of the rich text object, typically "text"
  text: IContent; // An object containing the content of the rich text
}

// Add interfaces representing other Page properties
