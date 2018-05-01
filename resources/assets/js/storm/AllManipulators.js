import SetGlobalParameters from "./Manipulators/SetGlobalParameters"

import Create from "./Manipulators/Create";
import Load from "./Manipulators/Load";

import CreateFile from "./Manipulators/CreateFile"
import CreateDatabase from "./Manipulators/CreateDatabase"
import DeleteFile from "./Manipulators/DeleteFile"
import ReplaceInFile from "./Manipulators/ReplaceInFile"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"


const AllManipulators = {
    // Starters
    Create,
    Load,

    // Manipulators
    CreateFile,
    CreateDatabase,
    DeleteFile,
    ReplaceInFile,
    SetGlobalParameters,
    ThrowBackEndError
};

export default AllManipulators;