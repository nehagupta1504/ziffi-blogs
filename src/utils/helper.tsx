export const renderPartialText = (content: string, length: number, endingString: string) => {
  // TODO: to fix ending string length not coming correct for now "..."
  // The code takes the first two non-empty lines of content, joins them together with a new line, 
  // splits the resulting string by spaces, takes only the first 30 words, and joins them back together with spaces
  return content.split(/<[^>]*>/g).filter(item => item.trim() !== "").slice(0, length).join("\n").split(" ").slice(0, 60).join(" ") + (content.split(" ").length > 60 ? endingString : "");
};
