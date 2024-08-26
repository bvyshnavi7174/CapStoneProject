import { Routes } from '@angular/router';
import { BuyComponent } from './components/buy/buy.component';
import { HomeComponent } from './components/home/home.component';
import { SellComponent } from './components/sell/sell.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AccountComponent } from './components/account/account.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomecontentComponent } from './components/homecontent/homecontent.component';

export const routes: Routes = [
    { path: '', redirectTo: '/homecontent', pathMatch: 'full' }, // Default route
    { path: 'homecontent', component: HomecontentComponent },            // Home route
    { path: 'sell', component: SellComponent },            // Sell route
    { path: 'buy', component: BuyComponent },              // Buy route
    { path: 'aboutus', component: AboutusComponent },     // About Us route
    { path: 'contactus', component: ContactusComponent }, // Contact Us route
    { path: 'account', component: AccountComponent } 
];
