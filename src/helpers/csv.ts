const csv = (fileName: string, header: any, data: any) => {
  const csvContent = csvData(header, data);

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

const csvData = (header: any, data: any) => {
  const newHeaders = header.filter((str: any) => str !== 'Avatar'); // Delete Avatar from header array

  let excelContent = data.map((obj: any, index: any) => {
    delete obj.avatar; // Delete Avatar from data array

    if (index === data.length - 1)
      return Object.values(obj).slice(0, -1);
    else
      return Object.values(obj);
  });

  const csvContent = [
    newHeaders.join(','),
    ...excelContent.map((row: any) => Object.values(row).join(',')),
  ].join('\n');

  return csvContent;
}

export default csv;