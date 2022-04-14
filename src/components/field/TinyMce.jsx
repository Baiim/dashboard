import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const tinyChange = delegate => val => {
  delegate(val.target.getContent());
};

class TinyMce extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      input: { value: omitValue, onChange },
      id,
      label,
      noLabel,
      requiredStar,
      meta: { touched, error, warning }
    } = this.props;

    return (
      <div className="form-group">
        {' '}
        {!noLabel && (
          <label
            htmlFor={id}
            className="font-weight-semibold"
            style={{ color: '#B2B2B2' }}
          >
            {label}
            {requiredStar && <span className="form-error">*</span>}
          </label>
        )}
        <Editor
          init={{
            theme: 'modern',
            menubar: false,
            height: 200,
            plugins: [
              'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker code',
              'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
              'save table contextmenu directionality emoticons template paste textcolor'
            ],
            toolbar:
              'formatselect bold italic bullist numlist blockquote image link alignleft aligncenter alignright',
            // toolbar:
            //   'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
            file_picker_types: 'image',
            file_picker_callback(cb, value, meta) {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.onchange = function() {
                const file = this.files[0];  
                const reader = new FileReader();
                reader.onload = function() {
                  const id = `blobid${new Date().getTime()}`;
                  const { blobCache } = tinymce.activeEditor.editorUpload;
                  const base64 = reader.result.split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            }
          }}
          onChange={tinyChange(onChange)}
          value={omitValue}
        />
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))}
      </div>
    );
  }
}

export default TinyMce;
