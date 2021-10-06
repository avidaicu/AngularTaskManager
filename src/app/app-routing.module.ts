import { CanActivateGuardService } from './can-activate-guard.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { AboutComponent } from "./admin/about/about.component";
import { ProjectsComponent } from "./admin/projects/projects.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "about", component: AboutComponent },
  { path: "projects", component: ProjectsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule
{
}
