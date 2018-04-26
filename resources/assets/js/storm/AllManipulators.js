import Create from "./Manipulators/Create";
import Load from "./Manipulators/Load";

import CreateDatabase from "./Manipulators/CreateDatabase"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"
import ReplaceInFile from "./Manipulators/ReplaceInFile"

const AllManipulators = {
    Create,
    Load,
    CreateDatabase,
    ReplaceInFile,
    ThrowBackEndError
};

export default AllManipulators;