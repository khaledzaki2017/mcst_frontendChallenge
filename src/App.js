import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './route/index';
class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Main} />
      </BrowserRouter>
    );
  }
}
export default Index