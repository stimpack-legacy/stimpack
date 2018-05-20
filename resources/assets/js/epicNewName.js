const adjectives = [
    "cool",
    "fresh",
    "smelly",
    "oily",
    "old",
    "legacy",
    "slutty",
    "shiny",
    "greasy",
    "floppy",
    "hard",
    "stinky",
    "nasty"
]

const substantive = [
    "slutty-male",
    "secritary",
    "cats",
    "dogs",
    "editors",
    "unicorns",
    "mac",
    "ubuntu",
    "my-little-pony",
    "ducktales",
    "AI",
    "terminator",
    "machine",
    "skynet",
    "singularity",
    "bitcoin"
]

const secondSubstantive = [
    "app",
    "blog",
    "store",
    "website",
    "shop",
    "album",
    "pictures",
    "gallery",
    "enterprise",
    "resturant",
    "education",
    "school",
    "university",
    "nation"
]


export const epicNewName = () => {
    return [
        adjectives[Math.floor(Math.random()*adjectives.length)],
        substantive[Math.floor(Math.random()*substantive.length)],
        secondSubstantive[Math.floor(Math.random()*secondSubstantive.length)]
    ].join("-");
};