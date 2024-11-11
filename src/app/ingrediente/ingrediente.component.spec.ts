import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IngredienteComponent } from './ingrediente.component';

describe('IngredienteComponent', () => {
  let component: IngredienteComponent;
  let fixture: ComponentFixture<IngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredienteComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
