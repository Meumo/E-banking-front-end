import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {AccountDetails} from "../model/account.model";
import {catchError, Observable, throwError} from "rxjs";
import {AccountCustomer} from "../model/accountCustomer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFormGroup!: FormGroup;
  errorMessage!: string;
  account: AccountCustomer | undefined;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.account = this.router.getCurrentNavigation()?.extras.state as AccountCustomer;
  }

  ngOnInit(): void {
    if (this.account != undefined) {
      this.accountObservable = this.accountService.getAccount(this.account.id, this.currentPage, this.pageSize)
        .pipe(catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        }));
    }
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    });
  }

  handleSearchAccount() {
    if (this.account != undefined) {
      this.accountFormGroup.value.accountId = this.account.id;
    } else if (this.account == undefined) {
      let accountId = this.accountFormGroup.value.accountId;
      this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize)
        .pipe(catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        }));
    }
    this.account=undefined;
    this.accountFormGroup.reset();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    if (this.account != undefined) this.accountFormGroup.value.accountId = this.account.id;
    let accountId: string = this.accountFormGroup.value.accountId;
    if (this.operationFormGroup.value.operationType == 'DEBIT') {
      this.accountService.debit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.description)
        .subscribe({
          next: (data) => {
            alert("Success Debit");
            this.handleSearchAccount();
          },
          error: (err) => {
            console.log(err)
          }
        });
    } else if (this.operationFormGroup.value.operationType == 'CREDIT') {
      this.accountService.credit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.description)
        .subscribe({
          next: (data) => {
            alert("Success Credit");
            this.handleSearchAccount();
          },
          error: (err) => {
            console.log(err)
          }
        });

    } else if (this.operationFormGroup.value.operationType == 'TRANSFER') {
      this.accountService.transfer(accountId, this.operationFormGroup.value.accountDestination, this.operationFormGroup.value.amount, this.operationFormGroup.value.description)
        .subscribe({
          next: (data) => {
            alert("Success Transfer");
            this.handleSearchAccount();
          },
          error: (err) => {
            console.log(err)
          }
        });
    }
    this.operationFormGroup.reset();
  }
}
