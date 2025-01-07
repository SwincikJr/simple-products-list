import { ValidationErrors } from "@angular/forms";
import { FormEspecOption } from "./form-espec-option.interface";

export interface FormEspecItem {
    name: string,
    label: string,
    type: 'text' | 'select',
    disabled?: boolean,
    validators?: ValidationErrors[]
    options?: FormEspecOption[]  
}