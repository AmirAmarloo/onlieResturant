import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
}) 
export class MovieFormComponent {

  public profileForm = this._fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    releaseYear: [],
  });

  constructor(private _fb: FormBuilder) {}


}
