import { Component } from "@angular/core";
import * as CkEditorClassic from './ckeditor5/build/ckeditor.js';

@Component({
    selector: 'app-editor',
    templateUrl: './_editor.component.html',
    styleUrls: ['./_editor.component.scss']
})
export class EditorComponent {

    public _editor = CkEditorClassic;
    public _config = {
        shouldNotGroupWhenFull: false
    }
}