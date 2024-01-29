import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
   {
    path: '',
       canActivate: [HomeGuard],
     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
      canActivate: [HomeGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'create',
  //   pathMatch: 'full'
  // },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'slider',
     canActivate: [AuthGuard],
    loadChildren: () => import('./slider/slider.module').then( m => m.SliderPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'shelf',
    loadChildren: () => import('./library/shelf/shelf.module').then( m => m.ShelfPageModule)
  },
  {
    path: 'book/:id',
    loadChildren: () => import('./library/book/book.module').then( m => m.BookPageModule)
  },
  {
    path: 'reader/:id',
    loadChildren: () => import('./library/reader/reader.module').then( m => m.ReaderPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./library/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'congrats/:id',
    loadChildren: () => import('./library/congrats/congrats.module').then( m => m.CongratsPageModule)
  },
  {
    path: 'score/:id',
    loadChildren: () => import('./library/score/score.module').then( m => m.ScorePageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./cbt/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'cbt/:id',
    loadChildren: () => import('./cbt/cbt/cbt.module').then( m => m.CbtPageModule)
  },
  {
    path: 'cbt-result',
    loadChildren: () => import('./cbt/cbt-result/cbt-result.module').then( m => m.CbtResultPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./analytics/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'cbt-review',
    loadChildren: () => import('./cbt/cbt-review/cbt-review.module').then( m => m.CbtReviewPageModule)
  },
  {
    path: 'first',
    loadChildren: () => import('./cbt/first/first.module').then( m => m.FirstPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chats/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'weekly',
    loadChildren: () => import('./analytics/weekly/weekly.module').then( m => m.WeeklyPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'break/:id',
    loadChildren: () => import('./analytics/break/break.module').then( m => m.BreakPageModule)
  },
  {
    path: 'leader',
    loadChildren: () => import('./analytics/leader/leader.module').then( m => m.LeaderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
