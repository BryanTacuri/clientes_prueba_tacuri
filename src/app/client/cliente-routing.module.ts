import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientComponent } from './pages/HomeClient/HomeClient.component';
import { ListClientComponent } from './pages/list-client/list-client.component';

const routes: Routes = [
  {
    path: '',
    component: HomeClientComponent,
    children: [
      { path: 'add', component: ListClientComponent },
      { path: 'list', component: ListClientComponent },
      {
        path: 'edit/:id',
        component: ListClientComponent,
      },

      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
