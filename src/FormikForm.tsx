import React from 'react';
import { Formik, Form, Field, FormikHelpers, FormikErrors, FormikTouched, FieldArray, FieldArrayRenderProps } from 'formik';
/* import * as Yup from 'yup';
let yup = require('yup'); 
*/

interface FormValues {
    name: string;
    repo: {
        url: string;
        type: string;
    };
    labels: Array<{ name: string; value: string }>;
}

export default function FormikForm({ value }) {
    // console.log('k ho' + value.name);
    var myJSON = JSON.stringify(value);
    const initialValues: FormValues = {
        name: value[Object.keys(value)[1]],
        repo: {
            url: value[Object.keys(value)[3]],
            type: value[Object.keys(value)[2]],
        },
        labels: [],
    };

    const validate = (values: FormValues): FormikErrors<FormValues> => {
        //console.log('validate', values);
        const errors: FormikErrors<FormValues> & { repo: {} } = {
            repo: {},
        };

        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!values.repo.url) {
            errors.repo.url = 'Repo URL is required';
        }
        if (!values.repo.type) {
            errors.repo.type = 'Repo type is required';
        }

        return errors;
    }

    const onSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        // console.log('formik submit', values);
        // console.log('formik submit', helpers);
    }

    return (
        <>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
                {(formikProps) => {

                    const resetForm = () => {
                        formikProps.resetForm();
                    }

                    const setTouched = (touched: FormikTouched<FormValues>, shouldValidate?: boolean) => {
                        const prevTouched = formikProps.touched;
                        const mergedTouched: FormikTouched<FormValues> = {
                            // Override if new touched is set, fallback to previous value
                            name: touched.name ?? prevTouched.name,
                            repo: { ...prevTouched.repo, ...touched.repo },
                            // Simple, because we do not manually switch this:
                            labels: prevTouched.labels,
                        };
                        formikProps.setTouched(mergedTouched, shouldValidate);
                    }

                    return (
                        <Form>
                            <p>
                                <label>
                                    Name:<br />
                                    <Field type="text" name="name" label="name" required />
                                </label>
                            </p>
                            <p>
                                <label>
                                    URL:<br />
                                    <Field type="text" name="repo.url" label="url" required />
                                </label>
                            </p>
                            <p>
                                <label>
                                    Type:<br />
                                    <Field type="text" name="repo.type" label="type" required />
                                </label>
                            </p>
                            <p>
                                <label>Labels:</label><br />
                                <FieldArray name="labels">
                                    {(fieldArrayProps: FieldArrayRenderProps) => {
                                        return (
                                            <>
                                                {formikProps.values.labels.map((_, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {index + 1}.
                                                        <Field type="text" name={`labels.${index}.name`} />
                                                            <Field type="text" name={`labels.${index}.value`} />
                                                            <button type="button" onClick={() => fieldArrayProps.remove(index)}>Remove</button>
                                                            {formikProps.touched.labels ?.[index] ?.name ? 'Name touched' : ''}
                                                            <br />
                                                        </React.Fragment>
                                                    );
                                                })}
                                                <button type="button" onClick={() => fieldArrayProps.push({
                                                    name: '',
                                                    value: '',
                                                })}>Add label</button>
                                            </>
                                        );
                                    }}
                                </FieldArray>
                            </p>
                            <p>
                                <button type="button" onClick={resetForm}>Reset form</button>
                                <button type="submit">Submit</button>
                            </p>
                            <div style={{ border: '1px solid white', padding: '1em' }}>
                                <div className="items">
                                    <h3>Name: {JSON.stringify(formikProps.values.name)}
                                        <span className="namespan">
                                            <button type="button" style={{ border: 'none', color: 'blue', backgroundColor: '#e0e0e0' }}>Edit</button>
                                        </span></h3>
                                </div>
                                <div className="items">
                                    <h3>Url: {JSON.stringify(formikProps.values.repo.url)}
                                        <span className="namespan">
                                            <button type="button" style={{ border: 'none', color: 'blue', backgroundColor: '#e0e0e0' }}>Edit</button>
                                        </span>
                                    </h3>
                                </div>
                                <div className="items">
                                    <h3>Type: {JSON.stringify(formikProps.values.repo.type)}
                                        <span className="namespan">
                                            <button type="button" style={{ border: 'none', color: 'blue', backgroundColor: '#e0e0e0' }}>Edit</button>
                                        </span>
                                    </h3>
                                </div>
                            </div>
                            <p>
                                isSubmitting: {JSON.stringify(formikProps.isSubmitting)}<br />
                                isValidating: {JSON.stringify(formikProps.isValidating)}<br />
                                status: {JSON.stringify(formikProps.status)}<br />
                                submitCount: {JSON.stringify(formikProps.submitCount)}
                            </p>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}
