const { writeFile } = require('fs/promises');

async function createHtml(filePath, { title, style, bodyItems, scripts }) {
  const [body, script] = [bodyItems, scripts].map(x => x.join('\n'));
  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
    <meta charset="utf-8">
    <title>${title || ''}</title>
    <style>${style || ''}</style>
  </head>
  <body>
    ${body}
  </body>
  <script>
    ${script}
  </script>
  </html>`;

  await writeFile(filePath, content);
}

function tag({ name, content = '', attributes = {} }) {
  const attributesText = Object.keys(attributes)
    .map(atributeName => `${atributeName}="${attributes[atributeName]}"`)
    .join(' ');
  return `<${name} ${attributesText}>${content}</${name}>`;
}

// similar to console.table
function table(contentObject, attributesObject = {}) {
  const allHeaders = Object.entries(contentObject)
    .reduce(
      (headers, [index, value]) => [
        ...new Set([...headers, ...Object.keys(value)]),
      ],
      []
    )
    .sort();

  const tableHeaders = allHeaders.reduce(
    (acc, header) => `${acc}<th>${header}</th>`,
    '<th>(index)</th>'
  );

  const tableBody = Object.entries(contentObject).reduce(
    (body, [index, keyValuePair]) => {
      const cells = allHeaders.reduce(
        (acc, header) => `${acc}<td>${keyValuePair[header] ?? ''}</td>`,
        `<td>${index}</td>`
      );
      body.push(`<tr>${cells}</tr>`);
      return body;
    },
    []
  );

  const attributes = Object.entries(attributesObject).reduce(
    (acc, [attributesName, attributeValue]) =>
      `${acc} ${attributesName}="${attributeValue}"`,
    ''
  );

  return [
    `<table${attributes}>`,
    `<tr>${tableHeaders}</tr>`,
    ...tableBody,
    '</table>',
  ].join('\n');
}

module.exports = { createHtml, table, tag };
