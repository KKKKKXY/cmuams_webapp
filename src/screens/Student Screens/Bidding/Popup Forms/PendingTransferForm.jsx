import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../../../helpers/Controls'
import { useForm, Form } from '../../../../helpers/useForm';
import { isAuth } from '../../../../helpers/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialFValues = {
    student: '',
    activity: '',
    amount: '',
    transferDate: Date(),
}

export default function PendingTransferForm(props) {
    const { activityName, amount } = props

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFValues, true);

    useEffect(() => {
        loadTransferInfo();
    }, []);

    const loadTransferInfo = () => {
        initialFValues.student = isAuth().name;
        initialFValues.activity = activityName
        initialFValues.amount = amount
    };

    const handleSubmit = e => {
        console.log(values)

        e.preventDefault()
            axios.post(
                `${process.env.REACT_APP_API_URL}/student/enrollActivity`,
                {
                    student: values.student,
                    activity: values.activity,
                    amount: values.amount,
                    transferDate: values.transferDate
                })
                .then(res => {
                    toast.success(res.data.message);
                })
                .catch(err => {
                    console.log(err.response);
                    toast.error(err.response.data.error);
                    toast.error(err.response.data.errors);
                });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Controls.Input
                    name="from"
                    label="Sender"
                    value={values.student}
                    onChange={handleInputChange}
                    error={errors.student}
                    disabled={true}
                />
                <Controls.Input
                    name="to"
                    label="Receiver"
                    value={values.activity}
                    onChange={handleInputChange}
                    error={errors.activity}
                    disabled={true}
                />
                <Controls.Input
                    name="amount"
                    label="Amount"
                    value={values.amount}
                    onChange={handleInputChange}
                    error={errors.amount}
                    disabled={true}
                />
                <Controls.Button
                    type="submit"
                    text="Confirm"
                />

            </Grid>
        </Form>
    )
}