import Create from "./Manipulators/Create";
import Load from "./Manipulators/Load";

import CreateFile from "./Manipulators/CreateFile"
import CreateDatabase from "./Manipulators/CreateDatabase"
import DeleteFile from "./Manipulators/DeleteFile"
import ReplaceInFile from "./Manipulators/ReplaceInFile"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"
// Add your import here

const AllManipulators = {
    // Starters
    Create,
    Load,

    // Manipulators
    CreateFile,
    CreateDatabase,
    DeleteFile,
    ReplaceInFile,
    ThrowBackEndError,
    // Add your manipulator here
};

export default AllManipulators;