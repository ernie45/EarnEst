import React from "react";
import {Button} from "./Button";
import {Row, Column} from "../Grid";
/** Export the input as a variable */
export const InputSearch = props =>
    <Row>
        <Row>
            <Column size="xs-12">
                <label>{props.heading}</label>
            </Column>
        </Row>
        <Row>
            <Column size="xs-8">
                <input className="form-control" {...props}/>
            </Column>
            <Column size="xs-4">
                <Button
                    onClick={props.searchFunctionality}
                >
                    Search
                </Button>
            </Column>
        </Row>
    </Row>