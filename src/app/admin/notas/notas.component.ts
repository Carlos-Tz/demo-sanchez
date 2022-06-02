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
import { Nota } from 'src/app/models/nota';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Nota>();
  save = 2;
  Nota: Nota[];
  data = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;

  displayedColumns: any[] = [
    'orden',
    'presupuesto',
    'nombre',
    'modelo',
    'placas',
    'fecha',
    'action'
  ];
  constructor(
    public api: ApiService, private matDialog: MatDialog, public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.api.GetNotasList().snapshotChanges().subscribe(data => {
      this.Nota = [];
      data.forEach(item => {
        const f = item.payload.toJSON();
        f['$key'] = item.key;
        this.Nota.push(f as Nota);
      });
      if (this.Nota.length > 0) {
        this.data = true;
        this.dataSource.data = this.Nota.slice();
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
    const data = this.Nota.slice();
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
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  async deleteNota(key: string){
    if (window.confirm('¿Esta seguro de eliminar el registro seleccionado?')) {
      await this.api.DeleteNota(key);
      this.toastr.success('Registro Eliminado!');
      window.location.reload();
    }
  }

  /* openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    let dialogRef = this.matDialog.open(NewRegisterComponent, {
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
    let dialogRef = this.matDialog.open(EditRegisterComponent, {
      width: '80%'
    });
    //this.matDialog.open(NewRegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  } */

}
