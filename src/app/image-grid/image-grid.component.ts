import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent implements OnInit, OnDestroy {
  paginatedImages: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  showModal: boolean = false;
  selectedImageUrl: string = '';
  imageUrls: string[] = [];
  private unsubscribe$ = new Subject<void>();
  imageUrls$: Observable<string[]> = of([]);
  showAlert: boolean = false;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService
      .getImagesUrl()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (imageUrlText: string) => {
          this.imageUrls = imageUrlText.split(/[\r\n]+/);
          this.loadImages();
        },
        error: (err) => {
          console.error('Error fetching image URLs:', err);
        },
      });
  }

  loadImages(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedImages = this.imageUrls.slice(startIndex, endIndex);

    // try to use forkJoin to wait for all HTTP requests to complete,
    // but httpclient.get but its getting cors error for localhost

    //  const requests = this.imageUrls
    //     .slice(startIndex, endIndex)
    //     .map((url) => this.httpClient.get(url));

    // forkJoin(requests).subscribe((responses: any[]) => {
    //   console.log('All images loaded:', responses);
    //   this.paginatedImages = responses;
    // });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadImages();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadImages();
    }
  }

  get isPreviousDisabled(): boolean {
    return this.currentPage === 1;
  }

  get isNextDisabled(): boolean {
    return (
      this.currentPage ===
      Math.ceil(this.imageService.getImages().length / this.itemsPerPage)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.imageService.getImages().length / this.itemsPerPage);
  }

  openModal(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  setImageToTaskPage(image: string): void {
    this.paginatedImages.splice(this.paginatedImages.indexOf(image), 1);
    this.showAlert = true; // Show the alert

    setTimeout(() => {
      this.showAlert = false; // Hide the alert after 3 seconds
    }, 3000);
    this.imageService.setSelectedImage(image);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
