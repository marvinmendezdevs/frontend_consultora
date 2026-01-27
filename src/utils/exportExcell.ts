import * as XLSX from "xlsx";

export type Column<T> = {
  header: string;
  key: keyof T;
};

export function exportToExcel<T extends Record<string, unknown>>(
  rows: readonly T[],
  columns: readonly Column<T>[],
  fileName: string = "reporte.xlsx",
  sheetName: string = "Hoja1"
): void {
  const data: Record<string, unknown>[] = rows.map((row) => {
    const result: Record<string, unknown> = {};

    columns.forEach(({ header, key }) => {
      result[header] = row[key];
    });

    return result;
  });

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}
