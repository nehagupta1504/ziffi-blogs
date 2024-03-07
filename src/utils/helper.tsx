export const renderPartialText = (content: string, length: number, endingString: string) => {
  return content.split(" ").slice(0, length).join(" ") + (content.split(" ").length > length ? endingString : "");
};
