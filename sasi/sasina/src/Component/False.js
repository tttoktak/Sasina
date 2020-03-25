import React, { Component } from 'react';
import { Input, Button,Table } from 'antd'
import axios from 'axios';
import './Home.css'
const header = [{
    title: 'Iteration',
    dataIndex: 'iteration'
}, {
    title: 'XL',
    dataIndex: 'xl'
}, {
    title: 'XR',
    dataIndex: 'xr'
}, {
    title: 'XM',
    dataIndex: 'xm',
}, {
    title: 'Error',
    dataIndex: 'Error',
}]
export default class False extends Component {
    state = {
        result:[],
        equation: "",
        Xr: 0,
        Xl: 0,
        output: 0,
        Xm: 0,
    }
    input = (e) => 
    {
        this.setState({ [e.target.name]: e.target.value })
    }
    cal = () =>
     {
        axios
        .post("http://localhost:8000/false1/false1", {
         xl :parseFloat(this.state.Xl),
         xr :parseFloat(this.state.Xr),
         equation: this.state.equation
        })
        .then(res => {
          this.setState({result:res.data.result})
            console.log(this.state.result)
        })
        .catch(err => {
          console.log(err);
        });
    }
    

    render() {
        return (
            <div className='bg'>
                <h2>False Position Method</h2>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation Ex : 2X+1" />
                    <Input name="Xr" onChange={this.input.bind(this)} placeholder="Xr" />
                    <Input name="Xl" onChange={this.input.bind(this)} placeholder="Xl" />
                    
                </div>
                <Button style={{  margin: "20px" }} class="bg" type="primary" size="large" onClick={this.cal.bind(this)}>Submit</Button>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

