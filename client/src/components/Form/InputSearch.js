import React from "react";
import {Button} from "./Button";
import {Row, Column} from "../Grid";
import { PromiseProvider } from "mongoose";
/** Export the input as a variable */
export const InputSearch = props =>
    <Row>
        <form>
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
                        type="submit"
                        onClick={props.searchFunctionality}
                    >
                        Search
                    </Button>
                </Column>
            </Row>
        </form>
    </Row>