import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-more-ideas-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './more-ideas-form.component.html',
  styleUrls: ['./more-ideas-form.component.css']
})
export class MoreIdeasFormComponent implements OnInit {
  ideaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ideaForm = this.fb.group({
      nomeUsuario: ['', Validators.required],
      emailUsuario: ['', [Validators.required, Validators.email]],
      setor: ['', Validators.required],
      descricaoProblema: ['', Validators.required],
      possiveisSolucoes: [''],
      impactos: [[]], 
      interferenciaAtividades: [''],
      expectativaMelhoria: [''],
      sugestaoNomeKaizen: [''],
      imagem: [null] 
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.ideaForm.patchValue({
        imagem: file
      });
      this.ideaForm.get('imagem')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.ideaForm.valid) {
      const formData = new FormData();
      formData.append('dto', JSON.stringify(this.ideaForm.value));
      if (this.ideaForm.get('imagem')?.value) {
        formData.append('imagem', this.ideaForm.get('imagem')?.value);
      }

      console.log('Formulário Enviado!', this.ideaForm.value);
      alert('Ideia enviada! (Verifique o console para os dados)');
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }
}
