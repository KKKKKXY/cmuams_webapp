import axios from 'axios';
import { toast } from 'react-toastify';

const KEYS = {
    transfers: 'transfers',
    transferId: 'transferId'
}

//Round 1
export function insert1stTransfer(data) {
    data['id'] = generate1stTransferId()

    axios.post(`${process.env.REACT_APP_API_URL}/student/firstBidRound`,
        {
            id: data.id,
            from: data.from,
            to: data.to,
            amount: data.amount,
            date: data.date
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

export function generate1stTransferId() {
    let alltransfer = get1stAllTransfers()
    let lastTransfer = alltransfer[alltransfer.length - 1]
    let id = lastTransfer.id

    if (id == null || -1) {
        id = 0
    }

    return id + 1;
}

export function get1stAllTransfers() {

    axios.get(`${process.env.REACT_APP_API_URL}/firstBidRoundTransfer`)
        .then(response => {
            KEYS.transfers = response.data
        })
        .catch((error) => {
            console.log(error);
        })
    return KEYS.transfers;
}

//Round 2
export function insert2ndTransfer(data) {
    data['id'] = generate2ndTransferId()
    axios.post(`${process.env.REACT_APP_API_URL}/student/secondBidRound`,
        {
            id: data.id,
            from: data.from,
            to: data.to,
            amount: data.amount,
            date: data.date
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

export function generate2ndTransferId() {
    let alltransfer = get2ndAllTransfers()
    let lastTransfer = alltransfer[alltransfer.length - 1]
    let id = lastTransfer.id

    if (id == null || -1) {
        id = 0
    }

    return id + 1;
}

export function get2ndAllTransfers() {

    axios.get(`${process.env.REACT_APP_API_URL}/secondBidRoundTransfer`)
        .then(response => {
            KEYS.transfers = response.data
        })
        .catch((error) => {
            console.log(error);
        })
    return KEYS.transfers;

}