import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  RESET_FILE,
  SET_FILE
} from '@actions/file.action';
import { get } from 'lodash';

const initState = {
  isUploadingFile: {
    image_webinar: false,
    image_news_feed: false,
    group_chat: false,
    image_article: false
  },
  file: {
    image_webinar: null,
    image_news_feed: null,
    group_chat: null,
    image_article: null
  }
};

export default function FileReducer(state = initState, action) {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST: {
      const newIsUploadingFile = { ...state.isUploadingFile };
      newIsUploadingFile[action.file_type] = true;

      return {
        ...state,
        isUploadingFile: newIsUploadingFile
      };
    }

    case UPLOAD_FILE_SUCCESS: {
      const newFile = { ...state.file };
      const newIsUploadingFile = { ...state.isUploadingFile };
      newFile[action.file_type] = get(action, 'payload.data', null);
      newIsUploadingFile[action.file_type] = false;

      return {
        ...state,
        isUploadingFile: newIsUploadingFile,
        file: newFile
      };
    }

    case UPLOAD_FILE_ERROR: {
      const newIsUploadingFile = { ...state.isUploadingFile };
      newIsUploadingFile[action.file_type] = false;
      const newFile = { ...state.file };
      newFile[action.file_type] = null;

      return {
        ...state,
        isUploadingFile: newIsUploadingFile,
        file: newFile
      };
    }

    case SET_FILE: {
      const newFile = { ...state.file };
      newFile[action.file_type] = get(action, 'file', null);

      return {
        ...state,
        file: newFile
      };
    }

    case RESET_FILE: {
      const newFile = { ...state.file };
      const newIsUploadingFile = { ...state.isUploadingFile };
      newFile[action.file_type] = null;
      newIsUploadingFile[action.file_type] = false;

      return {
        ...state,
        isUploadingFile: newIsUploadingFile,
        file: newFile
      };
    }

    default:
      return state;
  }
}
