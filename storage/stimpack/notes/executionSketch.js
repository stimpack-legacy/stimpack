starters = nodes.where('name', 'in', ['Create','Load'])
for starters as starter:
    if(!process(starter))
        return results;




function process(node) {
    console.log("Processing " + node.id);
    if(!processSuccessful)
        return false
    
    for node.links() as link:
        process(link.endpoint.node)    
}









Example diagram:
x x (Load and clear)

x x x x (Create, env, database etc)
  x x x (Branch to create some files)

Case All fine:
starters = [Load, Create]
Load // proccessing #1
    clear // processing #2
Create
    env
        database
            etc
    create
        some
            files

Case Something broken:
starters = [Load, Create]
Load // proccessing #1
    clear // processing #2
Create
    env
        database !!!BANG SOMETHING BREAKS!!!
            (env)
    create
        some
            files


Arrayifying the diagram:
[
    [
        Load,
        Clear
    ],
    [
        Create,
        some,
        files
    ]
]

CLI requires: Array or serialized diagram
GUI requires: Array or serialized diagram

serialized diagram -> Array
Array !-> serialized diagram

Array is used for processing!

What is a pack?

Limitations? Prevent scope creeping!