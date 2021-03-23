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
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    handleChange = event => {
        this.setState({
            vatId: event.target.value
        });
    }

    /**
     * this is just to override and catch the 'return' key event on the Form.Control, 
     * which would re-render the page. by "handling" it this way, it
     * won't re-render and loose the input, but instead validate the input, which
     * is what the user wants.
     */
    onFormSubmit = e => {
        e.preventDefault();
        this.validateInput();
    }

    validateInput() {
        var validationUrl = "https://vat-id-validator-backend.herokuapp.com/api/validation/v1/vatid/" + this.state.vatId;
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
        return <Form onSubmit={this.onFormSubmit}>
            <Form.Group>
                <Form.Label>Enter VAT-ID to validate</Form.Label>
                <Form.Control autoFocus id="vat-id-input" isInvalid={this.state.errors.vatIdInValid} isValid={this.state.errors.vatIdValid} value={this.state.vatId} type="text" placeholder="Please enter vat id" onChange={this.handleChange} />
                <Form.Control.Feedback>VAT-ID is valid!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">VAT-ID is not valid. Please check input.</Form.Control.Feedback>
                <Form.Text className="text-muted">
                Currently supported countries are: DE, AT, GB, FR, DK, NL
                </Form.Text>
                <Button className="Button-right" onClick={this.validateInput}>Validate</Button>
            </Form.Group>
        </Form>
    }


    
}
