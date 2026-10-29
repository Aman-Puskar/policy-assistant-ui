function getText(node) {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if (node.type === "break") return " ";
  return (node.children || []).map(getText).join("");
}

function splitAtBreaks(nodes) {
  const lines = [[]];

  for (const node of nodes) {
    if (node.type === "break" || (node.type === "html" && /^<br\s*\/?>$/i.test(node.value.trim()))) {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(node);
    }
  }

  return lines.filter((line) => line.length > 0);
}

function tableToList(table) {
  const [header, ...rows] = table.children;
  const labels = (header?.children || []).map((cell, index) => {
    const text = getText(cell).trim();
    return text || `Detail ${index + 1}`;
  });

  return {
    type: "list",
    ordered: true,
    start: 1,
    spread: true,
    children: rows.map((row) => {
      const cells = row.children || [];
      const title = cells[0]?.children || [{ type: "text", value: "Details" }];
      const details = cells.slice(1).flatMap((cell, cellIndex) => {
        const label = labels[cellIndex + 1] || `Detail ${cellIndex + 2}`;
        return splitAtBreaks(cell.children || []).map((line) => ({
          type: "listItem",
          spread: false,
          children: [
            {
              type: "paragraph",
              children: [
                { type: "strong", children: [{ type: "text", value: `${label}:` }] },
                { type: "text", value: " " },
                ...line,
              ],
            },
          ],
        }));
      });

      const children = [{ type: "paragraph", children: title }];
      if (details.length > 0) {
        children.push({
          type: "list",
          ordered: false,
          spread: false,
          children: details,
        });
      }

      return { type: "listItem", spread: true, children };
    }),
  };
}

export default function remarkTablesAsLists() {
  return function transform(tree) {
    function visit(node) {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.flatMap((child) => {
        if (child.type === "table") return [tableToList(child)];
        visit(child);
        return [child];
      });
    }

    visit(tree);
  };
}
