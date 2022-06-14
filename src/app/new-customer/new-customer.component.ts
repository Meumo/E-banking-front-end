import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup!: FormGroup;
  customer!: Customer;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.email, Validators.required])
    });
  }

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: (data) => {
        this.customer = data;
        //alert("Customer has been saved successfully");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/new-account", {state: this.customer});
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
