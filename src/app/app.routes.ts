import { Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { HomeComponent } from './components/home/home.component';
import { SellComponent } from './components/sell/sell.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AccountComponent } from './components/account/account.component';
import { HomecontentComponent } from './components/homecontent/homecontent.component';
import { HistoryComponent } from './components/history/history.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/homecontent', pathMatch: 'full' }, 
    { path: 'homecontent', component: HomecontentComponent },            
    { path: 'sell', component: SellComponent,canActivate: [AuthGuard] },           
    { path: 'buy', component: BuyComponent ,canActivate: [AuthGuard]},              
    { path: 'aboutus', component: AboutusComponent },
    { path: 'history', component: HistoryComponent,canActivate: [AuthGuard] }, 
    { path: 'checkout', component: CheckoutComponent ,canActivate: [AuthGuard]},   
    { path: 'account', component: AccountComponent,canActivate: [AuthGuard] } 
];
