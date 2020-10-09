import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../../helpers/Controls';
import { useForm, Form } from '../../../helpers/useForm';
import { isAuth } from '../../../helpers/auth';
import { toast } from 'react-toastify';


const initialFValues = {
    id: 0,
    from: '',
    to: '',
    amount: '',
    date: Date()
}

export default function BidForm(props) {
    const { bid, options } = props

    const filterOption = (options) => {
        let filterOptions = []

        // const myDate = new Date(options[3].bidRound1Time);
        // const newDate = new Date(myDate);
        // console.log(myDate<=new Date());
        // console.log(new Date(newDate.setHours(newDate.getHours() + 1))>=new Date());
        // console.log('--------------hahahahah------------')

        // console.log(new Date())
        // for(var i = 0; i < options.length; i++) {
        //     console.log('Round 1 Activity ' + options[i].name + '' + new Date(options[i].bidRound1Time))
        //     console.log('Round 2 Activity ' + options[i].name + '' + (new Date(new Date(new Date(options[i].bidRound1Time)).setHours(new Date(new Date(options[i].bidRound1Time)).getHours() + 1))))


        // }console.log('--------------------------')

        filterOptions = options.filter(option =>
            (new Date(option.bidRound1Time) <= new Date()) && (new Date(new Date(new Date(option.bidRound1Time)).setHours(new Date(new Date(option.bidRound1Time)).getHours() + 1))) >= new Date())
        return filterOptions;
    }

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
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values.amount)
        if (validate() && (isAuth().coins >= values.amount)) {
            bid(values, resetForm);
        }
        else{
            toast.warning('Your coins is not enough !');
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
                <Controls.Select
                    name="to"
                    label="Receiver"
                    value={values.to}
                    onChange={handleInputChange}
                    options={filterOption(options)}
                    error={errors.to}
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