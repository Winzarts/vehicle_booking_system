<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$schema = DB::select("SHOW COLUMNS FROM pemesanan");
file_put_contents('schema_check.json', json_encode($schema, JSON_PRETTY_PRINT));
echo "Schema written to schema_check.json" . PHP_EOL;

$statusCol = DB::select("SHOW COLUMNS FROM pemesanan WHERE Field = 'status'")[0];
echo "Status Type: " . $statusCol->Type . PHP_EOL;
echo "Status Default: " . $statusCol->Default . PHP_EOL;
