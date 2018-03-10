<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'ydkkcd',
                'email' => 'rfwqop',
                'password' => 'iaiym',
                'remember_token' => 'fkync9',
                'product_id' => 1,
            ],
        ]);
    }
}