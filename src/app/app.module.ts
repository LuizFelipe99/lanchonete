import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import material
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {AsyncPipe} from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/user/users/create-user/create-user.component';
import { SnackbarComponent } from './components/shared/alert/snackbar.component';
import { ListUserComponent } from './components/user/users/list-user/list-user.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreateSupplierComponent } from './components/supplier/suppliers/create-supplier/create-supplier.component';
import { ListSupplierComponent } from './components/supplier/suppliers/list-supplier/list-supplier.component';
import { CreateOrderComponent } from './components/supplier/supplier-orders/create-order/create-order.component';
import { ListOrderComponent } from './components/supplier/supplier-orders/list-order/list-order.component';
import { HomeComponent } from './components/home/home.component';
import { DialogFormDetailsComponent } from './components/shared/dialog-form-details/dialog-form-details.component';
import { EditUserComponent } from './components/user/users/edit-user/edit-user.component';
import { EditSupplierComponent } from './components/supplier/suppliers/edit-supplier/edit-supplier.component';
import { UsersDashComponent } from './components/dashboard/users-active/users-dash.component';
import { DetailOrderComponent } from './components/supplier/supplier-orders/detail-order/detail-order.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';

// chart js
import { NgChartsModule } from 'ng2-charts';
import { CreateItemComponent } from './components/supplier/supplier-items/create-item/create-item.component';
import { ListItemComponent } from './components/supplier/supplier-items/list-item/list-item.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { ItemsCategoryComponent } from './components/dashboard/items-category/items-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { EditItemComponent } from './components/supplier/supplier-items/edit-item/edit-item.component';
import { ConfirmItemComponent } from './components/supplier/supplier-items/confirm-item/confirm-item.component';
import { OrderSupplierStatusComponent } from './components/dashboard/order-supplier-status/order-supplier-status.component';
import { CreateSnackComponent } from './components/snack/snacks/create-snack/create-snack.component';
import { ListSnackComponent } from './components/snack/snacks/list-snack/list-snack.component';
import { EditSnackComponent } from './components/snack/snacks/edit-snack/edit-snack.component';
import { ListSnackOrderComponent } from './components/snack/snack-orders/list-snack-order/list-snack-order.component';
import { DetailSnackOrderComponent } from './components/snack/snack-orders/detail-snack-order/detail-snack-order.component';
import { CreateSnackOrderComponent } from './components/snack/snack-orders/create-snack-order/create-snack-order.component';
import { FinishOrderComponent } from './components/supplier/supplier-orders/finish-order/finish-order.component';
import { FinishSnackOrderComponent } from './components/snack/snack-orders/finish-snack-order/finish-snack-order.component';
import { FinanceDashComponent } from './components/dashboard/finance-dash/finance-dash.component';
import { FinanceDashDetailComponent } from './components/dashboard/finance-dash-detail/finance-dash-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    SnackbarComponent,
    ListUserComponent,
    MenuComponent,
    CreateSupplierComponent,
    ListSupplierComponent,
    CreateOrderComponent,
    ListOrderComponent,
    HomeComponent,
    DialogFormDetailsComponent,
    EditUserComponent,
    EditSupplierComponent,
    UsersDashComponent,
    DetailOrderComponent,
    CreateItemComponent,
    ListItemComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    ItemsCategoryComponent,
    EditCategoryComponent,
    EditItemComponent,
    ConfirmItemComponent,
    OrderSupplierStatusComponent,
    CreateSnackComponent,
    ListSnackComponent,
    EditSnackComponent,
    ListSnackOrderComponent,
    DetailSnackOrderComponent,
    CreateSnackOrderComponent,
    FinishOrderComponent,
    FinishSnackOrderComponent,
    FinanceDashComponent,
    FinanceDashDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatExpansionModule,
    NgChartsModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
