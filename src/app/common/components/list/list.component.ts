import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from '../../interfaces/column.interface';

@Component({
  imports: [CommonModule],
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {    
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() listTitle: string = '';

  @Output() createFunc = new EventEmitter<void>();
  @Output() viewFunc = new EventEmitter<void>();
  @Output() deleteFunc = new EventEmitter<void>(); 
  
  triggerCreateFunc(): void {
    this.createFunc.emit();
  }

  triggerViewFunc(item: any): void {
    this.viewFunc.emit(item);
  }

  triggerDeleteFunc(item: any): void {
    this.deleteFunc.emit(item);
  }
}
