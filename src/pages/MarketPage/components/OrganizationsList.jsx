import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import React from 'react';

export const OrganizationsList = props =>{
    return (
        props.organizations?.length > 0 ? (
            props.organizations.map((org, index) => {
                return (
                    <div key={index} className="p-card p-p3 p-mb-3 p-d-flex p-jc-between">
                        <div>
                            <h5><b>{org.name}</b></h5>
                            <p>
                                <span className="p-d-block">{org.type}</span>
                                <span className="p-d-block">{`${org.region} - ${org.currency}`}</span>
                            </p>
                            <Tag icon="pi pi-clock" value={org.marketOpen} severity="success" className="p-mr-2" />
                            <Tag icon="pi pi-clock" value={org.marketClose} severity="danger" />
                        </div>
                        <div className="p-d-flex p-flex-column p-jc-between p-ai-end" >
                            <h6><b>{org.symbol}</b></h6>
                            <Button
                                label="SEE MORE"
                                iconPos="right"
                                icon="pi p-angle-right"
                                className="p-button-text p-button-sm"
                                onClick={() => props.history.push(`/market/company?symbol=${org.symbol}`)}
                            />
                        </div>
                    </div>
                )
            })
        ) : (
            <div className="p-text-center">No data found</div>
        )
    )
}