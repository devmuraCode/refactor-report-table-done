import React from 'react';
import './TableCus.css';

export type DataTableColumn<T = any> = {
  title: string;
  key: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T) => React.ReactNode;
  children?: DataTableColumn<T>[];
};

export type DataTableProps<T = any> = {
  data: T[];
  columns: DataTableColumn<T>[];
};

export function DataTable<T = any>({ data, columns }: DataTableProps<T>) {

  const toReactNode = (value: unknown): React.ReactNode => {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null ||
      value === undefined
    ) {
      return value;
    }
    if (React.isValidElement(value)) {
      return value;
    }
    return JSON.stringify(value);
  };
  const formattedData = data.map((item, index) => ({
    ...item,
    key: (item as any).id || (item as any).key || index + 1,
  }));

  const renderHeaders = (cols: DataTableColumn<T>[]): React.ReactNode[] => {
    return cols.map((col) => {
      if (col.children) {
        return (
          <th key={col.key} colSpan={col.children.length}>
            {col.title}
            {renderHeaders(col.children)}
          </th>
        );
      }
      return <th key={col.key}>{col.title}</th>;
    });
  };

  const flattenCells = (cells: React.ReactNode[]): React.ReactNode[] => cells.flat(Infinity);

  const renderCells = (cols: DataTableColumn<T>[], item: T): React.ReactNode[] => {
    return flattenCells(cols.map((col) => {
      if (col.children) {
        return renderCells(col.children, item);
      }
      const rawValue = col.dataIndex ? item[col.dataIndex] : undefined;
      const value = toReactNode(rawValue);
      let cellContent: React.ReactNode;
      if (col.render) {
        cellContent = col.render(value, item);
        cellContent = (cellContent === 0) ? 0 : (cellContent || '-');
      } else {
        cellContent = (value === 0) ? 0 : (value || '-');
      }
      cellContent = toReactNode(cellContent);
      return (
        <td key={col.key}>
          {cellContent}
        </td>
      );
    }));
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>{renderHeaders(columns)}</tr>
        </thead>
        <tbody>
          {formattedData.map((item) => (
            <tr key={item.key}>{renderCells(columns, item)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}