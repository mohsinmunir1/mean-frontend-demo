import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BackendService } from "../services/backend.service";
import { error } from "util";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-component",
  templateUrl: "./add-component.component.html",
  styleUrls: ["./add-component.component.css"]
})
export class AddComponentComponent implements OnInit {
  public emailError;
  public firstname: string;
  public lastname: string;
  public email: string;
  public submitted: boolean = false;
  public loading = false;
  private registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private backend: BackendService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.minLength(5)]],
      lastname: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]]
    });
  }
  public get f() {
    return this.registerForm.controls;
  }
  public onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.firstname = this.f.firstname.value;
      this.lastname = this.f.lastname.value;
      this.email = this.f.email.value;
      this.backend.addUser(this.firstname, this.lastname, this.email).subscribe(
        m => {
          this.router.navigateByUrl("/list");
        },
        error => {
          this.loading = false;
          this.emailError = error.error.email;
        }
      );
    }
  }
}
