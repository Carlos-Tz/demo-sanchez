import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import fechaObj from 'fecha';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-carwashe',
  templateUrl: './carwashe.component.html',
  styleUrls: ['./carwashe.component.css']
})
export class CarwasheComponent implements OnInit, AfterViewInit {

  public fecha = '';
  myForm: FormGroup;
  ord = 0;
  btn = '';
  btn1 = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public formApi: ApiService,
    public toastr: ToastrService,
  ) { 
    window.addEventListener('afterprint', (event) => {
      //router.navigate(['/carwash']);
      //this.submitSurveyData();
      this.btn = 'none';
      this.btn1 = 'block';
    });
   }

  ngOnInit(): void {
    this.btn = 'block';
    this.btn1 = 'none';
    this.sForm();
    this.formApi.GetTicketsList();
    this.formApi.getLastTicket().subscribe(res=> {
      if(res[0]){
        this.ord = Number(res[0].orden);
        this.myForm.patchValue({orden: String(this.ord + 1).padStart(6, '0')});      
        //$('#fol').html(this.myForm.get('orden').value);
      } else {
        this.myForm.patchValue({orden: String(1).padStart(6, '0')});      
        //$('#fol').html(this.myForm.get('orden').value);
      }
    });
    this.fecha = fechaObj.format(new Date(), 'YYYY[-]MM[-]DD [/] hh:mm:ss a');
    $('#fechae').html('Entrada: '+ this.fecha);
    this.myForm.patchValue({ fecha: this.fecha });
  }

  ngAfterViewInit() {
      /* $('#fechae').html('Entrada: '+ this.fecha);
      this.myForm.patchValue({ fecha: this.fecha }); */
      //window.print();
  }

  sForm() {
    this.myForm = this.fb.group({
      orden: ['', [Validators.required]],
      fecha: [''],
      tipo: [''],
      paquete: ['Express']
    });
  }

  submitSurveyData = () => {
    $('#fol').html('Folio: ' + this.myForm.get('orden').value);
    this.formApi.AddTicket(this.myForm.value);
    //this.toastr.success('Guardado!');
    //this.ResetForm();
    //this.myForm.patchValue({fecha: this.fecha});
  }
  ResetForm() {
    this.myForm.reset();
  }
}
