import Create from "./Manipulators/Create";
import CreateDatabase from "./Manipulators/CreateDatabase"
import ThrowBackEndError from "./Manipulators/ThrowBackEndError"

const AllManipulators = {
    Create,
    CreateDatabase,
    ThrowBackEndError
};

export default AllManipulators;