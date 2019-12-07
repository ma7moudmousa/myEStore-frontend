import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SummaryPipe } from './pipes/summary.pipes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { GetcategoryService } from './services/getcategory.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AddUserService } from './services/add-user.service';
import { GetsubsService } from './services/getsubs.service';
import { StartPageComponent } from './start-page/start-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminComponent } from './admin/admin.component';
import { NavadminComponent } from './navadmin/navadmin.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { UsersComponent } from './users/users.component';
import { HeadersService } from './services/headers.service';
import { AuthgurdService } from './services/authgurd.service';
import { NoaccessComponent } from './noaccess/noaccess.component';
import { IsAdmingardService } from './services/is-admingard.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SummaryPipe,
    ProductsComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    StartPageComponent,
    ProductDetailsComponent,
    AdminComponent,
    NavadminComponent,
    SubcategoriesComponent,
    UsersComponent,
    NoaccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: StartPageComponent },
      { path: "noaccess", component: NoaccessComponent }
      , { path: "login", component: LoginComponent },
      { path: "users", component: UsersComponent, canActivate: [AuthgurdService, IsAdmingardService] },
      { path: "subcategories", component: SubcategoriesComponent },
      { path: "profile", component: ProfileComponent },
      { path: "products/:id", component: ProductsComponent }
      , { path: "product-details/:id/:ids", component: ProductDetailsComponent }
      , { path: "signup", component: SignupComponent }
      , { path: "categories", component: CategoryComponent }
      , { path: "products", component: ProductsComponent }
      , { path: "admin", component: AdminComponent, canActivate: [AuthgurdService, IsAdmingardService] }
    ])
  ],
  providers: [GetcategoryService, HeadersService, ProductsService
    , AuthService, AddUserService, GetsubsService, AuthgurdService, IsAdmingardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
