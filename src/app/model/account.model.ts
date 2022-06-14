export interface AccountDetails {
  accountId:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  accountOperationDTOS: AccountOperationDTO[];
  pageSize:             number;
}

export interface AccountOperationDTO {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
