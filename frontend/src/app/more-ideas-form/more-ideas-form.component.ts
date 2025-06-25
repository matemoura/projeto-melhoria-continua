import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoreIdeasService } from '../services/more-ideas.service';

@Component({
  selector: 'app-more-ideas-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './more-ideas-form.component.html',
  styleUrls: ['./more-ideas-form.component.css'] 
})
export class MoreIdeasFormComponent implements OnInit {
  ideaForm!: FormGroup;
  selectedFile: File | null = null;

  @ViewChild('imageInput') imageInput!: ElementRef;

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
      nomeUsuario: ['', Validators.required],
      emailUsuario: ['', [Validators.required, Validators.email]],
      setor: ['', Validators.required],
      descricaoProblema: ['', Validators.required],
      possiveisSolucoes: ['', Validators.required],
      impactos: [[], Validators.required],
      interferencia: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      expectativaMelhoria: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      nomeKaizen: ['']
    });
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const impactsArray: string[] = this.ideaForm.value.impactos;

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

    this.ideaForm.patchValue({ impactos: impactsArray });
    this.ideaForm.get('impactos')?.updateValueAndValidity();
  }

  onFileSelected(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    this.selectedFile = file ?? null;
  }

  onSubmit(): void {
    if (this.ideaForm.valid) {
      const formData = new FormData();

      const formValue = this.ideaForm.value;
      const impactos = formValue.impactos;

      formData.append('name', formValue.nomeUsuario);
      formData.append('email', formValue.emailUsuario);
      formData.append('department', formValue.setor);
      formData.append('problemDescription', formValue.descricaoProblema);
      formData.append('possibleSolutions', formValue.possiveisSolucoes || '');
      formData.append('impacts', Array.isArray(impactos) ? impactos.join(',') : '');
      formData.append('interference', formValue.interferencia?.toString() || '0');
      formData.append('expectedImprovement', formValue.expectativaMelhoria?.toString() || '0');
      formData.append('kaizenNameSuggestion', formValue.nomeKaizen || '');

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.moreIdeasService.submitIdea(formData).subscribe({
        next: (response) => {
          console.log('Ideia enviada com sucesso!', response);
          alert('Ideia enviada com sucesso!');
          
          this.ideaForm.reset({
            nomeUsuario: '',
            emailUsuario: '',
            setor: '',
            descricaoProblema: '',
            possiveisSolucoes: '',
            impactos: [],
            interferencia: null,
            expectativaMelhoria: null,
            nomeKaizen: ''
          });
          
          this.selectedFile = null;
          if (this.imageInput) {
            this.imageInput.nativeElement.value = '';
          }
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