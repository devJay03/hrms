<?php
namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name'     => 'HM Admin',
            'email'    => 'admin@gmail.com',
            'password' => 'admin123',
            'role'     => 0,
        ]);

        Amenity::create([
            'name'        => 'Buffet Breakfast',
            'description' => 'Eat As many as you want breakfast',
        ]);
    }
}
