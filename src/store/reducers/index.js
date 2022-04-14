import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './app.reducer';
import auth from './auth.reducer';
import admin from './admin.reducer';
import file from './file.reducer';
import user from './user.reducer';
import member from './member.reducer';
import groupChat from './groupChat.reducer';
import faq from './faq.reducer';
import webinar from './webinar.reducer';
import article from './article.reducer';
import investmentAccount from './investmentAccount.reducer';
import stock from './stock.reducer';
import sector from './sector.reducer';
import hashtag from './hashtag.reducer';

const appReducer = combineReducers({
  app,
  auth,
  admin,
  file,
  user,
  member,
  groupChat,
  faq,
  webinar,
  article,
  investmentAccount,
  stock,
  hashtag,
  sector,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
