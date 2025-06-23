import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoreIdeasService } from '../services/more-ideas.service';

@Component({
  selector: 'app-more-ideas-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './more-ideas-form.component.html',
  styleUrl: './more-ideas-form.component.css'
})
export class MoreIdeasFormComponent implements OnInit {
  ideaForm!: FormGroup;
  selectedFile: File | null = null;

  availableImpacts: string[] = [
    'Redução de Custos',
    'Aumento de Produtividade',
    'Melhora da Qualidade',
    'Redução de Desperdício',
    'Segurança',
    'Meio Ambiente',
    'Satisfação do Cliente',
    'Melhora do Clima Organizacional',
    'Otimização de Tempo',
    'Outros'
  ];

  constructor(
    private fb: FormBuilder,
    private moreIdeasService: MoreIdeasService
  ) {}

  ngOnInit(): void {
    this.ideaForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      problemDescription: ['', Validators.required],
      possibleSolutions: ['', Validators.required],
      impacts: [[], Validators.required],
      interference: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      expectedImprovement: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      kaizenNameSuggestion: ['']
    });
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const impactsArray: string[] = this.ideaForm.value.impacts;

    if (checkbox.checked) {
      if (!impactsArray.includes(checkbox.value)) {
        impactsArray.push(checkbox.value);
      }
    } else {
      const index = impactsArray.indexOf(checkbox.value);
      if (index !== -1) {
        impactsArray.splice(index, 1);
      }
    }

    this.ideaForm.patchValue({ impacts: impactsArray });
    this.ideaForm.get('impacts')?.updateValueAndValidity();
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    this.selectedFile = fileList && fileList.length > 0 ? fileList[0] : null;
  }

  onSubmit(): void {
    if (this.ideaForm.valid) {
      const formData = new FormData();

      Object.entries(this.ideaForm.value).forEach(([key, value]) => {
        if (key === 'impacts' && Array.isArray(value)) {
          formData.append(key, value.join(','));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.moreIdeasService.submitIdea(formData).subscribe({
        next: (response) => {
          console.log('Ideia enviada com sucesso!', response);
          alert('Ideia enviada com sucesso!');
          this.ideaForm.reset();
          this.selectedFile = null;
        },
        error: (error) => {
          console.error('Erro ao enviar ideia:', error);
          alert('Erro ao enviar ideia. Verifique o console para mais detalhes.');
        }
      });

    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
      this.ideaForm.markAllAsTouched();
    }
  }
}
