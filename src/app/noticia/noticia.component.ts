import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TipoNoticiaPipe } from '../tiponoticia.pipe'; 

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, TipoNoticiaPipe], 
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
})
export class NoticiaComponent implements OnInit {
  noticias: any[] = [];
  errorMessage: string | null = null;

  nuevaNoticia: any = { idnoticia: null, titulo: '', descripcion: '', foto: '', fechaPublicacion: null, tipo: '' }; // Agrega 'tipo'
  imageUrl: string | null = null;
  selectedFile: File | null = null;

  private apiUrl = 'http://localhost:8080/noticia';
  private apiUrlBuscar = 'http://localhost:8080/noticia/buscar';
  private apiUrlGuardar = 'http://localhost:8080/noticia/guardar';
  private apiUrlActualizar = 'http://localhost:8080/noticia/actualizar';
  private apiUrlBorrar = 'http://localhost:8080/noticia/borrar'; 

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.http.get<any[]>(this.apiUrlBuscar).subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.noticias = data;
      },
      (error) => this.handleError(error)
    );
  }

  handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = 'Hubo un problema al cargar las noticias. Por favor, inténtalo de nuevo.';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.extraerBase64(this.selectedFile).then((imagen: any) => {
      this.imageUrl = imagen.base64 as string;
      this.nuevaNoticia.foto = this.imageUrl; 
    });
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.domSanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base64: reader.result
        });
      };
      reader.onerror = () => {
        resolve({
          base64: ''
        });
      };
    } catch (e) {
      resolve({
        base64: ''
      });
    }
  });

  guardarNoticia(): void {
    const nuevaNoticia = {
      ...this.nuevaNoticia,
      fechaPublicacion: new Date() 
    };

    this.http.post<any>(this.apiUrlGuardar, nuevaNoticia).subscribe(
      (data) => {
        console.log('Noticia guardada:', data);
        this.noticias.push(data); 
        this.loadNoticias(); 
        this.resetForm();
      },
      (error) => this.handleError(error)
    );
}

  editarNoticia(noticia: any): void {
    this.nuevaNoticia = { ...noticia }; 
  }

  actualizarNoticia(): void {
    this.http.put<any>(`${this.apiUrlActualizar}/${this.nuevaNoticia.idnoticia}`, this.nuevaNoticia).subscribe(
      (data) => {
        console.log('Noticia actualizada:', data);
        this.loadNoticias(); 
        this.resetForm();
      },
      (error) => this.handleError(error)
    );
  }

  resetForm(): void {
    this.nuevaNoticia = { idnoticia: null, titulo: '', descripcion: '', foto: '', fechaPublicacion: null, tipo: '' }; // Restablece 'tipo'
    this.imageUrl = null;
    this.selectedFile = null;
  }

  borrarNoticia(idnoticia: number): void {
    this.http.delete(`${this.apiUrlBorrar}/${idnoticia}`).subscribe(
      () => {
        this.noticias = this.noticias.filter(n => n.idnoticia !== idnoticia); 
      },
      (error) => this.handleError(error)
    );
  }
}
