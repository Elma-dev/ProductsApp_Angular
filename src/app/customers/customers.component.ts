import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers! :Array<any>;

  constructor() {
  }

  ngOnInit(): void {
    this.customers=[
      {id:1,name:'Customer1',age:18},
      {id:2,name:'Customer2',age:18},
      {id:3,name:'Customer3',age:18},
      {id:4,name:'Customer4',age:18},
      {id:5,name:'Customer5',age:18},
    ]

  }


}
