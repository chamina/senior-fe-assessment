import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { TaskpageComponent } from './taskpage/taskpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/images', pathMatch: 'full' },
  {
    path: 'images',
    component: ImageGridComponent,
  },
  {
    path: 'tasks',
    component: TaskpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
