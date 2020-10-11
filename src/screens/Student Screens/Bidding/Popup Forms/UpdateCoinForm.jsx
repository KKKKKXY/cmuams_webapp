import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../../../helpers/Controls'
import { useForm, Form } from '../../../../helpers/useForm';
import { isAuth, activityId } from '../../../../helpers/auth';
import { toast } from 'react-toastify';


const initialFValues = {
    _id: '',
    student: '',
    activity: '',
    amount: '',
    transferDate: Date(),
}

export default function UpdateCoinForm(props) {
    const { bid, activityName } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
        initialFValues.student = isAuth().name;
        initialFValues.activity = activityName
        initialFValues._id = activityId()._id;
    };

    const handleSubmit = e => {
        e.preventDefault()
        if (validate() && (isAuth().coins >= values.amount)) {
            bid(values, resetForm);
        }
        else {
            toast.warning('Your coins is not enough !');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Controls.Input
                    name="student"
                    label="Sender"
                    value={values.student}
                    onChange={handleInputChange}
                    error={errors.student}
                    disabled={true}
                />
                <Controls.Input
                    name="activity"
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