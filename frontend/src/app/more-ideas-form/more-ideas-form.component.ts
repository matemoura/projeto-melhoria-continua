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

  constructor(private fb: FormBuilder, private moreIdeasService: MoreIdeasService) { }

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

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    if (this.ideaForm.valid) {
      const formData = new FormData();
      
      Object.keys(this.ideaForm.value).forEach(key => {
        const value = this.ideaForm.value[key];
        
        if (key === 'impacts' && Array.isArray(value)) {
          formData.append(key, value.join(','));
        } else {
          formData.append(key, value);
        }
      });

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      console.log('Dados do formulário para envio (FormData):', formData);

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