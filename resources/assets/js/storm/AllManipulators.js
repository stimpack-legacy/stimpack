import Create from "./Manipulators/Create";
import CreateDatabase from "./Manipulators/CreateDatabase"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"
import ReplaceInFile from "./Manipulators/ReplaceInFile"

const AllManipulators = {
    Create,
    CreateDatabase,
    ReplaceInFile,
    ThrowBackEndError
};

export default AllManipulators;