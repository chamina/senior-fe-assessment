import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private _images: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  private selectedImages: Array<string> = [];

  constructor(private http: HttpClient) {}

  getImagesUrl(): Observable<string> {
    return this.http.get<string>('assets/image_paths.txt', {
      responseType: 'text' as 'json',
    });
  }

  getImages(): string[] {
    return this._images.getValue();
  }

  getAssignedImages(): string[] {
    const selectedImagesArray = localStorage.getItem('selectedImage');

    // Parse the retrieved string back into an array
    const selectedImages = JSON.parse(selectedImagesArray!);
    return selectedImages;
  }

  setSelectedImage(imageUrl: string): void {
    this.selectedImages.push(imageUrl);
    localStorage.setItem('selectedImage', JSON.stringify(this.selectedImages));

    window.open('/tasks', '_blank');
  }
}
