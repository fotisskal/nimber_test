import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {API} from './apicontroller';

import {ToastAndroid} from 'react-native';
import RNExitApp from 'react-native-exit-app';

class Manager {
  state = {
    navigation: {
      view: [],
      backHandlerClickCount: 0,
    },
    App: {
      props: {},
    },
  };

  views = {};

  stageChangeCallback = function () {};

  navigateTo(view, props, reset) {
    this.state.navigation.backHandlerClickCount = 0;
    if (this.views[view]) {
      if (reset) {
        this.state.navigation.view = [];
      }
      this.state.navigation.view.push({
        view: this.views[view],
        props: props,
      });
      this.state.App.currentView = this.getCurrentView().view;
      this.state.App.props = props;
      this.updateApp();
    }
  }

  registerView(name, view) {
    this.views[name] = view;
  }

  setStateChangeCallback(callback) {
    this.stageChangeCallback = callback;
  }

  getCurrentView() {
    return this.state.navigation.view[this.state.navigation.view.length - 1];
  }

  navigateBack() {
    const shortToast = (message) => {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    };
    this.state.navigation.backHandlerClickCount += 1;
    if (this.state.navigation.backHandlerClickCount < 2) {
      shortToast('Press again to shut down the application!');
    } else {
      this.state.navigation.backHandlerClickCount = 0;
      RNExitApp.exitApp();
    }
  }

  scaleW(size) {
    if (!size) {
      return 0;
    }
    return wp(size);
  }

  scaleH(size) {
    if (!size) {
      return 0;
    }
    return hp(size);
  }

  scaleF(size) {
    if (!size) {
      return 0;
    }
    return wp(size);
  }

  updateApp() {
    if (this.stageChangeCallback) {
      console.log(this.state.App);
      this.stageChangeCallback(this.state.App);
    }
  }

  getAppState() {
    return this.state.App;
  }

  showError(error) {
    this.state.App.error = error;
    this.updateApp();
  }

  closeError() {
    let callback = this.state.App.error.callback;
    this.state.App.error = null;
    this.updateApp();
    if (callback) {
      callback();
    }
  }

  async getQuizData(amount, difficulty, type) {
    return await API.get_questions(amount, difficulty, type);
  }
}

let _manager = new Manager();

exports.Manager = _manager;
