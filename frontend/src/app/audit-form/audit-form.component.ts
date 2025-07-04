import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuditService } from '../services/audit.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  private fb = inject(FormBuilder);
  private auditService = inject(AuditService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.auditForm = this.fb.group({
      auditor: [{ value: '', disabled: true }, Validators.required],
      auditedAreas: this.fb.array([]),
      auditDateTime: [new Date().toISOString(), Validators.required]
    });

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.auditForm.patchValue({ auditor: currentUser.name });
    }
    
    this.addAuditedArea();
  }

  get auditedAreas(): FormArray {
    return this.auditForm.get('auditedAreas') as FormArray;
  }

  addAuditedArea() {
    const areaGroup = this.fb.group({
        nomeArea: ['', Validators.required],
      seiri: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      seiton: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      seiso: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      seiketsu: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      shitsuke: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      notaFinal: [{value: 0, disabled: true}, [Validators.required, Validators.min(0), Validators.max(100)]],
      statusArea: ['PENDENTE'],
      imagens: [[]]
      })

    areaGroup.valueChanges.subscribe(values => {
    const { seiri, seiton, seiso, seiketsu, shitsuke } = values;
    const total = (seiri || 0) + (seiton || 0) + (seiso || 0) + (seiketsu || 0) + (shitsuke || 0);
    const media = total / 5;
    areaGroup.get('notaFinal')?.setValue(parseFloat(media.toFixed(2)), { emitEvent: false });
  });

    this.auditedAreas.push(areaGroup);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.auditForm.valid) {
      console.log('Formulário é válido. Enviando dados...');
      const formValue = this.auditForm.getRawValue();

      formValue.auditedAreas = formValue.auditedAreas.map((area: any) => ({
        ...area,
        statusArea: 'EM_ANALISE'
      }));

      const formData = new FormData();
      formData.append('formulario', JSON.stringify(formValue));

      if (this.selectedFile) {
        formData.append('imagem', this.selectedFile);
      }

      this.auditService.saveAudit(formData).subscribe({
        next: (response: any) => {
          alert('Auditoria enviada com sucesso!');
          this.resetForm();
        },
        error: (error: any) => {
          alert('Erro ao enviar auditoria.');
          console.error(error);
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }

  private resetForm(): void {
    this.auditedAreas.clear();
    this.auditForm.reset(); 
    this.addAuditedArea(); 

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.auditForm.patchValue({ auditor: currentUser.name });
    }
    this.selectedFile = null;
  }
}
