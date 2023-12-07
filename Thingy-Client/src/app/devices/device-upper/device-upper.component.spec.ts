import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUpperComponent } from './device-upper.component';

describe('DeviceUpperComponent', () => {
  let component: DeviceUpperComponent;
  let fixture: ComponentFixture<DeviceUpperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceUpperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
