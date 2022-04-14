import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { uploadFile, resetFile } from '@actions/file.action';

class FieldDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      isTooLarge: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = this.props;
    if (nextProps.input.value !== input.value) {
      const { value } = nextProps.input;
      if (value) {
        const imageFile = {
          name: value.name,
          preview: URL.createObjectURL(value)
        };
        this.setState({ imageFile, isTooLarge: false });
      }
    }
  }

  renderDropzone = () => {
    const { imageFile } = this.state;
    const { input, accept, maxSize, noDrag, disabled } = this.props;

    return (
      <Dropzone
        className="border-0"
        name={input.name}
        accept={accept}
        maxSize={maxSize}
        noDrag={noDrag}
        onDrop={this.handleDrop}
        multiple={false}
        disabled={disabled}
      >
        {({ getRootProps, getInputProps }) => (
          <>
            {imageFile && Object.keys(imageFile).length > 0 ? (
              <i
                className="fas fa-pencil-alt pointer"
                style={{ color: '#A1A1A1' }}
              />
            ) : (
              <button
                // {...getRootProps()}
                type="button"
                className="btn p-0"
                style={{ color: '#8c8c8c', marginTop: 2 }}
              >
                {/* <input {...getInputProps()} /> */}
                <i
                  className="fas fa-upload mr-2"
                  style={{ color: '#A1A1A1' }}
                />{' '}
                Unggah
              </button>
            )}
          </>
        )}
      </Dropzone>
    );
  };

  handleDrop = (values, rejectedFiles) => {
    const { maxSize, input, uploadFile } = this.props;

    if (rejectedFiles.length > 0) {
      if (rejectedFiles[0].size > maxSize) {
        this.setState({ isTooLarge: true });
      }
    } else if (values.length > 0) {
      const formData = new FormData();
      formData.append('type', input.name);
      formData.append('file', values[0]);
      uploadFile(formData, input.name);
      input.onChange(values[0]);
    }
  };

  render() {
    const { imageFile, isTooLarge } = this.state;
    const {
      data,
      input,
      label,
      meta: { touched, error, warning }
    } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <div className="form-control">
          {imageFile && Object.keys(imageFile).length > 0 ? (
            <div className="d-flex align-items-center justify-content-between h-100">
              <p
                className={`${
                  imageFile.name.length > 30 ? 'ellipsis-text mb-0' : 'mb-0'
                }`}
              >
                {imageFile.name}
              </p>
              <div className="d-flex align-items-center">
                {this.renderDropzone()}
                <button
                  type="button"
                  className="btn btn-transparent ml-2 p-0"
                  onClick={() => {
                    this.setState({ imageFile: null });
                    input.onChange(null);
                  }}
                >
                  <i
                    className="far fa-trash-alt"
                    style={{ color: '#A1A1A1' }}
                  />
                </button>
              </div>
            </div>
          ) : (
            this.renderDropzone()
          )}
        </div>
        {data.isUploadingFile.image_article && (
          <span className="form-error">Sedang mengunggah...</span>
        )}
        {(touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))) ||
          (isTooLarge && <span className="form-error">File is too large</span>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.file
});

export default connect(mapStateToProps, {
  uploadFile,
  resetFile
})(FieldDropzone);
