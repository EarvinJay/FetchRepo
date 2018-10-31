import React, { Component } from "react";
import { Provider } from "react-redux";
import AppRouter from './AppRouter';
import store from "./store";

export default () =>
  <Provider store={store}>
    <AppRouter />
  </Provider >;
