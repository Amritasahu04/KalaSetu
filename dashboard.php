<?php
// Database connection parameters (placeholders)
$host = 'localhost';
$dbname = 'YOUR_DB';
$user = 'YOUR_USER';
$password = 'YOUR_PASS';

// Connect to PostgreSQL database
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

// Function to display table data
function displayTable($conn, $tableName) {
    $query = "SELECT * FROM $tableName";
    $result = pg_query($conn, $query);

    if (!$result) {
        echo "<h3>Error fetching data from $tableName: " . pg_last_error($conn) . "</h3>";
        return;
    }

    echo "<h3>$tableName</h3>";
    echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    echo "<tr>";

    // Get column names
    $numFields = pg_num_fields($result);
    for ($i = 0; $i < $numFields; $i++) {
        echo "<th>" . pg_field_name($result, $i) . "</th>";
    }
    echo "</tr>";

    // Fetch and display rows
    while ($row = pg_fetch_assoc($result)) {
        echo "<tr>";
        foreach ($row as $value) {
            echo "<td>" . htmlspecialchars($value) . "</td>";
        }
        echo "</tr>";
    }

    echo "</table><br>";
    pg_free_result($result);
}

// Display data from artisan_posts table
displayTable($conn, 'artisan_posts');

// Close the connection
pg_close($conn);
?>
