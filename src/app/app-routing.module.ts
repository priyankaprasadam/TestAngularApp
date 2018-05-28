// <copyright file="AppRoutingModule" company="Baker Hughes">
// All Rights Reserved. Copyright © Baker Hughes 2017-2018
// This computer program may not be used, copied, distributed, corrected, modified,
// translated, transmitted or assigned without Baker Hughes's prior written authorization
// </copyright>
// <summary>
// The <see cref="AppRoutingModule"/> class file.
// </summary>
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { CreateNewPostComponent } from './Components/CreateComponent/create.component';
import { ListComponent } from './Components/ListComponent/list.component';

const routes: Routes =
  [{ path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: CreateNewPostComponent },
  { path: 'list', component: ListComponent }
  ];

@NgModule
  ({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
export class AppRoutingModule {
}
