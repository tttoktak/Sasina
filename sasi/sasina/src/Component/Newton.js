import React, { Component } from 'react';
import { Input, Button,Table } from 'antd'
import { compile, abs,derivative } from 'mathjs'
import './Home.css'
const header = [{
    title: 'Iteration',
    dataIndex: 'iteration'
}, {
    title: 'Xnew',
    dataIndex: 'xnew',
}, {
    title: 'Error',
    dataIndex: 'Error',
}]
class Newton extends Component {
    state = {
        result:[],
        equation: "",
        X: 0,
        output: 0,
        condition: "",
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {     
        var x = this.state.X;
        x = parseFloat(x);
        var eq = this.state.equation;
        const code = compile(this.state.equation);
        var diff = eq;
        var result1 = [];
        var i = 1;
        var diffX = derivative(diff,'x');
        console.log(diffX)
            do {
                let scope = {
                    x:x
                };
                var xreal = diffX.evaluate(scope);
                console.log(xreal)
                var xnew = x - (code.evaluate(scope)/xreal); 
                var check=abs((xnew-x)/xnew)*100;
                result1.push({
                    'iteration': i,
                    'xnew': xnew,
                    'Error': check,
                });
                x= xnew;
                i++; 
            } while (check > 0.000001);
        this.setState({ result: result1 });
    }
    render() {
        return (
            <div className='bg'>
                <h2>Newton Rapson </h2>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
                    <Input name="X" onChange={this.input.bind(this)} placeholder="X" />
                    
                </div>
                <Button style={{  margin: "20px" }} type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}
export default Newton;