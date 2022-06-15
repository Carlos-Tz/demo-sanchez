import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/angular2-signaturepad';
import 'fecha';
import fechaObj from 'fecha';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
// import { Ng2ImgMaxService } from 'ng2-img-max';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { Form } from 'src/app/models/form';
import {NgForm} from '@angular/forms';
//import * as $ from 'jquery'
declare let $: any;

@Component({
  selector: 'app-new-orden',
  templateUrl: './new-orden.component.html',
  styleUrls: ['./new-orden.component.css']
})
export class NewOrdenComponent implements OnInit, AfterViewInit {

  public canvasWidth = 180;
  public needleValue = 50;
  public centralLabel = '';
  public name = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'red',
    needleUpdateSpeed: 1000,
    /* arcColors: ['red', 'yellow', 'black'],
    arcDelimiters: [33, 67], */
    arcColors: ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
    arcDelimiters: [6, 17, 21, 32, 36, 47, 53, 64, 68, 79, 83, 94],
    rangeLabel: ['E', 'F'],
    needleStartValue: 50,
  };
  ord = 0;
  myformValuesChanges$;
  total = 0;
  totalr = 0;
  iva = 0;
  obra = 0;
  otros = 0;
  cargos = 0;
  seguro = 0;
  subtotal = 0;
  anticipo = 0;
  saldo = 0;

  public air = false;
  public eng = false;
  public abs = false;
  public oil = false;
  public bat = false;
  public cin = false;
  public fre = false;
  public lig = false;
  public sta = false;
  public tem = false;
  /* public tal = false;
  public pre = false;
  public vol = false; */
  public lock = true;
  public fecha = '';
  public nameC = '';
  public ingresoC = '';
  public salidaC = '';
  /* idiomaA = 'espaniol'; */
  uploadedImage: Blob;
  public filePathI1 = '';
  public filePathI2 = '';
  public filePathI3 = '';
  public filePathI4 = '';
  public filePathI5 = '';
  public filePathI6 = '';
  public filePathI7 = '';
  public filePathI8 = '';
  public filePathf1 = '';
  public filePathf2 = '';
  public filePathf3 = '';
  public filePathf4 = '';

  @ViewChild('sig1', { static: false }) signaturePad: SignaturePad;
  @ViewChild('sig2', { static: false }) signaturePad2: SignaturePad;
  @ViewChild('sig3', { static: false }) signaturePad3: SignaturePad;
  @ViewChild('sig4', { static: false }) signaturePad4: SignaturePad;
  public signaturePadOptions: object = {
    minWidth: 0.7,
    maxWidth: 0.8,
    penColor: 'rgb(255,0,0)',
    canvasWidth: 180, // 189
    canvasHeight: 125 // 125
  };
  save = 2;
  dato = '';
  datos_n: any;
  datos_t: any;
  datos_c: any;
  forms: Form[];
  ff = new Date;
  myForm: FormGroup;
  orden = {
    tcar: 'sedan',
    gas: 50
  };
  bal__ = '';
  afi__ = '';
  dis__ = '';
  tam__ = '';
  fre__ = '';
  ali__ = '';
  bala__ = '';
  mon__ = '';
  rot__ = '';
  onz__ = '';
  val__ = '';
  car__ = '';
  cha__ = '';
  mot__ = '';
  eng__ = '';
  sop__ = '';
  ace__ = '';
  a140__ = '';
  tra__ = '';
  fil__ = '';
  fila__ = '';
  adi__ = '';
  trabajos = '';
  s1 = '';
  s2 = '';
  s3 = '';

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    // console.log('Processing beforeunload...');
    // Do more processing...
    event.returnValue = false;
  }
  constructor(
    private fb: FormBuilder,
    public formApi: ApiService,
    public toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    // private ng2ImgMax: Ng2ImgMaxService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.sForm();
    this.formApi.GetOrdenesList();
    this.formApi.GetFormsList().snapshotChanges().subscribe(data => {
      this.forms = [];
      data.forEach(item => {
        const form = item.payload.toJSON();
        form['$key'] = item.key;
        this.forms.push(form as Form);
      });
      /* this.forms.sort((a, b) => {
        return a.nombre - b.nombre;
      }) */
    });
    this.formApi.getLastOrden().subscribe(res=> {
      if(res[0]){
        this.ord = Number(res[0].orden);
        this.myForm.patchValue({orden: String(this.ord + 1).padStart(6, '0')});      
      } else {
        this.myForm.patchValue({orden: String(1).padStart(6, '0')});      
      }
    });
    $("#contSign").each(function (){ this.style.pointerEvents = 'none'; });
    $("#contSign2").each(function (){ this.style.pointerEvents = 'none'; });
    $("#contSign3").each(function (){ this.style.pointerEvents = 'none'; });
    $("#contSign4").each(function (){ this.style.pointerEvents = 'none'; });
    /*$('.select2').select2();
    $('#nnombre').on('select2:select', function (e) {
      var data = e.params.data; 
      //console.log(data);
      //console.log(data.element.__ngContext__);
      //console.log(data.element.__ngContext__[22]);
      //this.myForm.patchValue({correo: this.save});    
      $('#id').val(data.id).trigger('change');
      $('#nombre').val(data.element.__ngContext__[22].nombre).trigger('change');
      $('#tel').val(data.element.__ngContext__[22].tel).trigger('change');
      $('#correo').val(data.element.__ngContext__[22].email).trigger('change');
      //return data.element.__ngContext__[22];
    });
    this.datos_n = $('#nombre').change(function() {
      //console.log(this.value);
      return this.value;
      //this.nameS(this.value);
    });
    this.datos_t = $('#tel').change(function() {
      //console.log(this.value);
      return this.value;
      //this.nameS(this.value);
    });
    this.datos_c = $('#correo').change(function() {
      //console.log(this.value);
      return this.value;
      //this.nameS(this.value);
    });

    this.myForm.get('nombre').valueChanges.subscribe(selectedValue => {
      console.log(selectedValue);
    }) */
    /* this.formApi.GetOrdenesList().snapshotChanges().subscribe(data => {
      this.ord = data.length + 1;
      this.myForm.patchValue({orden: String(this.ord).padStart(6, '0')});
    }); */
    this.fecha = fechaObj.format(new Date(), 'D [/] MM [/] YYYY');
    this.myForm.patchValue({ fecha: this.fecha });
    this.ingresoC = this.ff.getFullYear() + '-' + ('0' + (this.ff.getMonth() + 1)).slice(-2) + '-' + ('0' + this.ff.getDate()).slice(-2);
  }
  
  ngAfterViewInit() {
    this.signaturePad.off();
    this.signaturePad2.off();
    this.signaturePad3.off();
    this.signaturePad4.off();
  }

  sForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      orden: ['', [Validators.required]],
      marca: [''],
      modelo: [''],
      anio: [''],
      color: [''],
      km: [''],
      placas: [''],
      serie: [''],
      grua: [''],
      ingreso: [''],
      salida: [''],
      tel: [''],
      correo: [''],
      trabajo: [''],
      observ: [''],
      bolsa: [false],
      motor: [false],
      abs: [false],
      aceite: [false],
      bateria: [false],
      cinturon: [false],
      freno: [false],
      luces: [false],
      estabi: [false],
      temper: [false],
      /* tall: [false],
      presion: [false],
      volante: [false], */
      lock: [true],
      gato: [false],
      antena: [false],
      herrami: [false],
      emblemas: [false],
      triang: [false],
      tapones: [false],
      tapetes: [false],
      cables: [false],
      llantar: [false],
      stereo: [false],
      exting: [false],
      encend: [false],
      gas: [50],
      tcar: ['sedan'],
      dere: [''],
      frente: [''],
      detras: [''],
      izq: [''],
      firma1: [''],
      firma2: [''],
      firma1n: [''],
      firma2n: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: [''],
      img5: [''],
      img6: [''],
      img7: [''],
      img8: [''],
      img1n: [''],
      img2n: [''],
      img3n: [''],
      img4n: [''],
      img5n: [''],
      img6n: [''],
      img7n: [''],
      img8n: [''],
      desc1: [''],
      desc2: [''],
      desc3: [''],
      desc4: [''],
      desc5: [''],
      desc6: [''],
      desc7: [''],
      desc8: [''],
      firma3: [''],
      firma4: [''],
      firma3n: [''],
      firma4n: [''],
      fecha: ['']
    });
  }

  ResetForm() {
    this.myForm.reset();
  }

  submitSurveyData = () => {
    this.formApi.AddOrden(this.myForm.value);
    this.toastr.success('Guardado!');
    this.needleValue = 50;
    this.ResetForm();
    this.clear1();
    this.clear2();
    this.clear3();
    this.clear4();
    this.sForm2();
  }
  sForm2() {
    this.myForm.patchValue({fecha: this.fecha});
    this.myForm.patchValue({tcar: 'sedan'});
    this.myForm.patchValue({gas: 50});
    this.myForm.patchValue({dere: []});
    this.myForm.patchValue({frente: []});
    this.myForm.patchValue({detras: []});
    this.myForm.patchValue({izq: []});
    this.myForm.patchValue({nombre: ''});
    this.air = false;
    this.eng = false;
    this.abs = false;
    this.oil = false;
    this.bat = false;
    this.cin = false;
    this.fre = false;
    this.lig = false;
    this.sta = false;
    this.tem = false;
    /* this.tal = false;
    this.pre = false;
    this.vol = false; */
    this.lock = true;
    this.signaturePad.off();
    this.signaturePad2.off();
    this.signaturePad3.off();
    this.signaturePad4.off();
  }

  combus(ev) {
    this.needleValue = ev.srcElement.value;
  }

  nameS(ev) {
    /* console.log(this.datos_n[0].value);
    console.log(this.datos_t[0].value);
    console.log(this.datos_c[0].value); */
    /* this.myForm.patchValue({correo: this.datos_c[0].value});
    this.myForm.patchValue({tel: this.datos_t[0].value});
    this.myForm.patchValue({nombre: this.datos_n[0].value});
    this.nameC = this.datos_n[0].value; */
    //console.log(ev);
    //alert(this.myForm.get('correo').value);
    /* console.log($('#nombre'))
    console.log(this.myForm.get('correo').value);
    console.log(this.myForm.get('nombre').value);
    console.log(this.myForm.get('tel').value); */
    /* this.needleValue = ev.srcElement.value; */
    this.formApi.GetForm(ev.srcElement.value).valueChanges().subscribe(data => {
      if (data.nombre && data.tel && data.email){
        this.myForm.patchValue({correo: data.email});
        this.myForm.patchValue({tel: data.tel});
        this.myForm.patchValue({nombre: data.nombre});
        this.nameC = data.nombre;
      }
    });
  }

  addTrabajo(ev){
    console.log(ev.target.checked);
    console.log(ev.srcElement.value);
  }

  ser(){
    if(this.bal__ || this.afi__ || this.dis__ || this.tam__ || this.fre__){
      this.s1 = 'SERVICIO MECÁNICO: ';
    }else {
      this.s1 = '';
    }
    if(this.ali__ || this.bala__ || this.mon__ || this.rot__ || this.onz__ || this.val__){
      this.s2 = 'SERVICIO DE ALINEACIÓN Y BALANCEO: ';
    }else {
      this.s2 = '';
    }
    if(this.car__ || this.mot__ || this.eng__ || this.sop__ || this.ace__ || this.a140__ || this.tra__ || this.fil__ || this.fila__ || this.adi__){
      this.s3 = 'SERVICIO DE LAVADO Y ENGRASADO: ';
    }else {
      this.s3 = '';
    }
  }

  addBal(ev){
    if(ev.target.checked) this.bal__ = ev.srcElement.value + ', ';
    else this.bal__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addAfi(ev){
    if(ev.target.checked) this.afi__ = ev.srcElement.value + ', ';
    else this.afi__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addDis(ev){
    if(ev.target.checked) this.dis__ = ev.srcElement.value + ', ';
    else this.dis__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addTam(ev){
    if(ev.target.checked) this.tam__ = ev.srcElement.value + ', ';
    else this.tam__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addFre(ev){
    if(ev.target.checked) this.fre__ = ev.srcElement.value + ', ';
    else this.fre__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addAli(ev){
    if(ev.target.checked) this.ali__ = ev.srcElement.value + ', ';
    else this.ali__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addBala(ev){
    if(ev.target.checked) this.bala__ = ev.srcElement.value + ', ';
    else this.bala__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addMon(ev){
    if(ev.target.checked) this.mon__ = ev.srcElement.value + ', ';
    else this.mon__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addRot(ev){
    if(ev.target.checked) this.rot__ = ev.srcElement.value + ', ';
    else this.rot__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addOnz(ev){
    if(ev.target.checked) this.onz__ = ev.srcElement.value + ', ';
    else this.onz__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addVal(ev){
    if(ev.target.checked) this.val__ = ev.srcElement.value + ', ';
    else this.val__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addCar(ev){
    if(ev.target.checked) this.car__ = ev.srcElement.value + ', ';
    else this.car__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addCha(ev){
    if(ev.target.checked) this.cha__ = ev.srcElement.value + ', ';
    else this.cha__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addMot(ev){
    if(ev.target.checked) this.mot__ = ev.srcElement.value + ', ';
    else this.mot__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addEng(ev){
    if(ev.target.checked) this.eng__ = ev.srcElement.value + ', ';
    else this.eng__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addSop(ev){
    if(ev.target.checked) this.sop__ = ev.srcElement.value + ', ';
    else this.sop__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addAce(ev){
    if(ev.target.checked) this.ace__ = ev.srcElement.value + ', ';
    else this.ace__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  add140(ev){
    if(ev.target.checked) this.a140__ = ev.srcElement.value + ', ';
    else this.a140__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addTra(ev){
    if(ev.target.checked) this.tra__ = ev.srcElement.value + ', ';
    else this.tra__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addFil(ev){
    if(ev.target.checked) this.fil__ = ev.srcElement.value + ', ';
    else this.fil__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addFila(ev){
    if(ev.target.checked) this.fila__ = ev.srcElement.value + ', ';
    else this.fila__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }
  addAdi(ev){
    if(ev.target.checked) this.adi__ = ev.srcElement.value + ', ';
    else this.adi__ = '';
    this.ser();
    this.trabajos = this.s1 + this.bal__ + this.afi__ + this.dis__ + this.tam__ + this.fre__ + this.s2 + this.ali__ + this.bala__ + this.mon__ + this.rot__ + this.onz__ + this.val__ + this.s3 + this.car__ + this.cha__ + this.mot__ + this.eng__ + this.sop__ + this.ace__ + this.a140__ + this.tra__ + this.fil__ + this.fila__ + this.adi__;
  }

  airbag() {
    this.air = !this.air;
    this.myForm.patchValue({bolsa: this.air});
    //  this.form_.airbag = !this.form_.airbag;
  }

  engine() {
    this.eng = !this.eng;
    this.myForm.patchValue({motor: this.eng});
  }

  abs_() {
    this.abs = !this.abs;
    this.myForm.patchValue({abs: this.abs});
  }

  oil_() {
    this.oil = !this.oil;
    this.myForm.patchValue({aceite: this.oil});
  }
  battery_() {
    this.bat = !this.bat;
    this.myForm.patchValue({bateria: this.bat});
  }
  cintu_() {
    this.cin = !this.cin;
    this.myForm.patchValue({cinturon: this.cin});
  }
  freno_() {
    this.fre = !this.fre;
    this.myForm.patchValue({freno: this.fre});
  }
  lights_() {
    this.lig = !this.lig;
    this.myForm.patchValue({luces: this.lig});
  }
  stabil_() {
    this.sta = !this.sta;
    this.myForm.patchValue({estabi: this.sta});
  }
  temper_() {
    this.tem = !this.tem;
    this.myForm.patchValue({temper: this.tem});
  }
  /* tall_() {
    this.tal = !this.tal;
    this.myForm.patchValue({tall: this.tal});
  }
  presion_() {
    this.pre = !this.pre;
    this.myForm.patchValue({presion: this.pre});
  }
  volante_() {
    this.vol = !this.vol;
    this.myForm.patchValue({volante: this.vol});
  } */
  lock_() {
    this.lock = !this.lock;
    if (this.lock){
      $("#contSign").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign2").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign3").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign4").each(function (){ this.style.pointerEvents = 'none'; });
      this.signaturePad.off();
      this.signaturePad2.off();
      this.signaturePad3.off();
      this.signaturePad4.off();
    }else{
      $("#contSign").each(function (){ this.style.pointerEvents = 'auto'; });
      $("#contSign2").each(function (){ this.style.pointerEvents = 'auto'; });
      $("#contSign3").each(function (){ this.style.pointerEvents = 'auto'; });
      $("#contSign4").each(function (){ this.style.pointerEvents = 'auto'; });
      this.signaturePad.on();
      this.signaturePad2.on();
      this.signaturePad3.on();
      this.signaturePad4.on();
    }
    this.myForm.patchValue({lock: this.lock});
  }

  drawComplete() {
    this.myForm.patchValue({dere: this.signaturePad.toData()});
  }
  drawComplete2() {
    this.myForm.patchValue({frente: this.signaturePad2.toData()});
  }
  drawComplete3() {
    this.myForm.patchValue({detras: this.signaturePad3.toData()});
  }
  drawComplete4() {
    this.myForm.patchValue({izq: this.signaturePad4.toData()});
  }
  clear1() {
    //this.signaturePad.off();
    this.signaturePad.clear();
    this.myForm.patchValue({dere: []});
  }

  clear2() {
    //this.signaturePad.on();
    this.signaturePad2.clear();
    this.myForm.patchValue({frente: []});
  }

  clear3() {
    this.signaturePad3.clear();
    this.myForm.patchValue({detras: []});
  }

  clear4() {
    this.signaturePad4.clear();
    this.myForm.patchValue({izq: []});
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const ima = inputValue.files[0]; 
    const reader = new FileReader();
    if (ima) {
      reader.readAsDataURL(ima);
    }

    reader.onloadend = () => {
      const imgURL = reader.result as string;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      this.uploadedImage = this.b64toBlob(realData, contentType);
      if (inputValue.name === 'img1') {
        if (this.filePathI1 !== '') {
          const ref = this.storage.ref(this.filePathI1);
          ref.delete();
        }
        this.filePathI1 = `images_sanchez/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI1);
        this.storage.upload(this.filePathI1, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img1: url});
              this.myForm.patchValue({img1n: this.filePathI1});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img2') {
          if (this.filePathI2 !== '') {
            const ref = this.storage.ref(this.filePathI2);
            ref.delete();
          }
          this.filePathI2 = `images_sanchez/image_${Date.now()}`;
          const fileRef = this.storage.ref(this.filePathI2);
          this.storage.upload(this.filePathI2, this.uploadedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.myForm.patchValue({img2: url});
                this.myForm.patchValue({img2n: this.filePathI2});
                this.toastr.success('Imagen cargada correctamente!');
              });
            })
          ).subscribe();
        }
      if (inputValue.name === 'img3') {
        if (this.filePathI3 !== '') {
          const ref = this.storage.ref(this.filePathI3);
          ref.delete();
        }
        this.filePathI3 = `images_sanchez/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI3);
        this.storage.upload(this.filePathI3, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img3: url});
              this.myForm.patchValue({img3n: this.filePathI3});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img4') {
        if (this.filePathI4 !== '') {
          const ref = this.storage.ref(this.filePathI4);
          ref.delete();
        }
        this.filePathI4 = `images_sanchez/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI4);
        this.storage.upload(this.filePathI4, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img4: url});
              this.myForm.patchValue({img4n: this.filePathI4});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img5') {
        if (this.filePathI5 !== '') {
          const ref = this.storage.ref(this.filePathI5);
          ref.delete();
        }
        this.filePathI5 = `images_sanchez/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI5);
        this.storage.upload(this.filePathI5, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img5: url});
              this.myForm.patchValue({img5n: this.filePathI5});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img6') {
        if (this.filePathI6 !== '') {
          const ref = this.storage.ref(this.filePathI6);
          ref.delete();
        }
        this.filePathI6 = `images_sanchez/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI6);
        this.storage.upload(this.filePathI6, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img6: url});
              this.myForm.patchValue({img6n: this.filePathI6});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img7') {
        if (this.filePathI7 !== '') {
          const ref = this.storage.ref(this.filePathI7);
          ref.delete();
        }
        this.filePathI7 = `images_sanchez/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI7);
        this.storage.upload(this.filePathI7, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img7: url});
              this.myForm.patchValue({img7n: this.filePathI7});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img8') {
        if (this.filePathI8 !== '') {
          const ref = this.storage.ref(this.filePathI8);
          ref.delete();
        }
        this.filePathI8 = `images_sanchez/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI8);
        this.storage.upload(this.filePathI8, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img8: url});
              this.myForm.patchValue({img8n: this.filePathI8});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
    };

  }

  imgChanged($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      if (this.filePathf1 !== '') {
        const ref = this.storage.ref(this.filePathf1);
          ref.delete();
      }
      this.filePathf1 = `signs_sanchez/image_${Date.now()}`;
      const fileRef = this.storage.ref(this.filePathf1);
      this.storage.upload(this.filePathf1, blob).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.myForm.patchValue({firma1: url});
            this.myForm.patchValue({firma1n: this.filePathf1});
            this.toastr.success('Firma Actualizada!');
          });
        })
      ).subscribe();
    }
  }
  imgChanged2($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      if (this.filePathf2 !== '') {
        const ref = this.storage.ref(this.filePathf2);
          ref.delete();
      }
      this.filePathf2 = `signs_sanchez/image_${Date.now()}`;
      const fileRef = this.storage.ref(this.filePathf2);
      this.storage.upload(this.filePathf2, blob).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.myForm.patchValue({firma2: url});
            this.myForm.patchValue({firma2n: this.filePathf2});
            this.toastr.success('Firma Actualizada!');
          });
        })
      ).subscribe();
    }
  }
  imgChanged3($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      if (this.filePathf3 !== '') {
        const ref = this.storage.ref(this.filePathf3);
          ref.delete();
      }
      this.filePathf3 = `signs_sanchez/image_${Date.now()}`;
      const fileRef = this.storage.ref(this.filePathf3);
      this.storage.upload(this.filePathf3, blob).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.myForm.patchValue({firma3: url});
            this.myForm.patchValue({firma3n: this.filePathf3});
            this.toastr.success('Firma Actualizada!');
          });
        })
      ).subscribe();
    }
  }
  imgChanged4($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      if (this.filePathf4 !== '') {
        const ref = this.storage.ref(this.filePathf4);
          ref.delete();
      }
      this.filePathf4 = `signs_sanchez/image_${Date.now()}`;
      const fileRef = this.storage.ref(this.filePathf4);
      this.storage.upload(this.filePathf4, blob).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.myForm.patchValue({firma4: url});
            this.myForm.patchValue({firma4n: this.filePathf4});
            this.toastr.success('Firma Actualizada!');
          });
        })
      ).subscribe();
    }
  }
  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}


