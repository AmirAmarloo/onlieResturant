import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetailReport } from 'src/app/_models/detailReport';
import { Orders } from 'src/app/_models/orders';
import { SummarizeData } from 'src/app/_models/summarizeDate';
import { OrdersService } from 'src/app/_services/orders.service';
import { FoodCat } from 'src/app/_models/foodCat';

@Component({
  selector: 'app-periodic-report',
  templateUrl: './periodic-report.component.html',
  styleUrls: ['./periodic-report.component.css']
})
export class PeriodicReportComponent {
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  PeriodTime! : FormGroup;
  detaileData! : DetailReport[];
  summarizeData! : SummarizeData[];
  tmpOrder!: Orders;
  foodCat!: any
  public dataSource!: MatTableDataSource<DetailReport>;
  public dataSourceSum!: MatTableDataSource<SummarizeData>;
  public displayedColumns : string[] = ['id', 'dateTime', 'FoodName', 'orderPrice', 'orderQTY', 'takeawayPrice', 'takeawayQty', 'twTotalPrice', 'totalOrderPrice', 'totalPrice', 'grossProfit'];
  public displayedColumnSum : string[] = ['dateTime', 'category', 'takeawayPrice', 'QTY', 'orderPrice', 'grossProfit', 'report'];

  constructor(private _os: OrdersService, 
    private fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer){}

  ngOnInit(): void {
    this.createForm();
    this.foodCat = FoodCat;
    this.getSummarizeData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getDetaileData(stat: number){
    const tmp = this.tmpOrder || {} 
    tmp.status = stat;   
    this._os.getDetailData(tmp).subscribe({
      next: (data) => {
        this.detaileData = data;
      },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.detaileData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {console.log(err)}
    })
  }

  getSummarizeData(){
    this._os.getSummarizeData().subscribe({
      next: (data) => {
        this.summarizeData = data;
      },
      complete: () => {
        this.dataSourceSum = new MatTableDataSource(this.summarizeData);
        this.dataSourceSum.paginator = this.paginator;
        this.dataSourceSum.sort = this.sort;
      },
      error: (err) => {console.log(err)}
    })
  }

  createForm(){
    this.PeriodTime = this.fb.group({
      pTime: [0, Validators.required]
    })
  }

  onSubmit(){
    this.getDetaileData(this.PeriodTime.value.pTime);
  }

  showDetail(selectedDate: string, el: HTMLElement){
    const tmp = this.tmpOrder || {} 
    tmp.dateTime = selectedDate;   
    this._os.getDetailDataByDate(tmp).subscribe({
      next: (data) => {
        this.detaileData = data;
      },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.detaileData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        el.scrollIntoView();
      },
      error: (err) => {console.log(err)}
    })

  }
}
