import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'login', 
        component : LoginComponent
    },
    {
        path :'',
        redirectTo : 'login',
        pathMatch :'full'
    },
    {
        path : '', 
        component : LayoutComponent,
        children : [
            {
                path: 'dashboard', 
                component : DashboardComponent
            }
        ]
    },{
        path: '**', 
        component : LoginComponent
    }
    
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent}
];
