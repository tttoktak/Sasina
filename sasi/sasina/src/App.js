import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Bisec from './Component/Bisec'
import False from './Component/False'
import Fix from './Component/Fix'
import Newton from './Component/Newton'
import Secant from './Component/Secant'
//import Bwoh from './Component/Bwoh'
//import Bwoh2 from './Component/Bwoh2'

import { Menu } from 'antd';



const { SubMenu } = Menu;
class App extends Component {
  render() {
    return (
      <Router className="header" >
        <div class="home" >
        <h1 class="font"style={{ color: "black", textAlign : "center",backgroundColor: "#F7819F",height: "60px" }} >Numerical Method</h1>
          <Menu theme="dark"mode="horizontal" style={{ color: "black", fontWeight: "bold",height: "80px" ,backgroundColor: "#F7819F",fontSize:"20px" }}>
          <SubMenu title="Root of Equation" key="sub1" 
          title={
            <span class="dropdown-item" class="font-sub"> 
              
              <span>Root of Equation</span>
            </span>
          }>
            <Menu.Item>
              <Link to='/bisec'>Bisection Method</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/false'>False Position Method</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/fix'>Fixpoint (One-point Iteration Method)</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/newton'>Newton Rapson</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/secant'>Secant Method</Link>
            </Menu.Item>
            </SubMenu>
           
           <SubMenu title="Extrapolation" key="sub3" 
          title={
          <span class="dropdown-item" class="font-sub"> 
            
            <span>Differential Integration</span>
          </span>
        }>

            <Menu.Item >
              <Link to='/Bwoh'>Bw(oh)</Link>
            </Menu.Item>
            <Menu.Item >
              <Link to='/Bwoh2'>Bw(oh^2)</Link>
            </Menu.Item>
            <Menu.Item >
              <Link to='/oh2'>o(h^2)</Link>
            </Menu.Item>
            
        </SubMenu>
        <SubMenu title="Extrapolation" key="sub2" 
          title={
          <span class="dropdown-item" class="font-sub"> 
            
            <span>Integation</span>
          </span>
        }>

            <Menu.Item >
              <Link to='/Trapezoidal'>Trapezoidal</Link>
            </Menu.Item>
            
        </SubMenu>
          </Menu>

          <Switch>
            <Route path='/bisec'>
              <Bisec />
            </Route>
            <Route path='/false'>
              <False />
            </Route>
            <Route path='/fix'>
              <Fix />
            </Route>
            <Route path='/newton'>
              <Newton />
            </Route>
            <Route path='/secant'>
              <Secant />
            </Route>
            

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
