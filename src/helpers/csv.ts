const csv = (fileName: string, header: any, data: any, hasAvatar: boolean = false) => {
  const csvContent = csvData(header, data, hasAvatar);

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

const csvData = (header: any, data: any, hasAvatar: boolean = false) => {
  let newHeaders = header;
  let csvContent = data;

  if (hasAvatar) {
    newHeaders = header.filter((str: any) => str !== 'Avatar'); // Delete Avatar from header array

    csvContent = data.map((obj: any, index: any) => {
      delete obj.avatar; // Delete Avatar from data array
      return Object.values(obj);
    });
  } else {
    csvContent = data.map((obj: any, index: any) => {
      return Object.values(obj);
    });
  }
  
  const csv = [
    newHeaders.join(','),
    ...csvContent.map((row: any) => Object.values(row).join(',')),
  ].join('\n');

  return csv;
}

export default csv;