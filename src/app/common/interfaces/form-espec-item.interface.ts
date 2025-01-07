import { ValidationErrors } from "@angular/forms";

export interface FormEspecItem {
    name: string,
    label: string,
    type: string,
    disabled?: boolean,
    validators?: ValidationErrors[] 
}