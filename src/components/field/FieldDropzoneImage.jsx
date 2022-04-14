import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { uploadFile, resetFile } from '@actions/file.action';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
  top: 15px;
  width: 50px;
  height: 50px;
`;

const imageSize = (value, callback) => {
  const image = new Image();
  image.src = value?.src;
  image.onload = function() {
    callback(this.width, this.height);
  };
};

class FieldDropzoneImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      width: 0,
      height: 0
    };
    this.handleSize = this.handleSize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { input } = this.props;

    if (input !== nextProps.input) {
      this.setState({
        files: nextProps.input.value
      });
    }
  }

  removeImage = () => {
    const { resetField, resetFile, type } = this.props;
    resetField();
    resetFile(type);
  };

  uploadFile = (image, type) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('type', type);
    this.props.uploadFile(formData, type);
  };

  handleSize = value => {
    imageSize(value, (width, height) => this.setState({ width, height }));
  };

  render() {
    const { files, width, height } = this.state;
    const {
      input,
      name,
      meta: { error, warning, touched },
      label,
      requiredStar,
      disabled,
      id,
      data,
      className,
      type
    } = this.props;

    return (
      <div className={`form-group dropzone-icon ${className}`}>
        <div className="my-auto">
          <label htmlFor={id}>
            {requiredStar === true ? (
              <span className="text-required">* </span>
            ) : (
              ''
            )}
            {label}
          </label>
        </div>

        <div className="text-center d-flex justify-content-start">
          <Dropzone
            className="image-form d-block pointer"
            name={name}
            onDrop={filesToUpload => {
              this.uploadFile(filesToUpload[0], type);
              input.onChange(filesToUpload[0]);
            }}
            // maxSize={2097152}
            accept="image/jpeg, image/png, image/jpg"
            multiple={false}
            disabled={disabled}
          >
            {files && !data.isUploadingFile[type] ? (
              <>
                <img
                  src={files.preview || files}
                  ref={this.handleSize}
                  alt=""
                  className="border p-2 my-1"
                  style={{
                    borderRadius: '5px',
                    width: 120,
                    height: 120,
                    objectFit: 'cover'
                  }}
                />
                <p className="text-white mb-0">
                  {width} x {height}
                </p>
              </>
            ) : (
              <>
                <div
                  className="d-flex align-items-center justify-content-center pointer mx-auto"
                  style={{
                    borderRadius: '5px',
                    width: '100px',
                    height: '100px'
                  }}
                >
                  {data.isUploadingFile && data.isUploadingFile[type] ? (
                    <div className="sweet-loading">
                      <FadeLoader
                        css={override}
                        sizeUnit="px"
                        height={15}
                        width={5}
                        radius={20}
                        color="#308ee0"
                        loading
                      />
                      <p className="m-0">Uploading...</p>
                    </div>
                  ) : (
                    <div>
                      <img
                        src="/images/image-thumbnail.png"
                        alt="thumbnail"
                        width="100"
                        className="my-1"
                      />
                    </div>
                  )}
                </div>
                <p className="text-white mt-2 mb-0">
                  Seret gambar disini atau&nbsp;
                  <span className="text-warning text-underline font-weight-semibold">
                    unggah
                  </span>
                </p>
              </>
            )}
          </Dropzone>
        </div>
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))}
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
})(FieldDropzoneImage);
