import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';



export default class FormComponent extends Component{
    constructor() {
        super();
        this.state = {
            vatId: null,
            hasError: false,
            errors: {
                vatId: '',
            }
        };  
        this.validateInput = this.validateInput.bind(this)
        //const vatId = 1234;
    }
        
    validateInput() {
        console.log('state: ' + this.state.vatId);
        var validationUrl = "http://localhost:8080/api/validation/v1/vatid/" + this.state.vatId;
        console.log('validating input:' + validationUrl);
        
            fetch(validationUrl, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((result) => {
                 //this.setState({ location: location });
                console.log('callback: ' + result);    
            });
    }

    render() {
        return <Form onSubmit="">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>VAT ID</Form.Label>
                <Form.Control id="vat-id-input" value={this.state.vatId} type="text" placeholder="Please enter vat id" />
                <Form.Text className="text-muted">
                Currently supported countries are: DE, AT, GB, FR, DK, NL
                </Form.Text>
                <Button className="Button-right" onClick={this.validateInput} size="lg">Validate</Button>
            </Form.Group>
        </Form>
    }


    
}
