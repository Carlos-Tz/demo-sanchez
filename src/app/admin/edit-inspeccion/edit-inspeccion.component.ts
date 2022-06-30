import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-inspeccion',
  templateUrl: './edit-inspeccion.component.html',
  styleUrls: ['./edit-inspeccion.component.css']
})
export class EditInspeccionComponent implements OnInit {
  ord = 0;

  public fecha = '';
  public nameC = '';
  public ingresoC = '';
  public salidaC = '';
  uploadedImage: Blob;
  public filePathf1 = '';

  @ViewChild('sig1', { static: false }) signaturePad: SignaturePad;
  public signaturePadOptions: object = {
    minWidth: 0.7,
    maxWidth: 0.8,
    penColor: 'rgb(255,0,0)',
    canvasWidth: 180, // 189
    canvasHeight: 125 // 125
  };
  save = 2;
  key = '';
  presu = false;
  forms: Form[];
  ff = new Date;
  myForm: FormGroup;
  orden = {
    tcar: 'sedan',
    gas: 50
  };

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
    private storage: AngularFireStorage,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.sForm();
    this.formApi.GetInspeccion(this.key).valueChanges().subscribe(data => {
      this.myForm.patchValue(data);
    });
    this.formApi.GetFormsList().snapshotChanges().subscribe(data => {
      this.forms = [];
      data.forEach(item => {
        const form = item.payload.toJSON();
        form['$key'] = item.key;
        this.forms.push(form as Form);
      });
    });
    /* this.formApi.getLastInspeccion().subscribe(res=> {
      if(res[0]){
        this.ord = Number(res[0].orden);
        this.myForm.patchValue({orden: String(this.ord + 1).padStart(6, '0')});      
      } else {
        this.myForm.patchValue({orden: String(1).padStart(6, '0')});      
      }
    });
    this.fecha = fechaObj.format(new Date(), 'D [/] MM [/] YYYY');
    this.myForm.patchValue({ fecha: this.fecha });
    this.ingresoC = this.ff.getFullYear() + '-' + ('0' + (this.ff.getMonth() + 1)).slice(-2) + '-' + ('0' + this.ff.getDate()).slice(-2); */
  }

  sForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      orden: ['', [Validators.required]],
      anio: [''],
      marca: [''],
      modelo: [''],
      color: [''],
      placas: [''],
      km: [''],
      serie: [''],
      tel: [''],
      correo: [''],
      firma1: [''],
      firma1n: [''],
      fecha: [''],
      comentarios: [''],
      balatas_d: [''],
      d_balatas_d: [''],
      balatas_t: [''],
      d_balatas_t: [''],
      discos_d: [''],
      d_discos_d: [''],
      discos_t: [''],
      d_discos_t: [''],
      cilindros: [''],
      d_cilindros: [''],
      liquido_f: [''],
      d_liquido_f: [''],
      rotulas: [''],
      d_rotulas: [''],
      bujes: [''],
      d_bujes: [''],
      terminales: [''],
      d_terminales: [''],
      brazos: [''],
      d_brazos: [''],
      direccion: [''],
      d_direccion: [''],
      horquillas: [''],
      d_horquillas: [''],
      vieletas: [''],
      d_vieletas: [''],
      resortes: [''],
      d_resortes: [''],
      tornillos: [''],
      d_tornillos: [''],
      amortiguadores_d: [''],
      d_amortiguadores_d: [''],
      amortiguadores_t: [''],
      d_amortiguadores_t: [''],
      bridas: [''],
      d_bridas: [''],
      nivel_ac: [''],
      d_nivel_ac: [''],
      nivel_an: [''],
      d_nivel_an: [''],
      nivel_adh: [''],
      d_nivel_adh: [''],
      nivel_ata: [''],
      d_nivel_ata: [''],
      bandas: [''],
      d_bandas: [''],
      poleas: [''],
      d_poleas: [''],
      soportes: [''],
      d_soportes: [''],
      mangueras: [''],
      d_mangueras: [''],
      llantas: [''],
      d_llantas: [''],
    });
  }

  ResetForm() {
    this.myForm.reset();
  }

  submitSurveyData = () => {
    this.formApi.UpdateInspeccion(this.myForm.value, this.key);
    this.toastr.success('Actualizar!');
  }


  nameS(ev) {
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

  imgChanged($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image') ) {
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


