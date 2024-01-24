import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';

// Function to read and process the spreadsheet
const processSpreadsheet = (filePath: string) => {
  const results: any[] = [];

  // Read the CSV file using csv-parser
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data: any) => {
      // Process each row of the spreadsheet data
      const processedData = processRow(data);

      // Add processed data to results array
      results.push(processedData);
    })
    .on('end', () => {
      // Output the processed data as JSON lines
      results.forEach((result) => {
        console.log(JSON.stringify(result));
      });
    });
};

// Function to process each row of the spreadsheet
const processRow = (row: any) => {
  // Assuming a simplified data structure for demonstration
  const processedData = {
    category: row['directory_category'],
    contact: {
      email: row['directory_contact__email'],
      fax: row['directory_contact__fax'],
      mobile: row['directory_contact__mobile'],
      phone: row['directory_contact__phone'],
      website: row['directory_contact__website'],
    },
    location: {
      street: row['directory_location__street'],
      city: row['directory_location__city'],
      country: row['directory_location__country'],
      address: row['directory_location__address'],
      lat: parseFloat(row['directory_location__lat']),
      lng: parseFloat(row['directory_location__lng']),
      zip: row['directory_location__zip'],
      state: row['directory_location__state'],
    },
    social: {
      facebook: row['directory_social__facebook'],
      googleplus: row['directory_social__googleplus'],
      twitter: row['directory_social__twitter'],
    },
    status: row['content_post_status'],
    title: row['content_post_title'],
  };

  return processedData;
};


const spreadsheetPath = path.join('C:/Users/paara/Downloads/spreadsheet.csv');

processSpreadsheet(spreadsheetPath);
