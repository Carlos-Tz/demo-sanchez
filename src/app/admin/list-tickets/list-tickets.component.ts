import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Form } from 'src/app/models/form';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Nota } from 'src/app/models/nota';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Ticket>();
  save = 2;
  Ticket: Ticket[];
  data = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;

  displayedColumns: any[] = [
    'orden',
    //'tipo',
    'paquete',
    'fecha'
  ];
  constructor(
    public api: ApiService, private matDialog: MatDialog, public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.api.GetTicketsList().snapshotChanges().subscribe(data => {
      this.Ticket = [];
      data.forEach(item => {
        const f = item.payload.toJSON();
        f['$key'] = item.key;
        this.Ticket.push(f as Ticket);
      });
      if (this.Ticket.length > 0) {
        this.data = true;
        this.dataSource.data = this.Ticket.slice();
        /* this.dataSource.sort = this.sort; */
      }
      /* Pagination */
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
    /* this.sortData() */
    //this.api.GetCita();
  }

  sortData(sort: Sort) {
    const data = this.Ticket.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'orden': return this.compare(a.orden, b.orden, isAsc);
        case 'fecha': return this.compare(a.fecha, b.fecha, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngAfterViewInit(): void {
    /* this.dataSource.sort = this.sort; */
  }

  public doFilter = (value: string) => {
    //console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

/*   async deleteNota(key: string){
    if (window.confirm('¿Esta seguro de eliminar el registro seleccionado?')) {
      await this.api.DeleteNota(key);
      this.toastr.success('Registro Eliminado!');
      window.location.reload();
    }
  } */

}
