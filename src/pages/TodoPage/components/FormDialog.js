import React from 'react';

import { FirestoreMutation } from '@react-firebase/firestore';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Chips } from 'primereact/chips';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Formik } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import { subDays } from 'date-fns';

const initialValues = {
    id: '',
    title: '',
    description: '',
    dateToFinish: '',
    categories: [],
    finished: false,
    pinned: false,
    details: '',
};


const CreateTaskSchema = Yup.object().shape({
    title: Yup.string()
        .min(10, "Field can't be too short")
        .max(100, "Field can't be too long")
        .required("Field can't be empty"),

    dateToFinish: Yup.date()
        .required("Field can't be empty")
        .nullable("Field can't be empty")
        .min(subDays(new Date(), 1), "Date can't be before now")
        

})

export const FormDialog = props => {
    const { visible, onHide, taskSelected } = props;
    return (
        <Dialog
            header="Create a new task"
            visible={visible}
            onHide={onHide}
            breakpoints={{ '1024px': '80vw', '640px': '100vw' }}
            style={{ width: '50vw' }}
            maximizable
            modal
            baseZIndex={2000}
        >

            <FirestoreMutation
                type={taskSelected ? 'update' : 'add'}
                path={taskSelected ? `/tasks/${taskSelected.id}` : "/tasks"}
            >

                {({ runMutation }) => (
                    <Formik
                        initialValues={taskSelected || initialValues}
                        onSubmit={values => {
                            runMutation(values).then(() => {
                                onHide();
                            })
                        }}

                        validationSchema={CreateTaskSchema}
                        validate={values => { }}
                        validateOnChange={false}
                        
                    >
                        {({ values, setFieldValue, handleSubmit, errors }) => {
                            return (
                                <>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col-12 p-md-7">
                                            <label htmlFor="title">Title</label>
                                            <InputText
                                                className={ errors.title && "p-invalid"}
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={values.title}
                                                onChange={e => setFieldValue('title', e.target.value)}
                                            />

                                            {errors.title && <small className="p-error p-d-block">{errors.title}</small>}

                                        </div>
                                        <div className="p-field p-col-12 p-md-5">
                                            <label htmlFor="dateToFinish">Date To Finish</label>
                                            <Calendar
                                                id="dateToFinish"
                                                name="dateToFinish"
                                                className={ errors.dateToFinish && "p-invalid"}
                                                value={values.dateToFinish}
                                                onChange={e => setFieldValue('dateToFinish', e.value)}
                                                showIcon
                                                touchUI
                                                monthNavigator
                                                yearNavigator
                                                yearRange="2000:2100"
                                            />
                                            {errors.dateToFinish && <small className="p-error p-d-block">{errors.dateToFinish}</small>}
                                        </div>
                                        <div className="p-field p-col-12 ">
                                            <label htmlFor="description">Description</label>
                                            <InputText
                                                id="description"
                                                type="text"
                                                name="description"
                                                value={values.description}
                                                onChange={e => setFieldValue('description', e.target.value)}
                                            />
                                        </div>

                                        <div className="p-field p-col-12 ">
                                            <label htmlFor="categories">Categories</label>
                                            <Chips
                                                id="categories"
                                                name="categories"
                                                value={values.categories}
                                                onChange={e => setFieldValue('categories', e.value)}
                                                separator=","
                                            />
                                        </div>
                                        <div className="p-field p-col-12 ">
                                            <label htmlFor="details">Details</label>
                                            <InputTextarea
                                                value={values.details}
                                                type="text"
                                                rows="5"
                                                name="details"
                                                onChange={e => setFieldValue('details', e.target.value)}
                                            />
                                        </div>
                                        <div className="p-field p-col-12  p-mb-0">
                                            <div className="p-formgroup-inline">
                                                <div className="p-field-checkbox">
                                                    <Checkbox
                                                        inputId="finished"
                                                        name="finished"
                                                        value={values.finished}
                                                        onChange={() => setFieldValue('finished', !values.finished)}
                                                        checked={values.finished}
                                                    />
                                                    <label htmlFor="finished">Finish</label>
                                                </div>
                                                <div className="p-field-checkbox">
                                                    <Checkbox
                                                        inputId="pinned"
                                                        name="pinned"
                                                        value={values.pinned}
                                                        onChange={() => setFieldValue('pinned', !values.pinned)}
                                                        checked={values.pinned}
                                                    />
                                                    <label htmlFor="pinned">Pinned</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-d-flex p-jc-end">
                                        <Button
                                            className="p-button-outlined p-button-secondary p-mr-2"
                                            icon="pi pi-times"
                                            label="Calcel"
                                            onClick={onHide}
                                        />
                                        <Button
                                            icon="pi pi-check"
                                            label="Save task"
                                            onClick={handleSubmit}
                                        />

                                    </div>
                                </>
                            )
                        }}

                    </Formik>
                )}

            </FirestoreMutation>

        </Dialog>
    )
}
