class JsonToMarkdown {
  // Deprecated, moving to use markdown file instead.

  // This method converts a JSON object with a heading and body into Markdown format.
  // If a line in the body contains fewer than 10 words, it will be formatted as a subheading.

  public convert(json: { heading: string; body: string[] }): string {
    let res = `# ${json.heading}\n`;

    for (const item of json.body) {
      // Check if the item has fewer than 10 words.
      if (item.split(' ').length < 10) {
        res += `## ${item}
`;
      } else {
        res += `${item}\n
`;
      }
    }

    return res;
  }
}

export default JsonToMarkdown;
