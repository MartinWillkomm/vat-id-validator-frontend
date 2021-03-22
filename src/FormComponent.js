import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export default class FormComponent extends Component{
    constructor() {
        super();
        this.state = {
            vatId: '',
            errors: {
                vatIdValid: false,
                vatIdInValid: false
            }
        };  
        this.validateInput = this.validateInput.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        this.setState({
            vatId: event.target.value
        });
    }

    validateInput() {
        var validationUrl = "http://localhost:8080/api/validation/v1/vatid/" + this.state.vatId;
        console.log('validating input:' + validationUrl);
        
            fetch(validationUrl, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((isVatIdValid) => {
                console.log('callback::valid? ' + isVatIdValid + " - " + typeof isVatIdValid);    
                this.setState({
                    errors: { 
                        vatIdValid: isVatIdValid,
                        vatIdInValid: !isVatIdValid
                    }
                });
            });
    }

    render() {
        return <Form>
            <Form.Group>
                <Form.Label>Enter VAT-ID to validate</Form.Label>
                <Form.Control autoFocus id="vat-id-input" isInvalid={this.state.errors.vatIdInValid} isValid={this.state.errors.vatIdValid} value={this.state.vatId} type="text" placeholder="Please enter vat id" onChange={this.handleChange} />
                <Form.Control.Feedback>VAT-ID is valid!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">VAT-ID is not valid. Please check input.</Form.Control.Feedback>
                <Form.Text className="text-muted">
                Currently supported countries are: DE, AT, GB, FR, DK, NL
                </Form.Text>
                <Button className="Button-right" onClick={this.validateInput} size="lg">Validate</Button>
            </Form.Group>
        </Form>
    }


    
}
