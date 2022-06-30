import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Form } from '../models/form';
import { Orden } from '../models/orden';
import { Nota } from '../models/nota';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Inspeccion } from '../models/inspeccion';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  lastOrden: number = 0;
  formsList: AngularFireList<any>;
  formObject: AngularFireObject<any>;
  lastOrdenRef: Observable<any[]>;
  lastNotaRef: Observable<any[]>;
  lastInspeccionRef: Observable<any[]>;
  /* public callList: AngularFireList<any>; */
  public ordenList: AngularFireList<any>;
  public notaList: AngularFireList<any>;
  public inspeccionList: AngularFireList<any>;
  public ordenObject: AngularFireObject<any>;
  public notaObject: AngularFireObject<any>;
  public inspeccionObject: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  AddForm(form: object) {
    this.formsList.push(form as Form);
  }

  AddOrden(orden: object) {
    this.ordenList.push(orden as Orden);
  }

  AddNota(nota: object) {
    this.notaList.push(nota as Nota);
  }

  AddInspeccion(inspeccion: object) {
    this.inspeccionList.push(inspeccion as Inspeccion);
  }

  GetFormsList() {
    this.formsList = this.db.list('sanchez/client-list', ref => {
      return ref.orderByChild('nombre')
    });
    return this.formsList;
  }

  GetOrdenesList() {
    this.ordenList = this.db.list('sanchez/orden-list');
    return this.ordenList;
  }

  GetNotasList() {
    this.notaList = this.db.list('sanchez/nota-list');
    return this.notaList;
  }

  GetInspeccionesList() {
    this.inspeccionList = this.db.list('sanchez/inspeccion-list');
    return this.inspeccionList;
  }

  GetForm(key: string) {
    this.formObject = this.db.object('sanchez/client-list/' + key);
    return this.formObject;
  }

  GetOrden(key: string) {
    this.ordenObject = this.db.object('sanchez/orden-list/' + key);
    return this.ordenObject;
  }

  GetNota(key: string) {
    this.notaObject = this.db.object('sanchez/nota-list/' + key);
    return this.notaObject;
  }

  GetInspeccion(key: string) {
    this.inspeccionObject = this.db.object('sanchez/inspeccion-list/' + key);
    return this.inspeccionObject;
  }

  UpdateForm(form: Form, key: string) {
    this.db.object('sanchez/client-list/' + key)
    .update(form);
  }

  UpdateOrden(orden: Orden, key: string) {
    this.db.object('sanchez/orden-list/' + key)
    .update(orden);
  }

  UpdateNota(nota: Nota, key: string) {
    this.db.object('sanchez/nota-list/' + key)
    .update(nota);
  }

  UpdateInspeccion(inspeccion: Inspeccion, key: string) {
    this.db.object('sanchez/inspeccion-list/' + key)
    .update(inspeccion);
  }

  DeleteForm(key: string) {
    this.formObject = this.db.object('sanchez/client-list/' + key);
    this.formObject.remove();
  }

  DeleteInspeccion(key: string) {
    this.inspeccionObject = this.db.object('sanchez/inspeccion-list/' + key);
    this.inspeccionObject.remove();
  }

  async DeleteOrden(key: string) {
    this.ordenObject = this.db.object('sanchez/orden-list/' + key);
      await this.ordenObject.valueChanges().subscribe(data => {
        if (data){
          if (data.firma1n !== '') { const ref = this.storage.ref(data.firma1n); ref.delete(); }
          if (data.firma2n !== '') { const ref = this.storage.ref(data.firma2n); ref.delete(); }
          if (data.firma3n !== '') { const ref = this.storage.ref(data.firma3n); ref.delete(); }
          if (data.firma4n !== '') { const ref = this.storage.ref(data.firma4n); ref.delete(); }
          if (data.img1n !== '') { const ref = this.storage.ref(data.img1n); ref.delete(); }
          if (data.img2n !== '') { const ref = this.storage.ref(data.img2n); ref.delete(); }
          if (data.img3n !== '') { const ref = this.storage.ref(data.img3n); ref.delete(); }
          if (data.img4n !== '') { const ref = this.storage.ref(data.img4n); ref.delete(); }
          if (data.img5n !== '') { const ref = this.storage.ref(data.img5n); ref.delete(); }
          if (data.img6n !== '') { const ref = this.storage.ref(data.img6n); ref.delete(); }
          if (data.img7n !== '') { const ref = this.storage.ref(data.img7n); ref.delete(); }
          if (data.img8n !== '') { const ref = this.storage.ref(data.img8n); ref.delete(); }
        }
      });
    this.ordenObject.remove();
  }

  async DeleteNota(key: string) {
    this.notaObject = this.db.object('sanchez/nota-list/' + key);
    await this.notaObject.valueChanges().subscribe(data => {
      if (data){
        if (data.firma1n !== '') { const ref = this.storage.ref(data.firma1n); ref.delete(); }
      }
    });
    this.notaObject.remove();
  }

  getLastOrden(){
    this.lastOrdenRef = this.db.list('sanchez/orden-list/', ref => ref.limitToLast(1)).valueChanges();
    return this.lastOrdenRef;
  }

  getLastNota(){
    this.lastNotaRef = this.db.list('sanchez/nota-list/', ref => ref.limitToLast(1)).valueChanges();
    return this.lastNotaRef;
  }

  getLastInspeccion(){
    this.lastInspeccionRef = this.db.list('sanchez/inspeccion-list/', ref => ref.limitToLast(1)).valueChanges();
    return this.lastInspeccionRef;
  }
}
