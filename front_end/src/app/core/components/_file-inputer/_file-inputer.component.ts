import { OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, Renderer2, AfterViewChecked } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-file-inputer',
    templateUrl: './_file-inputer.component.html',
    styleUrls: ['./_file-inputer.component.scss']
})
export class FileInputerComponent implements OnInit, AfterViewChecked {
    private static indexComp: number = 0;

    @ViewChild('inputerBox') inputerBox: ElementRef;
    @ViewChild('inputer') inputer: ElementRef;

    @Input() previewImage: boolean = false;
    @Input() inputerElement: HTMLLabelElement;
    @Input() multiple: boolean;
    @Input() layout: 'row' | 'column';

    @Output() output: EventEmitter<string | ArrayBuffer | null> = new EventEmitter();

    public unique;
    public imagePreviewUrl: string | ArrayBuffer | null;
    public hiddenUploadFileButton: boolean = false;
    public imagePreviewUrls: Array<string | ArrayBuffer | null> = [];

    constructor(
        private renderer: Renderer2
    ) {}

    public ngOnInit(): void {
        this.unique = this.constructor['ɵcmp'].id + FileInputerComponent.indexComp++;
    }

    public ngAfterViewChecked(): void {
        this.renderInputerElement();
    }

    private renderInputerElement(): void {
        if (!this.hiddenUploadFileButton && this.inputerElement) {
            this.inputerElement.setAttribute('for', this.unique);
            this.renderer.appendChild(this.inputerBox.nativeElement, this.inputerElement);
        }
    }

    public readURL(event): void {
        if (!this.previewImage) return;
        if (!event.target.files || !event.target.files[0]) return;
        const { files } = event.target;
        const file = files[0];

        const loadPreviewImage = file => {
            const reader = new FileReader();
            reader.onload = e => {
                if (this.multiple) {
                    this.imagePreviewUrls.push(reader.result);
                    return;
                }
                this.imagePreviewUrl = reader.result;
                this.output.emit(this.imagePreviewUrl);
                this.hiddenUploadFileButton = true;
            };
            reader.readAsDataURL(file);
        }

        if (!this.multiple) {
            loadPreviewImage(file);
            return;
        }
        for (const f of files) {
            loadPreviewImage(f);
        }
    }

    public removePreviewImage(index?: number): void {
        if (index != undefined) {
            this.imagePreviewUrls.splice(index, 1);
            return;
        }
        this.imagePreviewUrl = null;
        this.hiddenUploadFileButton = false;
        
    }
}