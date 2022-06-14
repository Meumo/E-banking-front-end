import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {Observable} from "rxjs";
import {AccountCustomer} from "../model/accountCustomer.model";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  accountsObservable!: Observable<Array<AccountCustomer>>;

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.accountsObservable = this.accountService.getAccountsByCustomer(this.customerId);
  }

  handleOperations(account: AccountCustomer) {
    this.router.navigateByUrl("/accounts", {state: account})
  }
}
