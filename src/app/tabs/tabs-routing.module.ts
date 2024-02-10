import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'shelf',
        loadChildren: () => import('../library/shelf/shelf.module').then(m => m.ShelfPageModule)
      },
      {
        path: 'start/:id',
        loadChildren: () => import('../cbt/start/start.module').then(m => m.StartPageModule)
      },

      {
        path: 'first',
        loadChildren: () => import('../cbt/first/first.module').then(m => m.FirstPageModule)
      },

      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },

      {
        path: 'chat',
        loadChildren: () => import('../chats/chat/chat.module').then(m => m.ChatPageModule)
      },

      {
        path: 'dashboard',
        loadChildren: () => import('../analytics/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },

      {
        path: 'leader',
        loadChildren: () => import('../analytics/leader/leader.module').then(m => m.LeaderPageModule)
      },
      {
        path: 'weekly',
        loadChildren: () => import('../analytics/weekly/weekly.module').then(m => m.WeeklyPageModule)
      },

      {
        path: 'book/:id',
        loadChildren: () => import('../library/book/book.module').then(m => m.BookPageModule)
      },
      {
          path: 'break/:id',
          loadChildren: () => import('../analytics/break/break.module').then( m => m.BreakPageModule)
        },
      {
        path: 'reader/:id',
        loadChildren: () => import('../library/reader/reader.module').then(m => m.ReaderPageModule)
      },


      {
        path: 'test/:id',
        loadChildren: () => import('../library/test/test.module').then(m => m.TestPageModule)
      },


      {
        path: 'cbt/:id',
        loadChildren: () => import('../cbt/cbt/cbt.module').then(m => m.CbtPageModule)
      },

      {
        path: 'cbt-report/:id',
        loadChildren: () => import('../cbt/cbt-result/cbt-result.module').then(m => m.CbtResultPageModule)
      },

      {
        path: 'cbt-review/:id',
        loadChildren: () => import('../cbt/cbt-review/cbt-review.module').then(m => m.CbtReviewPageModule)
      },


      {
        path: 'congrats/:id',
        loadChildren: () => import('../library/congrats/congrats.module').then(m => m.CongratsPageModule)
      },

       {
        path: 'subscription',
        loadChildren: () => import('../subscription/subscription.module').then( m => m.SubscriptionPageModule)
      },

      {
        path: 'score/:id',
        loadChildren: () => import('../library/score/score.module').then(m => m.ScorePageModule)
      },
       {
          path: 'profile-edit',
          loadChildren: () => import('../profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
      },
         {
        path: 'feedback',
        loadChildren: () => import('../feedback/feedback.module').then( m => m.FeedbackPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/slider',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
