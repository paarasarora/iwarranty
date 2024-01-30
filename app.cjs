"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csvParser = require("csv-parser");
var commander_1 = require("commander");
// Create a new instance of Commander
var program = new commander_1.Command();
// Define command-line options
program
    .option('-p, --path <path>', 'Path to the spreadsheet file')
    .parse(process.argv);
// Get the provided file path from command-line arguments
var options = program.opts();
var spreadsheetPath = options.path;
if (!spreadsheetPath) {
    console.error('Error: Please provide the path to the spreadsheet file using the -p or --path option.');
    process.exit(1);
}
// Function to read and process the spreadsheet
var processSpreadsheet = function (filePath) {
    var results = [];
    // Read the CSV file using csv-parser
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', function (data) {
        // Process each row of the spreadsheet data
        var processedData = processRow(data);
        // Add processed data to results array
        results.push(processedData);
    })
        .on('end', function () {
        // Output the processed data as JSON lines
        results.forEach(function (result) {
            console.log(JSON.stringify(result));
        });
    });
};
// Function to process each row of the spreadsheet
var processRow = function (row) {
    // Assuming a simplified data structure for demonstration
    var processedData = {
        category: row['directory_category'],
        contact: {
            email: row['directory_contact__email'],
            mobile: row['directory_contact__mobile'],
            phone: row['directory_contact__phone'],
            website: row['directory_contact__website'],
        },
        location: {
            street: row['directory_location__street'],
            city: row['directory_location__city'],
            country: row['directory_location__country'],
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
// Call the function to process the spreadsheet with the provided file path
processSpreadsheet(spreadsheetPath);

// node app.cjs -p C:/Users/paara/Downloads/spreadsheet.csv