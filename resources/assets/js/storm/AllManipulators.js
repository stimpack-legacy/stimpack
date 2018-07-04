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
import GitInit from "./Manipulators/GitInit"
import CreateGithubRepo from "./Manipulators/CreateGithubRepo"
import AddDNS from "./Manipulators/AddDNS"
import CreateSiteOnForge from "./Manipulators/CreateSiteOnForge"
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
    GitInit,
    CreateGithubRepo,
    AddDNS,
    CreateSiteOnForge,
    // Add your manipulator here
};

export default AllManipulators;