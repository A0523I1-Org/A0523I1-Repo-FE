
import CreateContract from "../components/contract/CreateContract";
import EditContract from "../components/contract/EditContract";
import ListContract from "../components/contract/ListContract";
import PopupDelete from "../components/contract/PopupDelete";
import CreateCustomer from "../components/customer/CreateCustomer";
import EditCustomer from "../components/customer/EditCustomer";
import ListCustomer from "../components/customer/ListCustomer";
import CreateEmployee from "../components/employee/CreateEmployee";
import EditEmployee from "../components/employee/EditEmployee";
import ListEmployee from "../components/employee/ListEmployee";
import Home from "../pages/Home";
import CreateLangding from "../components/landing/CreateLanding";
import EditLanding from "../components/landing/EditLanding";
import ListLanding from "../components/landing/ListLanding";
import Login from "../components/auth/Login";
import Register from "../components/employee/child_list/Register";
import routes from "../configs/routes";
import DeleteEmployee from "../components/employee/DeleteEmployee";
// import Register from "../components/employee/Register";

import PersonalInformation from "../components/employee/PersonalInformation";
import UnauthorizedPage from "../components/auth/Unauthorize";

const publicRoutes = [
    {path : routes.login ,component : Home},
    {path : routes.home ,component : Home},
]

const privateRoutes = [

    {path: routes.unAuthorized, component: UnauthorizedPage},
    {path : routes.listContract, component : ListContract},
    {path : routes.createContract, component : CreateContract},
    {path : routes.editContract, component : EditContract , id : ':id'},
    {path : routes.deleteContract, component : PopupDelete, id: ':id'},

    {path : routes.listCustomer, component : ListCustomer},
    {path : routes.createCustomer, component : CreateCustomer},
    {path : routes.editCustomer, component : EditCustomer , id : ':id' },

    {path : routes.listEmployee, component : ListEmployee},
    {path : routes.createEmployee, component : CreateEmployee},
    {path : routes.deleteEmployee, component : DeleteEmployee, id: ':id'},
    {path : routes.editEmployee, component : EditEmployee , id : ':id'},
    {path : routes.deleteEmployee, component : DeleteEmployee , id : ':id'},
    {path : routes.register,component : Register , id : ':id'},
    {path : routes.personalInformation,component : PersonalInformation, token : ':token'},

    {path : routes.listLanding, component : ListLanding},
    {path : routes.createLanding, component : CreateLangding},
    {path : routes.editLanding, component : EditLanding , id : ':id'},

];

export {publicRoutes,privateRoutes};