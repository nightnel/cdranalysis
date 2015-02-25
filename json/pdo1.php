<?php
ini_set('display_errors', 1);
header('Content-Type: application/json');


// Connection string
$hostname = "localhost";
$dbname = "CDR1";
$username = "root";
$password = "summer";

$select = "select date(DATA) as DATA, CZAS, NRFIZYCZNYA, NRFIZYCZNYB, NRKATALOGOWYA, NRWIRTUALNYA, INFWYBIERCZA, CZASTRWANIA, CZASZESTAWIANIA, IMPULSY, concat(\"m\", MODUL) as MODUL, TYP, PODTYP from trf2_12_2014 where ((MODUL = \"2\") OR (MODUL = \"4\") OR (MODUL = \"7\") OR (MODUL = \"8\") OR (MODUL = \"21\") OR (MODUL = \"3\") OR (MODUL = \"5\")) order by date(DATA) desc, CZAS desc limit 100";

// Setting mysql connection
$db = new PDO('mysql:host=localhost;dbname=CDR1;charset=utf8', $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);


// Execute query
try {
    //$stmt = $db->query('select date(DATA) as DATA, CZAS, NRFIZYCZNYA, NRFIZYCZNYB, NRKATALOGOWYA, NRWIRTUALNYA, INFWYBIERCZA, CZASTRWANIA, CZASZESTAWIANIA, IMPULSY, concat("m", MODUL) as MODUL, TYP, PODTYP from trf2_12_2014 order by date(DATA) desc, CZAS desc limit 200'); //invalid query!
    $stmt = $db->query($select);
} catch(PDOException $ex) {
    echo "An Error occured!";
    echo($ex->getMessage());
}

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

//print_r($results);
//var_dump($results);

$json = json_encode($results);

echo "$json";
echo "$select";

