import { FormControl, AbstractControl } from '@angular/forms';
import { Component, Input } from "@angular/core";
import * as CkEditorClassic from './ckeditor5/build/ckeditor.js';

@Component({
    selector: 'app-editor',
    templateUrl: './_editor.component.html',
    styleUrls: ['./_editor.component.scss']
})
export class EditorComponent {

    @Input() control: AbstractControl<any, any>;

    public _editor = CkEditorClassic;
    public content: string;
    public _config = {
        shouldNotGroupWhenFull: false
    }

    public onChanges(event): void {
        if (this.control) {
            this.control.setValue(this.content);
        }
    }
}