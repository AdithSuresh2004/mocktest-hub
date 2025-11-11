import React from "react";

interface TableRendererProps {
  content: string | string[];
}

const TableRenderer: React.FC<TableRendererProps> = ({ content }) => {
  const rows = (Array.isArray(content) ? content : content.split("\n"))
    .map((row) => row.split("|").filter((cell) => cell.trim() !== ""))
    .filter((row) => row.length > 0);

  if (rows.length === 0) return null;

  const isSecondRowSeparator =
    rows.length > 1 && rows[1]?.every((cell) => /^:?-+:?$/.test(cell));

  const startDataIndex = isSecondRowSeparator ? 2 : 1;

  return (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:divide-gray-700 dark:border-gray-600">
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {rows.slice(0, startDataIndex).map((cells, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-50 dark:bg-gray-700">
              {cells.map((cell, cellIndex) => (
                <th
                  key={cellIndex}
                  className="border-r border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 last:border-r-0 dark:border-gray-600 dark:text-gray-100"
                >
                  {cell.trim()}
                </th>
              ))}
            </tr>
          ))}

          {rows.slice(startDataIndex).map((cells, rowIndex) => (
            <tr key={rowIndex + startDataIndex} className="">
              {cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-r border-gray-200 px-3 py-2 text-sm text-gray-700 last:border-r-0 dark:border-gray-600 dark:text-gray-300"
                >
                  {cell.trim()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRenderer;
