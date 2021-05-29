import Vue from 'vue';
import store from './store/store.js'
import Router from 'vue-router';
import AddCostumer from './components/costumer/AddCostumer.vue';
import ViewCostumer from './components/costumer/ViewCostumer.vue';
import EditCostumer from './components/costumer/EditCostumer.vue';
import AddEmployee from './components/employee/AddEmployee.vue';
import EditEmployee from './components/employee/EditEmployee.vue';
import ViewEmployee from './components/employee/ViewEmployee.vue';
import ActivateAccount from './components/employee/ActivateAccount.vue';
import DeactivateAccount from './components/employee/DeactivateAccount.vue';
import ResetAccount from './components/employee/ResetAccount.vue';
import ActivateCustomer from './components/costumer/ActivateCustomer.vue';
import DeactivateCustomer from './components/costumer/DeactivateCustomer.vue';
import ResetCustomer from './components/costumer/ResetCustomer.vue'

import AddBus from './components/bus/AddBus.vue';
import ViewBus from './components/bus/ViewBus.vue';
import EditBus from './components/bus/EditBus.vue';
import ActivateBus from './components/bus/ActivateBus.vue';
import DeactivateBus from './components/bus/DeactivateBus.vue';
import AddRoute from './components/route/AddRoute.vue';
import ViewRoute from './components/route/ViewRoute.vue';
import ActivateRoute from './components/route/ActivateRoute';
import DeactivateRoute from './components/route/DeactivateRoute.vue';
import EditRoute from './components/route/EditRoute.vue';
import AddOrganization from './components/SuperAdmin/organization/AddOrganization.vue';
import EditOrganization from './components/SuperAdmin/organization/EditOrganization.vue';
import ViewOrganization from './components/SuperAdmin/organization/ViewOrganization.vue';
import DeactivateOrganization from './components/SuperAdmin/organization/DeactivateOrganization.vue';
import ActivateOrganization from './components/SuperAdmin/organization/ActivateOrganization.vue';
import AddBranch from './components/SuperAdmin/branch/AddBranch.vue';
import EditBranch from './components/SuperAdmin/branch/EditBranch.vue';
import ViewBranch from './components/SuperAdmin/branch/ViewBranch.vue';
import ActivateBranch from './components/SuperAdmin/branch/ActivateBranch.vue';
import DeactivateBranch from './components/SuperAdmin/branch/DeactivateBranch.vue';
import SetFareAmount from './components/fare/SetFareAmount.vue';
import UpdateFareAmount from './components/fare/UpdateFareAmount.vue';
import ViewFare from './components/fare/ViewFare.vue';
import fuck from './components/role/fuck.vue';

import AdminOfServiceProvider from './components/AdminOfServiceProvider.vue';
import SuperAdmin from './components/SuperAdmin.vue';
import BranchAdminOfPlatformProvider from './components/BranchAdminOfPlatformProvider.vue';
import EmployeeOfPlatformProvider from './components/EmployeeOfPlatformProvider.vue';
import AACTAAdmin from './components/AACTAAdmin.vue';
import Login from './components/Login.vue';
import HomePage from './components/HomePage.vue';
import ReportButton from './components/ReportButton'
import Report from './components/Report'
import AddStation from './components/station/AddStation'
import EditStation from './components/station/EditStation'
import ViewStation from './components/station/ViewStation'
import ActivateStation from './components/station/ActivateStation'
import DeactivateStation from './components/station/DeactivateStation'
import ViewMachine from './components/machine/ViewMachine'
import EditMachine from './components/machine/EditMachine'
import AddMachine from './components/machine/AddMachine'
import ActivateMachine from './components/machine/ActivateMachine'
import DeactivateMachine from './components/machine/DeactivateMachine'
import AddRole from './components/role/AddRole'
import ViewRole from './components/role/ViewRole'
import EditRole from './components/role/EditRole'
import ActivateRole from './components/role/ActivateRole'
import DeactivateRole from './components/role/DeactivateRole'
import DashBoard from './components/DashBoard.vue'
// import Hello from  './components/Hello.vue';
import Change from './components/Change.vue'
import Header from './Header.vue'
import View from './components/employee/View'
import Notification from './components/chart2/Chatshit.vue';

Vue.use(Router)
//export default new Router({
let router = new Router({
   mode: 'history',
   routes: [

      // export const routes= [

      {
         path: '/', name: 'header',
         component: Header
      },
      {
         path: '/Login', name: 'login',
         component: Login
      },

      //{
      //    path: '/BranchAdminOfPlatformProvider',
      //    name: 'BranchAdminOfPlatformProvider',
      //    component: BranchAdminOfPlatformProvider,
      //    children: [
      //       {
      //          path: 'AddCostumer',
      //          name: 'AddCostumer',
      //          component: AddCostumer
      //       },
      //       {
      //          path: 'EditCostumer',
      //          name: 'EditCostumer',
      //          component: EditCostumer,
      //       },
      //       {
      //          path: 'ViewCostumer',
      //          name: 'ViewCostumer',
      //          component: ViewCostumer
      //       },
      //       {
      //          path: 'baViewEmployee',
      //          component: ViewEmployee
      //       },
      //       {
      //          path: 'baAddEmployee',
      //          component: AddEmployee
      //       },
      //       {
      //          path: 'baEditEmployee',
      //          component: EditEmployee
      //       },
      //    ]
      // },

      // {
      //    path: '/EmployeeOfPlatformProvider',
      //    name: 'EmployeeOfPlatformProvider',
      //    component: EmployeeOfPlatformProvider,
      //    meta: { requireAuth: true },
      //    children: [
      //       { path: 'EAddCostumer', component: AddCostumer },
      //       { path: 'EEditCostumer', name: 'editCostumer', component: EditCostumer },
      //       { path: 'EViewCostumer', component: ViewCostumer },
      //       { path: 'ActivateCustomer', component: ActivateCustomer },
      //       { path: 'DeactivateCustomer', component: DeactivateCustomer },
      //       { path: 'ResetCustomer', component: ResetCustomer },
      //    ]
      // },
      // {
      //    path: '/AACTAAdmin',
      //    name: 'AACTAAdmin',
      //    component: AACTAAdmin,
      //    children: [
      //       { path: 'SetFareAmount', name: 'SetFareAmount', component: SetFareAmount },
      //       { path: 'UpdateFareAmount', name: 'UpdateFareAmount', component: UpdateFareAmount },
      //       { path: 'ViewFare', name: 'ViewFare', component: ViewFare },
      //    ]
      // },

      // {
      //    path: '/AdminOfServiceProvider',
      //    name: 'AdminOfServiceProvider',
      //    component: AdminOfServiceProvider,
      //    meta: { requireAuth: true },
      //    children: [
      //       { path: 'AddEmployee', component: AddEmployee },
      //       { path: 'ViewEmployee', component: ViewEmployee },
      //       { path: 'EditEmployee', component: EditEmployee },
      //       { path: 'AddBus', component: AddBus },
      //       { path: 'ViewBus', component: ViewBus },
      //       { path: 'EditBus', name: 'editBus', component: EditBus },
      //       { path: 'ActivateBus', component: ActivateBus },
      //       { path: 'DeactivateBus', component: DeactivateBus },
      //       { path: 'AddRoute', component: AddRoute },
      //       { path: 'ViewRoute', component: ViewRoute },
      //       { path: 'EditRoute', component: EditRoute },
      //    ]
      // },

      {
         path: '/SuperAdmin',
         name: 'superAdmin',
         component: SuperAdmin,
         beforeEnter(to, from, next) {
            if (store.state.token) {
               next()
            }
            else {
               next('/login')
            }
         },

         children: [
            { path: 'notify', name: 'notification', component: Notification },
            { path: 'SetFareAmount', name: 'SetFareAmount', component: SetFareAmount },
            { path: 'UpdateFareAmount', name: 'UpdateFareAmount', component: UpdateFareAmount },
            { path: 'ViewFare', name: 'ViewFare', component: ViewFare },
            { path: 'EditOrganization', name: 'editOrganization', component: EditOrganization },
            { path: 'AddOrganization', component: AddOrganization },
            { path: 'ViewOrganization', component: ViewOrganization },
            { path: 'ViewBranch', component: ViewBranch },
            { path: 'AddBranch', component: AddBranch },
            { path: 'EditBranch', name: 'EditBranch', component: EditBranch },
            { path: 'AddAdmin', component: AddEmployee },
            { path: 'ViewAdmin', component: ViewEmployee },
            // { path: 'EditServiceProviderAdmin', component: EditEmployee},

            { path: 'EditAdmin', name: 'edit', component: EditEmployee },
            { path: 'ReportButton', component: ReportButton },
            { path: 'ReportButton', component: Report },
            { path: 'AddRoute', component: AddRoute },
            { path: 'ViewRoute', component: ViewRoute },
            { path: 'EditRoute', name: 'editRoute', component: EditRoute },
            { path: 'EditStation', name: 'editStation', component: EditStation },
            { path: 'AddStation', component: AddStation },
            { path: 'ViewStation', component: ViewStation },
            { path: 'ViewMachine', component: ViewMachine },
            { path: 'EditMachine', name: 'editMachine', component: EditMachine },
            { path: 'AddMachine', component: AddMachine },
            { path: 'EAddCostumer', component: AddCostumer },
            { path: 'EEditCostumer/:cname', name: 'editCostumer', component: EditCostumer },
            { path: 'EViewCostumer', component: ViewCostumer },
            { path: 'AddRole', component: AddRole },
            { path: 'ViewRole', component: ViewRole },
            { path: 'EditRole', component: EditRole },
            { path: 'ActivateRole', component: ActivateRole },
            { path: 'DeactivateRole', component: DeactivateRole },


            { path: 'ActivateAccount', component: ActivateAccount },
            { path: 'DeactivateAccount', component: DeactivateAccount },
            { path: 'ResetAccount', component: ResetAccount },
            { path: 'ActivateOrganization', component: ActivateOrganization },
            { path: 'DeactivateOrganization', component: DeactivateOrganization },
            { path: 'ActivateBranch', component: ActivateBranch },
            { path: 'DeactivateBranch', component: DeactivateBranch },

            { path: 'ActivateRoute', component: ActivateRoute },
            { path: 'DeactivateRoute', component: DeactivateRoute },
            { path: 'ActivateStation', component: ActivateStation },
            { path: 'DeactivateStation', component: DeactivateStation },
            { path: 'ActivateMachine', component: ActivateMachine },
            { path: 'DeactivateMachine', component: DeactivateMachine },
            {
               path: 'HomePage', name: 'homePage', component: HomePage
            },
            { path: 'DashBoard', name: 'dashBoard', component: DashBoard },
            {
               path: '/Change', name: 'Change',
               component: Change
            },
            {
               path: 'View', name: 'view', component: View
            },
            { path: 'AddBus', component: AddBus },
            { path: 'ViewBus', component: ViewBus },
            { path: 'EditBus', name: 'editBus', component: EditBus },
            {
               path: 'AddCostumer',
               name: 'AddCostumer',
               component: AddCostumer
            },
            {
               path: 'ViewCostumer',
               name: 'ViewCostumer',
               component: ViewCostumer
            },
            {
               path: 'fuck',
               name: 'fuck',
               component: fuck
            },




            // { path: 'ActivateCustomer', component: ActivateCustomer },
            // { path: 'DeactivateCustomer', component: DeactivateCustomer },
            // { path: 'ResetCustomer', component: ResetCustomer },
            // {
            //    path: 'AddCostumer',
            //    name: 'AddCostumer',
            //    component: AddCostumer
            // },
            // {
            //    path: 'EditCostumer',
            //    name: 'EditCostumer',
            //    component: EditCostumer,
            // },
            // {
            //    path: 'ViewCostumer',
            //    name: 'ViewCostumer',
            //    component: ViewCostumer
            // },



         ]
      }

   ]
})
// router.beforeEach((to, from, next) => {
//    if (to.matched.some(record => record.meta.requiresAuth)) {

//      if (store.getters.isLoggedIn) {     

//        return
//      }
//      next('/homepage')
//    } else {
//      next()
//    }
//   next()
//  })

// router.beforeEach((to, from, next) => {
//    if(to.matched.some(record => record.meta.requiresAuth)) {
//        if (localStorage.getItem('jwt') == null) {
//            next({
//                path: '/login',
//                params: { nextUrl: to.fullPath }
//            })
//        } else {
//            let user = JSON.parse(localStorage.getItem('user'))
//            if(to.matched.some(record => record.meta.is_admin)) {
//                if(user.username == 'SuperAdmin'){
//                    next()
//                }
//                else{
//                    next({ name: 'homePage'})
//                }
//            }else {
//                next()
//            }
//        }
//    } else if(to.matched.some(record => record.meta.guest)) {
//        if(localStorage.getItem('jwt') == null){
//            next()
//        }
//        else{
//            next({ name: 'homePage'})
//        }
//    }else {
//        next()
//    }
// })



export default router

