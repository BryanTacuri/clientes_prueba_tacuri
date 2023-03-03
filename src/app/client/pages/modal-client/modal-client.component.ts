import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClienteService } from '../../cliente.service';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css'],
})
export class ModalClientComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() cliente: any;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  title = 'Modal';
  formCliente: any = this._formBuilder.group({
    id: [0],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: [''],
    telefono: [''],
    direccion: [''],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private message: NzMessageService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    if (this.cliente) {
      this.formCliente.patchValue(this.cliente);
    }
    if (this.cliente?.id > 0) {
      this.title = 'Editar Cliente';
    } else {
      this.title = 'Nuevo Cliente';
    }

    console.log(this.formCliente.value);
  }

  handleCancel() {
    this.isVisible = false;

    this.isVisibleChange.emit(this.isVisible);
  }

  handleOk() {
    if (!this.formCliente.valid) {
      this.message.error('Debe llenar todos los campos');
      return;
    }

    if (this.formCliente.value.id > 0) {
      console.log('edit', this.formCliente.value);
      this.clienteService.putCliente(this.formCliente.value);
      this.isVisibleChange.emit(this.isVisible);
    } else {
      console.log('add', this.formCliente.value);
      this.clienteService.postCliente(this.formCliente.value);
      this.isVisibleChange.emit(this.isVisible);
    }
  }
}
