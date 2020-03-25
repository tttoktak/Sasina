import React, { Component } from 'react';
import {Input,Button,Table} from 'antd'
import {compile,abs,derivative} from 'mathjs'

import './Home.css'

const header = [{
    title: 'xreal',
    dataIndex: 'xreal'
}, {
    title: 'output',
    dataIndex: 'output'
}, {
    title: 'Error',
    dataIndex: 'Error',
}]

class Oh2 extends Component {
    state = {
        result:[],
        equation: "",
        X:"",
        N:"",
        H:"",
        output: 0,
        condition: "",
    }
    input = (e) => {
        this.setState({[e.target.name]:e.target.value},console.log(this.state))
    }
    compute = () => {
        var x = this.state.X;
        x = parseFloat(x);
        var n = this.state.N;
        n = parseFloat(n);
        var h = this.state.H;
        console.log("this is a", x,h,n)

        var eq = this.state.equation;
        const code = compile(this.state.equation);
        var diff = eq;

        var result1 = [];
        let fx0 = {
            x : x
        };
        let fx1 = { 
            x : x-h
        };
        let fx2 = {
            x : x-(2*h)
        };
        let fx3 = {
            x : x-(3*h)
        };
        let fx4 = {
            x : x-(4*h)
        };
        let fx5 = {
            x : x-(5*h)
        };
        let scope = {
            x:x
        };

        let fxp1 = {
            x : x+h
        };
        let fxp2 = {
            x : x+(2*h)
        };
     

   
        for (var i=1;i<=n;i++){
            var diff = derivative(diff,'x');
        }
        if(n===1){
            var output = ((code.evaluate(fxp1))-(code.evaluate(fx1)))/(2*h);
        }      
        else if(n===2){
            output = ((code.evaluate(fxp1))-(2*code.evaluate(fx0))+(code.evaluate(fxp1))-code.evaluate(fx3))/(h*h);
        }
        else if(n===3){
            output = ((code.evaluate(fxp2))-(2*code.evaluate(fxp1))+(2*code.evaluate(fx1))-(code.evaluate(fx2)))/((h*h*h)*2);
        }
        else {
            output = ((3*code.evaluate(fx0)) - (14*code.evaluate(fx1)) + (26*code.evaluate(fx2)) - (24*code.evaluate(fx3)) + (11*code.evaluate(fx4)) - (2*code.evaluate(fx5))) / (h*h*h*h);
        }

        var xreal = diff.evaluate(x);
        console.log(xreal)
        var check = abs((xreal- output) / xreal)*100;
        console.log("error is",check)
                result1.push({
                    'xreal': xreal,
                    'output': output,
                    'Error':check,
                });
        this.setState({ result: result1 });
    }


render() {
    return (
        <div className='bg'>
        <h2>Oh^2</h2>
        <div className='inputbox'>
    
            <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
            <Input name="X" onChange={this.input.bind(this)} placeholder="X" />
            <Input name="N" onChange={this.input.bind(this)} placeholder="N" />
            <Input name="H" onChange={this.input.bind(this)} placeholder="H" />

            
        </div>
        <Button style={{  margin: "20px" }} type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
        {<Table style={{ width: "900px", margin: "auto" }} dataSource={this.state.result} columns={header} pagination={false} />}
        </div>
    );
}
}

export default Oh2;