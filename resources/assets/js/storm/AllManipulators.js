import Create from "./Manipulators/Create";
import Load from "./Manipulators/Load";

import CreateFile from "./Manipulators/CreateFile"
import CreateDatabase from "./Manipulators/CreateDatabase"
import DeleteFile from "./Manipulators/DeleteFile"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"
import ReplaceInFile from "./Manipulators/ReplaceInFile"

const AllManipulators = {
    // Starters
    Create,
    Load,

    // Manipulators
    CreateFile,
    CreateDatabase,
    DeleteFile,
    ReplaceInFile,
    ThrowBackEndError
};

export default AllManipulators;