import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-taskpage',
  templateUrl: './taskpage.component.html',
  styleUrls: ['./taskpage.component.scss'],
})
export class TaskpageComponent implements OnInit {
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {}

  getAssignedImages(): string[] {
    return this.imageService.getAssignedImages();
  }
}
