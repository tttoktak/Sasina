import React, { Component } from 'react';
import { Input, Button, Table } from 'antd'
import { compile, abs,derivative } from 'mathjs'
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

class Bwoh extends Component {
    state = {
            result:[],
            equation:"",
            X: "",
            N: 0,
            H: 0,
            output: 0,
            condition: "",
        } 

    input = (e) => {
        this.setState({[e.target.name]:e.target.value},console.log(this.state))
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

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
            x:x
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
        let scope = {
                x:x
        };

        for (var i=1;i<=n;i++){
            var diff = derivative(diff,'x');
        }
        if(n===1){
            var  output = ((code.evaluate(fx0)) - (code.evaluate(fx1))) / h;
            console.log(output) 
        }      
        else if(n===2){
            output = ((code.evaluate(fx0)) - (2*code.evaluate(fx1)) + (code.evaluate(fx2))) / (h*h);
        }
        else if(n===3){
            output = ((code.evaluate(fx0)) - (3*code.evaluate(fx1)) + (3*code.evaluate(fx2)) - (code.evaluate(fx3))) / (h*h*h);
        }
        else {
            output = ((code.evaluate(fx0)) - (4*code.evaluate(fx1)) + (6*code.evaluate(fx2)) - (4*code.evaluate(fx3)) + (code.evaluate(fx4))) / (h*h*h*h);
        }
        var xreal = diff.evaluate(scope); 
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
                <h2>Bw (oh)</h2>
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
export default Bwoh;
