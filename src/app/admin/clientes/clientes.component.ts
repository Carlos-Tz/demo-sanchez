import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Form } from 'src/app/models/form';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewRegisterComponent } from '../new-register/new-register.component';
import { EditRegisterComponent } from '../edit-register/edit-register.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Form>();
  save = 2;
  Form: Form[];
  data = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;

  displayedColumns: any[] = [
    'nombre',
    'tel',
    'email',
    'fecha',
    'action'
  ];
  constructor(
    public api: ApiService, private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.GetFormsList().snapshotChanges().subscribe(data => {
      this.Form = [];
      data.forEach(item => {
        const f = item.payload.toJSON();
        f['$key'] = item.key;
        this.Form.push(f as Form);
      });
      if (this.Form.length > 0) {
        this.data = true;
        this.dataSource.data = this.Form.slice();
       /*  this.dataSource.sort = this.sort; */
      }
      /* Pagination */
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
    //this.api.GetCita();
  }

  sortData(sort: Sort) {
    const data = this.Form.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre': return this.compare(a.nombre.trim().toLocaleLowerCase(), b.nombre.trim().toLocaleLowerCase(), isAsc);
        case 'fecha': return this.compare(a.fecha, b.fecha, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    let dialogRef = this.matDialog.open(NewRegisterComponent, /* dialogConfig, */ {
      width: '80%'
    });
    //this.matDialog.open(NewRegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

  editCliente(key: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    let dialogRef = this.matDialog.open(EditRegisterComponent, /* dialogConfig, */ {
      width: '80%'
    });
    //this.matDialog.open(NewRegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

  deleteCliente(key: string){
    if (window.confirm('¿Esta seguro de eliminar el registro seleccionado?')) {
      this.api.DeleteForm(key);
    }
  }

}
