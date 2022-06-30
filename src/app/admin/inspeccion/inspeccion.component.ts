import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Orden } from 'src/app/models/orden';
import { ToastrService } from 'ngx-toastr';
import { Inspeccion } from 'src/app/models/inspeccion';

@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.css']
})
export class InspeccionComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Inspeccion>();
  save = 2;
  Inspeccion: Inspeccion[];
  data = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;

  displayedColumns: any[] = [
    'orden',
    'nombre',
    'modelo',
    'placas',
    'fecha',
    'action'
  ];
  constructor(
    public api: ApiService, public toastr: ToastrService  ) { }

  ngOnInit() {
    this.api.GetInspeccionesList().snapshotChanges().subscribe(data => {
      this.Inspeccion = [];
      data.forEach(item => {
        const f = item.payload.toJSON();
        f['$key'] = item.key;
        this.Inspeccion.push(f as Inspeccion);
      });
      if (this.Inspeccion.length > 0) {
        this.data = true;
        this.dataSource.data = this.Inspeccion.slice();
      }
      /* Pagination */
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
    this.api.getLastInspeccion();
  }

  sortData(sort: Sort) {
    const data = this.Inspeccion.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'orden': return this.compare(a.orden, b.orden, isAsc);
        /* case 'nombre': return this.compare(a.nombre.trim().toLocaleLowerCase(), b.nombre.trim().toLocaleLowerCase(), isAsc); */
        /* case 'fecha': return this.compare(a.fecha, b.fecha, isAsc); */
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

  async deleteInspeccion(key: string){
    if (window.confirm('¿Esta seguro de eliminar el registro seleccionado?')) {
      await this.api.DeleteInspeccion(key);
      this.toastr.success('Registro Eliminado!');
      window.location.reload();
    }
  }

}
