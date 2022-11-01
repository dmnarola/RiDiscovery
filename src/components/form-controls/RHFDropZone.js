import React from 'react'
import Dropzone from 'react-dropzone'

const RHFDropZone = () => {
    return (
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <section className="file-upload-wrapper">
                    <div {...getRootProps({ className: "wfp--dropzone__input" })}>
                        <input {...getInputProps()} />
                        <div>Drag 'n' drop some files here, or click to select files</div>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default RHFDropZone
