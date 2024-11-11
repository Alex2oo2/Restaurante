import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalificacionComponent } from './calificacion.component';

describe('CalificaionComponent', () => {
  let component: CalificacionComponent;
  let fixture: ComponentFixture<CalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
