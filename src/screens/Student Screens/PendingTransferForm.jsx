import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../helpers/Controls';
import { useForm, Form } from '../../helpers/useForm';
import { isAuth } from '../../helpers/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialFValues = {
    id: 0,
    from: '',
    to: '',
    amount: '',
    date: Date()
}

export default function PendingTransferForm(props) {
    const { activityName, amount } = props

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
    } = useForm(initialFValues, true, validate);

    useEffect(() => {
        loadSender();
    }, []);

    const loadSender = () => {
        initialFValues.from = isAuth().name;
        initialFValues.to = activityName
        initialFValues.amount = amount
    };

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            axios.post(
                `${process.env.REACT_APP_API_URL}/student/enrollActivity/${isAuth()._id}`,
                {
                    activityName
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