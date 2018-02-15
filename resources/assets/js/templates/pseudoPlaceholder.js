export default
`/*

// Use uppercase for Model
Car
model
color
...

// Use Lower case for table only
statistics
type
value
...

// Use trailing _id for one to many
Rental
car_id
...

// use table1_table2 for many to many
car_user

// Use $* to overide best guess
Marine
$table->integer('hp')->default(1337);

// Notes
id and timestamps are added by default

*/
`;