// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import api from "../../../api";
// import csv from "../../../helpers/csv";
// import endpoints from "../../../config/apiEndpoints";
// const { MEDIA_UPLOAD } = endpoints;
// Chat operation and save into store
// const useCustomHookforAssment = () => {

  // const getData = async (type: string): Promise<any> => {
  //   const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  // };

  // const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
  //   const type = event?.target?.innerText;

  //   if (type === "csv" || type === "CSV")
  //     csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
  //   else
  //     pdf(`${fileName}`, header, data);
  // }

  // const pdf = (fileName: string, header: any, data: any) => {
  //   const title = fileName;
  //   const unit = 'pt';
  //   const size = 'A4';
  //   const orientation = 'landscape';
  //   const marginLeft = 40;

  //   const body = data.map(({ learningCategories, learningObjectives, evidenceOfProgress, content }: any) =>
  //     [learningCategories, learningObjectives, evidenceOfProgress, content]
  //   );

  //   const doc = new jsPDF(orientation, unit, size);
  //   doc.setFontSize(15);
  //   doc.text(title, marginLeft, 40);

  //   doc.autoTable({
  //     head: [header],
  //     body: body,
  //     margin: { top: 50 },
  //     headStyles: {
  //       fillColor: [230, 244, 249],
  //       textColor: [20, 20, 42],
  //       fontStyle: 'normal',
  //       fontSize: 12,
  //     },

  //     didParseCell: async (item: any) => {
  //       if (item.row.section === "head")
  //         item.cell.styles.fillColor = false;
  //       else
  //         item.cell.styles.fillColor = false;
  //     }
  //   });

  //   doc.save(`${fileName}.pdf`);
  // };

  
  

//   return {
//     // getData,
//     // downloadPdfOrCsv,
//   };
// };

// export default useCustomHookforAssment;