on('task', {
 
    async writeExcelTest({searchText,replaceText,change,filePath})
     {
         
       const workbook = new ExcelJs.Workbook();
       await workbook.xlsx.readFile(filePath);
       const worksheet = workbook.getWorksheet('Sheet1');
       const output= await readExcel(worksheet,searchText);
     
       const cell = worksheet.getCell(output.row,output.column+change.colChange);
       cell.value = replaceText;
       //pending resolved rejected
       return workbook.xlsx.writeFile(filePath).then(()=>
       {
         return true;
       })
       .catch((error)=>
         {
           return false;
         })
  
     
     }
  
   })
  
  
  
  
 async function readExcel(worksheet,searchText)
 {
     let output = {row:-1,column:-1};
     worksheet.eachRow((row,rowNumber) =>
     {
           row.eachCell((cell,colNumber) =>
           {
               if(cell.value === searchText)
               {
                   output.row=rowNumber;
                   output.column=colNumber;
               }
   
   
           }  )
     
     })
     return output;
 }
 