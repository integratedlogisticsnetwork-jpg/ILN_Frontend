import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (
  filename: string,
  data: any[],
  headers: string[],
  keys: string[]
) => {
  const sheetData = [headers];

  data.forEach((item) => {
    const row = keys.map((key) => {
      const value = item[key];
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "object" && value !== null)
        return JSON.stringify(value);
      return value;
    });
    sheetData.push(row);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `${filename.replace(/\s+/g, "_")}.xlsx`);
};
