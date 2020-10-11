import axios from 'axios';
import { toast } from 'react-toastify';

export function insertBidTransfer(data) {
    console.log(data)
    axios.post(`${process.env.REACT_APP_API_URL}/student/bidActivity`,
        {
            student: data.student,
            activity: data.activity,
            amount: data.amount,
            transferDate: data.transferDate
        })
        .then(res => {
            console.log(res)
            toast.success(res.data.message);
        })
        .catch(err => {
            console.log(err.response);
            toast.error(err.response.data.error);
            toast.error(err.response.data.errors);
        });
}

export function updateCoinsAmount(data) {
    console.log('service')

    console.log(data)

    axios.put(`${process.env.REACT_APP_API_URL}/updateCoins`,
        {
            student: data.student,
            activity: data.activity,
            amount: parseInt(data.amount),
            transferDate: data.transferDate
        })
        .then(res => {
            console.log(res)
            toast.success(res.data.message);
        })
        .catch(err => {
            console.log(err.response);
            toast.error(err.response.data.error);
            toast.error(err.response.data.errors);
        });
}