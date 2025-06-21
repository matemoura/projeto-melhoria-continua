import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuditService } from '../services/audit.service';

@Component({
  selector: 'app-audit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './audit-form.component.html',
  styleUrls: ['./audit-form.component.css']
})
export class AuditFormComponent {
  auditForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private auditService: AuditService) {
    this.auditForm = this.fb.group({
      auditor: ['', Validators.required],              
      auditedAreas: this.fb.array([]),                 
      auditDateTime: [new Date().toISOString(), Validators.required]  
    });
  }

  get auditedAreas(): FormArray {
    return this.auditForm.get('auditedAreas') as FormArray;
  }

  addAuditedArea() {
    this.auditedAreas.push(
      this.fb.group({
        areaName: ['', Validators.required],
        score: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
      })
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.auditForm.valid) {
      const formData = new FormData();
      formData.append('dto', JSON.stringify(this.auditForm.value));

      if (this.selectedFile) {
        formData.append('imagem', this.selectedFile);
      }

      this.auditService.submitAudit(formData).subscribe({
        next: (response) => {
          console.log('Auditoria enviada com sucesso!', response);
          alert('Auditoria enviada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao enviar auditoria:', error);
          alert('Erro ao enviar auditoria.');
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }
}
