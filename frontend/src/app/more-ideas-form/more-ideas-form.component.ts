import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoreIdeasService } from '../services/more-ideas.service';
import { AuthService } from '../services/auth.service';
import { Sector } from '../models/sector.model';
import { SectorService } from '../services/sector.service';

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
  availableSectors: Sector[] = [];
  submitMessage = '';
  submitMessageType: 'success' | 'error' = 'success';


  @ViewChild('imageInput') imageInput!: ElementRef;

  readonly availableImpacts: string[] = [
    'Redução de Custos', 'Aumento de Produtividade', 'Melhora da Qualidade',
    'Redução de Desperdício', 'Segurança', 'Meio Ambiente', 'Satisfação do Cliente',
    'Melhora do Clima Organizacional', 'Otimização de Tempo', 'Outros'
  ];

  constructor(
    private fb: FormBuilder,
    private moreIdeasService: MoreIdeasService,
    private authService: AuthService,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSectors();
  }

  private initializeForm(): void {
    this.ideaForm = this.fb.group({
      nomeUsuario: [{ value: '', disabled: true }, Validators.required],
      emailUsuario: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      setor: ['', Validators.required],
      descricaoProblema: ['', Validators.required],
      possiveisSolucoes: ['', Validators.required],
      impacts: this.fb.array([], Validators.required),
      interferencia: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      expectativaMelhoria: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      nomeKaizen: ['']
    });
  }

  private loadSectors(): void {
    this.sectorService.sectors$.subscribe((data: Sector[]) => {
      this.availableSectors = data;
      this.fillUserData();
    });
  }

 private fillUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && this.availableSectors.length > 0) {
      this.ideaForm.patchValue({
        nomeUsuario: currentUser.name,
        emailUsuario: currentUser.email,
        setor: currentUser.setor?.id
      });
      this.ideaForm.get('setor')?.disable();
    }
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const impactsArray = this.ideaForm.get('impacts') as FormArray;

    if (checkbox.checked) {
      impactsArray.push(this.fb.control(checkbox.value));
    } else {
      const index = impactsArray.controls.findIndex(x => x.value === checkbox.value);
      if (index !== -1) {
        impactsArray.removeAt(index);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.submitMessage = message;
    this.submitMessageType = type;
    setTimeout(() => this.submitMessage = '', 5000);
  }

  onSubmit(): void {
    if (this.ideaForm.invalid) {
      this.showMessage('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
      this.ideaForm.markAllAsTouched();
      return;
    }

    const formData = this.createFormData();

    this.moreIdeasService.submitIdea(formData).subscribe({
      next: () => {
        this.showMessage('Ideia enviada com sucesso!', 'success');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao enviar ideia:', error);
        this.showMessage('Erro ao enviar ideia. Tente novamente mais tarde.', 'error');
      }
    });
  }

  private createFormData(): FormData {
    const formData = new FormData();
    const formValue = this.ideaForm.getRawValue();

    const selectedSectorObject = this.availableSectors.find(s => s.id === formValue.setor);

    formData.append('name', formValue.nomeUsuario);
    formData.append('email', formValue.emailUsuario);
    formData.append('department', selectedSectorObject?.name || '');
    formData.append('problemDescription', formValue.descricaoProblema);
    formData.append('possibleSolutions', formValue.possiveisSolucoes);
    formData.append('impacts', formValue.impacts.join(','));
    formData.append('interference', formValue.interferencia.toString());
    formData.append('expectedImprovement', formValue.expectativaMelhoria.toString());
    formData.append('kaizenNameSuggestion', formValue.nomeKaizen || '');

    if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    return formData;
  }

  private resetForm(): void {
    this.ideaForm.reset();
    this.ideaForm.setControl('impacts', this.fb.array([], Validators.required));
    this.fillUserData();

    this.selectedFile = null;
    if (this.imageInput) {
      this.imageInput.nativeElement.value = '';
    }
  }
}
