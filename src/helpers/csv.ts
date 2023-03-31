const csv = (fileName: string, data: any) => {
  const csvContent = csvData(data);

  const url = window.URL.createObjectURL(new Blob([csvContent]));

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// This method will set your api json
// into an excel sheet format
const csvData = (data: any) => {
  let excelContent = data.map((obj: any, index: any) => {
    if (index === data.length - 1)
      return Object.values(obj).slice(0, -1);
    else
      return Object.values(obj);
  });

  excelContent = excelContent.map((e: any) => e.join(",")).join("\n");

  return excelContent;
}

export default csv;