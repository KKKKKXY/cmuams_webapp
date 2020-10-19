import Enzyme from 'enzyme';
import { cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup)
const XingyuanKang = {
    "role": "student",
    "enrolled": [
        {
            "students": [],
            "_id": "5f8727d3c9440dc754ec4874",
            "activityName": "Doi Suthep",
            "description": "The activity improve students teamwork ability.",
            "activityDate": "2020-10-30T23:00:00.000Z",
            "bidDate": "2020-10-14T14:30:00.888Z",
            "location": "CMU front gate",
            "responsiblePerson": "SMO",
            "contact": "chartchai_d@cmu.ac.th",
            "seats": 2,
            "creator": "KehanZhou"
        }
    ],
    "coins": 82,
    "_id": "5f8581d45cd7a9d7fd5f4dba",
    "name": "XingyuanKang",
    "email": "xingyuan_kang@cmu.ac.th",
    "salt": "751027003872",
    "hashed_password": "7b7ff8ddc36da3bbfbe5680e265c83163a44120a",
    "createdAt": "2020-10-13T10:30:44.511Z",
    "updatedAt": "2020-10-16T04:02:34.247Z",
    "__v": 2
}

let result

test("amount field is empty 1", () => {
    const input = {
        acticityName: "Doi Suthep",
        student: "XingyuanKang",
        amount: ''
    }

    if (input.amount === '') {
        result = 'This field is required'
    }

    else if (typeof input.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (input.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (input.amount > XingyuanKang.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Update Coins Amount Successfully!'
    }

    // expect(result).toBe('This field is required')
    expect(result).toMatchSnapshot()
})

test("amount is equal to 0", () => {
    const input = {
        acticityName: "Doi Suthep",
        student: "XingyuanKang",
        amount: '100bath'
    }

    if (input.amount === '') {
        result = 'This field is required'
    }

    else if (typeof input.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (input.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (input.amount > XingyuanKang.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Update Coins Amount Successfully!'
    }

    // expect(result).toBe('Amount must be a digit')
    expect(result).toMatchSnapshot()
})

test("amount is not a number", () => {
    const input = {
        acticityName: "Doi Suthep",
        student: "XingyuanKang",
        amount: 0
    }

    if (input.amount === '') {
        result = 'This field is required'
    }

    else if (typeof input.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (input.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (input.amount > XingyuanKang.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Update Coins Amount Successfully!'
    }

    // expect(result).toBe('Amount must be greater than 0')
    expect(result).toMatchSnapshot()
})

test("coins are not enough", () => {
    const input = {
        acticityName: "Doi Suthep",
        student: "XingyuanKang",
        amount: 1000
    }

    if (input.amount === '') {
        result = 'This field is required'
    }

    else if (typeof input.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (input.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (input.amount > XingyuanKang.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Update Coins Amount Successfully!'
    }

    // expect(result).toBe('Your coins are not enough!')
    expect(result).toMatchSnapshot()
})

test("successfully", () => {
    const input = {
        acticityName: "Doi Suthep",
        student: "XingyuanKang",
        amount: 30
    }

    if (input.amount === '') {
        result = 'This field is required'
    }

    else if (typeof input.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (input.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (input.amount > XingyuanKang.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Update Coins Amount Successfully!'
    }

    // expect(result).toBe('Update Coins Amount Successfully!')
    expect(result).toMatchSnapshot()
})