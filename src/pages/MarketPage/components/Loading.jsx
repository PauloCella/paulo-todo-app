import { Skeleton } from 'primereact/skeleton';
import React from 'react';

export const Loading = () => {
    return (
        <div className="p-fluid">
            <div className="p-mb-3">
                <div className="p-d-flex p-ai-center">
                    <Skeleton shape="circle" size="4rem" className="p-mr-2"></Skeleton>
                    <div style={{ flex: '1' }}>
                        <Skeleton width="100%" className="p-mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    )
}