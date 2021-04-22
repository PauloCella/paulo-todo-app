import React from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';

export const SkeletonTable = () => {

    return (
        <DataTable value={Array(5)} className="p-datatable-striped" >
            <Column field="date" header="Date" body={() => <Skeleton />} />
            <Column field="title" header="Title" body={() => <Skeleton />} />
            <Column field="description" header="Description" body={() => <Skeleton />} />
            <Column field="finished" header="Finished" body={() => <Skeleton />} />
            <Column field="pinned" header="Pinned" body={() => <Skeleton />} />
        </DataTable>
    )

}