import React, { Component } from 'react';
import { Input, Button, Table } from 'antd'
import { compile, abs } from 'mathjs'
import './Home.css'
const header = [

    {
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

class Bisec extends Component {
    state = {
        result: [],
        equation: "",
        Xr: 0,
        Xl: 0,
        output: 0,
        condition: "",
        Xm: 0,
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        var xl = this.state.Xl;
        xl = parseFloat(xl);
        var xr = this.state.Xr;
        xr = parseFloat(xr);
        var xo = xr;
        var check = parseFloat(0.000000);
        const code = compile(this.state.equation);
        let scopel = { x: xl };
        let scoper = { x: xr };
        var result1 = [];
        var i = 1;
        if (code.eval(scopel) * code.eval(scoper) < 0) {
            do {
                var xm = (xl + xr) / 2;
                let scopem = { x: xm };

                if (code.eval(scopel) * code.eval(scopem) < 0) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
                check = abs((xm - xo) / xm) * 100/100;
                result1.push({
                    'iteration': i,
                    'xl': xl,
                    'xr': xr,
                    'xm': xm,
                    'Error': check,
                });
                xo = xm;
                i++;
                console.log(check)
            } while (check > 0.00001);
        }
        this.setState({ result: result1 });
    }

    render() {
        return (
            <div className='bg'>
                <h2>Bisection Method </h2>
                <div className='inputbox'>
            
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation Ex : 2X+1" />
                    <Input name="Xr" onChange={this.input.bind(this)} placeholder="Xr" />
                    <Input name="Xl" onChange={this.input.bind(this)} placeholder="Xl" />
                    
                </div>
                <Button style={{  margin: "20px" }} type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                {<Table style={{ width: "900px", margin: "auto" }} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }

}


export default Bisec;