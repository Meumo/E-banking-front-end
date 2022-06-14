export interface AccountCustomer {
  type:          string;
  id:            string;
  balance:       number;
  createdDate:   Date;
  status:        string;
  customerDTO:   CustomerDTO;
  interestRate?: number;
  overDraft?:    number;
}

export interface CustomerDTO {
  id:    number;
  name:  string;
  email: string;
}
