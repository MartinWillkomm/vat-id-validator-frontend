import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { REST_SERVICE_URL_PROD } from '../constants/Constants';
import { REST_SERVICE_URL_DEV } from '../constants/Constants';


export default class VatIdValidationForm extends Component{
    constructor() {
        super();
        this.state = {
            vatId: '',
            errors: {
                /* the Form.Control does not only have two states, it has three: 
                false/false -> no highlight; true/false -> green; false/true -> red; */ 
                vatIdValid: false,
                vatIdInValid: false,
                restserviceMessage: ''
            },
        };  
        this.validateInput = this.validateInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
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
        if (this.state.vatId == '') {
            return;
        }
        var validationUrl = REST_SERVICE_URL_PROD + this.state.vatId;
        console.log('validating input:' + validationUrl);
        
        fetch(validationUrl, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((validationResult) => {
            if (!validationResult.errorOccurred) {
                this.setState({
                    errors: { 
                        vatIdValid: validationResult.result,
                        vatIdInValid: !validationResult.result,
                        restserviceMessage: ''
                    }
                });
            }
            else {
                console.log('errors occurred, reason: ' + validationResult.message);
                this.setState({
                    errors: { 
                        vatIdValid: false,
                        vatIdInValid: false,
                        restserviceMessage: validationResult.message
                    }
                });
            }
        });
    }

    render() {
        return <Form onSubmit={this.onFormSubmit}>
            <Form.Group>
                <Form.Label>Enter VAT-ID to validate</Form.Label>
                <Form.Control autoFocus id="vat-id-input" isInvalid={this.state.errors.vatIdInValid} isValid={this.state.errors.vatIdValid} value={this.state.vatId} type="text" placeholder="Please enter vat id" onChange={this.handleChange} />
                <Form.Text muted>
                Currently supported countries are: DE, AT, GB, FR, DK, NL
                </Form.Text>
                <Form.Control.Feedback>VAT-ID is valid!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">VAT-ID is not valid, please check input.</Form.Control.Feedback>
                <Form.Text style={{backgroundColor: "white", color: "firebrick", maxWidth: "50em"}}>{this.state.errors.restserviceMessage}</Form.Text>
                <Button className="Button-right" onClick={this.validateInput}>Validate</Button>
            </Form.Group>
        </Form>
    }


    
}
