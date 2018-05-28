import Create from "./Manipulators/Create";
import Load from "./Manipulators/Load";

import CreateDatabase from "./Manipulators/CreateDatabase"
import CreateFile from "./Manipulators/CreateFile"
import DeleteFile from "./Manipulators/DeleteFile"
import MigrateDatabase from "./Manipulators/MigrateDatabase"
import ReplaceInFile from "./Manipulators/ReplaceInFile"
import ScaffoldLaravel from "./Manipulators/ScaffoldLaravel"
import SeedDatabase from "./Manipulators/SeedDatabase"
import SetEnv from "./Manipulators/SetEnv"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"
// Add your import here

const AllManipulators = {
    // Starters
    Create,
    Load,

    // Manipulators
    CreateDatabase,
    CreateFile,
    MigrateDatabase,
    DeleteFile,
    ReplaceInFile,
    ScaffoldLaravel,
    SeedDatabase,
    SetEnv,
    ThrowBackEndError,
    // Add your manipulator here
};

export default AllManipulators;