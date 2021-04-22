import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react';

export const SearchSymbol = props => {
    return (
        <div className="p-field">
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search"></i>
                </span>
                <InputText
                    id="symbol"
                    autoFocus
                    value={props.value}
                    onChange={props.onChange}
                    aria-describedby="symbol-help"
                    className="p-d-block"
                    placeholder="Enter a symbol (Exemple: IBM , TSLA)"
                />
                <Button
                    label="Search"
                    icon="pi pi-search"
                    onClick={props.onSearchClick}
                />
            </div>
            <small id="symbol-help" className="p-d-block">Enter a symbol and click on search button</small>
        </div>
    )
}