import Create from "./Manipulators/Create";
import Load from "./Manipulators/Load";

import CreateFile from "./Manipulators/CreateFile"
import CreateDatabase from "./Manipulators/CreateDatabase"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"
import ReplaceInFile from "./Manipulators/ReplaceInFile"

const AllManipulators = {
    // Starters
    Create,
    Load,

    // Manipulators
    CreateFile,
    CreateDatabase,
    ReplaceInFile,
    ThrowBackEndError
};

export default AllManipulators;