import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigateH(routeName, params={}) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigate(routeName) {
    _navigator.dispatch(
      StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: routeName })]
      })
    );
  }

// add other navigation functions that you need and export them

export default {
  navigate,
  navigateH,
  setTopLevelNavigator,
};