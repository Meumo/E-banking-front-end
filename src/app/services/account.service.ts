import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../model/account.model";
import {AccountCustomer} from "../model/accountCustomer.model";
import {CustomerService} from "./customer.service";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  customer!:Customer;

  constructor(private http: HttpClient, private customerService:CustomerService) {
  }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.backendHost + "/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size);
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description};
    return this.http.post(environment.backendHost + "/accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description};
    return this.http.post(environment.backendHost + "/accounts/credit", data);
  }

  public transfer(accountSource: string, accountDestination: string, amount: number,description:string) {
    let data = {accountSource, accountDestination, amount,description};
    return this.http.post(environment.backendHost + "/accounts/transfer", data);
  }

  public getAccountsByCustomer(customerId:number):Observable<Array<AccountCustomer>>{
    return this.http.get<Array<AccountCustomer>>(environment.backendHost+"/accounts/customer/"+customerId);
  }

  public saveSavingBankAccount(balance:number, customerId:number,interestRate:number):Observable<AccountCustomer>{
    let data={balance:balance,interestRate:interestRate};
    return this.http.post<AccountCustomer>(environment.backendHost+"/accounts/savingAccount/"+customerId,data)
  }

  public saveCurrentBankAccount(balance:number, customerId:number,overDraft:number):Observable<AccountCustomer>{
    let data={balance:balance,overDraft:overDraft};
    return this.http.post<AccountCustomer>(environment.backendHost+"/accounts/currentAccount/"+customerId,data)
  }
}
