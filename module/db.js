// const mysql = require('mysql');
//
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'momenteken',
//     port: 3306
// });
//
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//     } else {
//         console.log('Connected to database!');
//     }
// });

const fs = require('fs');
const mysql = require('mysql');

// Create a connection to the database
const db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'try'
});

// Connect to the database
db_connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }

    console.log('Connected to the database');

    // Check if the table exists
    const tableCheckQuery = `SELECT COUNT(*) AS tableCount FROM information_schema.tables WHERE table_schema = '${db_connection.config.database}' AND table_name = 'your_table_name'`;

    db_connection.query(tableCheckQuery, (error, results) => {
        if (error) {
            console.error('Error executing table check query:', error);
            db_connection.end(); // Close the database connection
            return;
        }

        const tableCount = results[0].tableCount;

        if (tableCount === 0) {
            // Table doesn't exist, read the SQL file
            const sqlFilePath = './momenteken.sql';
            fs.readFile(sqlFilePath, 'utf8', (error, sqlContent) => {
                if (error) {
                    console.error('Error reading SQL file:', error);
                    db_connection.end(); // Close the database connection
                    return;
                }

                // Split the SQL content into individual statements
                const sqlStatements = sqlContent.split(';');

                // Execute each SQL statement
                sqlStatements.forEach((statement) => {
                    db_connection.query(statement, (error) => {
                        if (error) {
                            console.error('Error executing SQL statement:', error);
                        }
                    });
                });

                console.log('Table created successfully');
                db_connection.end(); // Close the database connection
            });
        } else {
            console.log('Table already exists');
            db_connection.end(); // Close the database connection
        }
    });
});


module.exports = db_connection;
