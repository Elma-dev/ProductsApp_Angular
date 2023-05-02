export interface Customer{
  id:string;
  name:string;
  age:number;
}

export interface CustomerPages{
  customerPage:Array<Customer> ;
  page : number;
  size: number;
  totalNbrPages: number;

}
