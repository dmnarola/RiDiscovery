import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
    // alignment: {
    //     options: ['left', 'right']
    // },
    toolbar: ['bold', 'italic', 'bulletedList', 'numberedList',]
};

const TextEditor = () => {

    return (
        <div className='App'>
            <h5>Discription</h5>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    )
}

export default TextEditor
