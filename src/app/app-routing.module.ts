import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareComponent } from './components/share/share.component';

const routes: Routes = [
  { path: "", component: ShareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
