import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../../helpers/Controls';
import { useForm, Form } from '../../../helpers/useForm';
import { isAuth } from '../../../helpers/auth';

const initialFValues = {
    id: 0,
    from: '',
    to: '',
    amount: '',
    date: Date()
}

export default function Bid2Form(props) {
    const { bid,activityName } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('to' in fieldValues)
            temp.to = fieldValues.to ? "" : "This field is required."
        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount ? "" : "This field is required."
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    useEffect(() => {
        loadSender();
    }, []);

    const loadSender = () => {
        initialFValues.from = isAuth().name;
        initialFValues.to = activityName
    };

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            bid(values, resetForm);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Controls.Input
                    name="from"
                    label="Sender"
                    value={values.from}
                    onChange={handleInputChange}
                    error={errors.from}
                    disabled={true}
                />
                <Controls.Input
                    name="to"
                    label="Receiver"
                    value={values.to}
                    onChange={handleInputChange}
                    error={errors.to}
                    disabled={true}
                />
                <Controls.Input
                    name="amount"
                    label="Amount"
                    value={values.amount}
                    onChange={handleInputChange}
                    error={errors.amount}
                />
                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit" />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm} />
                </div>
            </Grid>
        </Form>
    )
}