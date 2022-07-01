import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompteComponent } from './compte/compte.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistreComponent } from './registre/registre.component';


const routes: Routes = [

  {path: 'file-upload', component: FileUploadComponent},
  {path: 'compte', component: CompteComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'log', component: LogComponent},
  {path: 'registre', component: RegistreComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: '/home'},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
