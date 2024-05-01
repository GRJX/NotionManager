// Base interface representing a generic Notion block
interface IBlock {
  object: string; // The object type, always "block"
  type: string; // The specific block type
}

// Interface representing a Heading 3 block in Notion
interface IHeading3 extends IBlock {
  heading_3: { rich_text: IRichText[] }; // Rich text content for Heading 3
}

// Interface representing a Todo block in Notion
interface ITodo extends IBlock {
  to_do: { rich_text: IRichText[] }; // Rich text content for Todo
}

// Interface representing a Divider block in Notion
interface IDivider extends IBlock {
  divider: {}; // Divider block doesn't have additional content
}

// Add interfaces representing other block types