import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {Observable} from "rxjs";
import {AccountCustomer} from "../model/accountCustomer.model";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  newAccountFormGroup!: FormGroup;
  account!: AccountCustomer;
  customer!: Customer;
  savedAccount!: AccountCustomer;

  constructor(private fb: FormBuilder, private accountService: AccountService, private customerService: CustomerService, private router: Router) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.newAccountFormGroup = this.fb.group({
      accountType: this.fb.control(null),
      balance: this.fb.control(0),
      overDraft: this.fb.control(0),
      interestRate: this.fb.control(0)
    });
  }

  handleSaveAccount() {
    let customerId: number = this.customer.id;
    if (this.newAccountFormGroup.value.accountType == 'SAVING ACCOUNT') {
      this.accountService.saveSavingBankAccount(this.newAccountFormGroup.value.balance, customerId, this.newAccountFormGroup.value.interestRate)
        .subscribe({
          next: (data) => {
            this.savedAccount = data;
            alert("Account has been saved successfully");
            this.router.navigateByUrl("/customers");
          },
          error: (err) => {
            console.log(err);
          }
        });
    }else if(this.newAccountFormGroup.value.accountType=='CURRENT ACCOUNT') {
      this.accountService.saveCurrentBankAccount(this.newAccountFormGroup.value.balance, customerId, this.newAccountFormGroup.value.overDraft)
        .subscribe({
          next: (data) => {
            this.savedAccount = data;
            alert("Account has been saved successfully");
            this.router.navigateByUrl("/customers");
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
    this.newAccountFormGroup.reset();
  }
}
