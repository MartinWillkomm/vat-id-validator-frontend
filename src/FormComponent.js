import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export default class FormComponent extends Component{
    constructor() {
        super();
        this.state = {
            vatId: null,
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
                console.log('callback::valid? ' + isVatIdValid);    
                if (isVatIdValid) {
                    this.setState({
                        errors: { 
                            vatIdValid: true,
                            vatIdInValid: false
                        }
                    });
                }
                else {
                    this.setState({
                        errors: { 
                            vatIdValid: false,
                            vatIdInValid: true
                        }
                    });
                }
            });
    }

    render() {
        return <Form>
            <Form.Group>
                <Form.Label>VAT ID</Form.Label>
                <Form.Control autoFocus id="vat-id-input" isInvalid={this.state.errors.vatIdInValid} isValid={this.state.errors.vatIdValid} value={this.state.vatId} type="text" placeholder="Please enter vat id" onChange={this.handleChange} />
                <Form.Text className="text-muted">
                Currently supported countries are: DE, AT, GB, FR, DK, NL
                </Form.Text>
                <Button className="Button-right" onClick={this.validateInput} size="lg">Validate</Button>
            </Form.Group>
        </Form>
    }


    
}
