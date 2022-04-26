import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wait-list',
  templateUrl: './wait-list.component.html'
})
export class WaitListComponent implements OnInit {
  subscribeForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initSubscribeForm();
  }

  private initSubscribeForm(): void {
    this.subscribeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmitSubscribeForm(): void {
    if (this.subscribeForm.invalid) {
      this.subscribeForm.markAllAsTouched();
      return;
    }
    console.log(this.subscribeForm);
  }
}
