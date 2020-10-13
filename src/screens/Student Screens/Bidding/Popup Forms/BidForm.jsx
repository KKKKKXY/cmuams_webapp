import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../../../helpers/Controls'
import { useForm, Form } from '../../../../helpers/useForm';
import { activityId, isAuth } from '../../../../helpers/auth';
import { toast } from 'react-toastify';


const initialFValues = {
    student: '',
    activity: '',
    amount: '',
    transferDate: Date(),
}

export default function BidForm(props) {
    const { bid, options } = props

    const filterOption = (options) => {
        let filterOptions = []
        filterOptions = options.filter(option =>
            (new Date(option.bidDate) <= new Date()) && (new Date(new Date(new Date(option.bidDate)).setHours(new Date(new Date(option.bidDate)).getHours() + 1))) >= new Date())
        return filterOptions;
    }

    const amountValidator = (amount) => {
        if (/^[1-9]*$/.test(amount)){
            return null
        }
        else if (/^[0]*$/.test(amount)){
            return "Amount is invalid"
        }
        else{
            return "Amount must be a digital"
        }
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('activity' in fieldValues)
            temp.activity = fieldValues.activity ? "" : "This field is required."
        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount ? "" : "This field is required."
        // if ('amount' in fieldValues)
        //     temp.amount = amountValidator(values.amount)

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

    };

    const handleSubmit = e => {
        e.preventDefault()

        if (validate() && (isAuth().coins >= values.amount)) {
            bid(values, resetForm);
        }
        else if (isAuth().coins < values.amount){
            toast.warning('Your coins is not enough !');
        }
        else {
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
                <Controls.Select
                    name="activity"
                    label="Bid Activity Name"
                    value={values.activity}
                    onChange={handleInputChange}
                    options={filterOption(options)}
                    error={errors.activity}
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