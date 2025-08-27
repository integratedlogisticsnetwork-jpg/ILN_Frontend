import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const exportToDocx = (
  title: string,
  data: any[],
  headers: string[],
  keys: string[]
) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, size: 32 })],
          }),
          ...data.map(
            (item) =>
              new Paragraph({
                children: keys.map((key, idx) => {
                  const label = headers[idx];
                  const value = Array.isArray(item[key])
                    ? item[key].join(", ")
                    : item[key] || "-";
                  return new TextRun({ text: `${label}: ${value}\n` });
                }),
              })
          ),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${title.replace(/\s+/g, "_")}.docx`);
  });
};
