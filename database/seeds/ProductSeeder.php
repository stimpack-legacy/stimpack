<?php

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            [
                'name' => 'y6lfpj',
                'description' => 'wi2ra9',
                'price' => 'rg3w4f',
            ],
        ]);
    }
}