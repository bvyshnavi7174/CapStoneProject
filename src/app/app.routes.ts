import { Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { HomeComponent } from './components/home/home.component';
import { SellComponent } from './components/sell/sell.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AccountComponent } from './components/account/account.component';
import { HomecontentComponent } from './components/homecontent/homecontent.component';
import { HistoryComponent } from './components/history/history.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/homecontent', pathMatch: 'full' }, 
    { path: 'homecontent', component: HomecontentComponent },            
    { path: 'sell', component: SellComponent },           
    { path: 'buy', component: BuyComponent },              
    { path: 'aboutus', component: AboutusComponent },
    { path: 'history', component: HistoryComponent }, 
    { path: 'checkout', component: CheckoutComponent },   
    { path: 'account', component: AccountComponent } 
];
