import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent] // Declaraciones del componente
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect if no user is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simula que no hay usuario
    spyOnProperty(location, 'href', 'set'); // Espía el setter de location.href
    
    component = new LogoutComponent(); // Crea una nueva instancia del componente

    expect(location.href).toBe(''); // Verifica que redirija a la página principal
  });

  it('should logout and redirect', () => {
    spyOn(localStorage, 'clear'); // Espía el método clear de localStorage
    spyOnProperty(location, 'href', 'set'); // Espía el setter de location.href

    component.logout(); // Llama al método logout

    expect(localStorage.clear).toHaveBeenCalled(); // Verifica que clear fue llamado
    expect(location.href).toBe(''); // Verifica que redirija a la página principal
  });
});
