import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormEspecItem } from '../../interfaces/form-espec-item.interface';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnChanges {

    @Input() formTitle: string = '';
    @Input() formData: any = {};
    @Input() formEspec: FormEspecItem[] = []; 

    @Output() submitFunc = new EventEmitter<any>(); 
    
    formGroup!: FormGroup;
  
    constructor(private _formBuilder: FormBuilder) {}
  
    private buildForm(): void {
      const group: { [key: string]: any } = {};
  
      this.formEspec.forEach(field => {
        group[field.name] = [{
            value: this.formData[field.name] || '',
            disabled: field.disabled
        }, field.validators];
      });
  
      this.formGroup = this._formBuilder.group(group);
    }

    private updateForm(): void {
      if (this.formGroup) 
        Object.keys(this.formData).forEach(field => {
          if (this.formGroup.get(field)) 
            this.formGroup.get(field)?.setValue(this.formData[field]);
        });
    }

    ngOnInit(): void {
      this.buildForm();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['formData'] && !changes['formData'].isFirstChange())
        this.updateForm();
    }
  
    triggerSubmitFunc(): void {
      this.submitFunc.emit(this.formGroup.getRawValue());
    }
}
