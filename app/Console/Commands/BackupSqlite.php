<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class BackupSqlite extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:sqlite';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copia la base de datos SQLite a la carpeta de backups';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dbPath = database_path('database.sqlite');
        $backupPath = storage_path('backups/sqlite_backup_' . now()->format('Y-m-d_His') . '.sqlite');

        if (!File::exists($dbPath)) {
            $this->error("No se encontró el archivo de base de datos.");
            return 1;
        }

        File::ensureDirectoryExists(dirname($backupPath));
        File::copy($dbPath, $backupPath);

        $this->info("Backup creado exitosamente en: $backupPath");
        return 0;
    }
}
