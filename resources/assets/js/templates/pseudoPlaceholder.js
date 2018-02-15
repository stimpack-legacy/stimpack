export default ``;


/*

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

// Use table name with trailing _id to reference another model
Rental
car_id
...

// To create a many to many relationship simply reference table1_table2
car_user

// Use $* to overide best guess

Marine
$table->integer('hp')->default(1337);

// Notes
id and timestamps are added by default
*/