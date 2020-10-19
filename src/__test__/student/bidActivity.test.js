import Enzyme from 'enzyme';
import { render, cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup)
const ChenghaoLi = {
    "role": "student",
    "enrolled": [
        {
            "students": [],
            "_id": "5f8727d3c9440dc754ec4873",
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
    "coins": 110,
    "_id": "5f85817f5cd7a9d7fd5f4db9",
    "name": "ChenghaoLi",
    "email": "chenghao_li@cmu.ac.th",
    "createdAt": "2020-10-13T10:29:19.678Z",
    "updatedAt": "2020-10-14T16:31:15.552Z",
    "__v": 3
}


let result

test("acticity name field is empty", () => {
    const bidInfo = {
        acticityName: '',
        student: 'ChenghaoLi',
        amount: 50
    }

    if (bidInfo.acticityName === '') {
        result = 'This field is required'
    }

    else if (bidInfo.amount === '') {
        result = 'This field is required'
    }

    else if (typeof bidInfo.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (bidInfo.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (bidInfo.amount > ChenghaoLi.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Bid activity Doi Suthep successfully!'
    }

    expect(result).toMatchSnapshot()
})

test("amount field is empty", () => {
    const bidInfo = {
        acticityName: 'Doi Suthep',
        student: 'ChenghaoLi',
        amount: ''
    }

    if (bidInfo.acticityName === '') {
        result = 'This field is required'
    }

    else if (bidInfo.amount === '') {
        result = 'This field is required'
    }

    else if (typeof bidInfo.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (bidInfo.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (bidInfo.amount > ChenghaoLi.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Bid activity Doi Suthep successfully!'
    }

    expect(result).toMatchSnapshot()
})

test("amount is not a number", () => {
    const bidInfo = {
        acticityName: 'Doi Suthep',
        student: 'ChenghaoLi',
        amount: '100bath'
    }

    if (bidInfo.acticityName === '') {
        result = 'This field is required'
    }

    else if (bidInfo.amount === '') {
        result = 'This field is required'
    }

    else if (typeof bidInfo.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (bidInfo.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (bidInfo.amount > ChenghaoLi.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Bid activity Doi Suthep successfully!'
    }

    expect(result).toMatchSnapshot()
})

test("amount is equal to 0", () => {
    const bidInfo = {
        acticityName: 'Doi Suthep',
        student: 'ChenghaoLi',
        amount: 0
    }

    if (bidInfo.acticityName === '') {
        result = 'This field is required'
    }

    else if (bidInfo.amount === '') {
        result = 'This field is required'
    }

    else if (typeof bidInfo.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (bidInfo.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (bidInfo.amount > ChenghaoLi.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Bid activity Doi Suthep successfully!'
    }

    expect(result).toMatchSnapshot()
})

test("coins are not enough", () => {
    const bidInfo = {
        acticityName: 'Doi Suthep',
        student: 'ChenghaoLi',
        amount: 1000
    }

    if (bidInfo.acticityName === '') {
        result = 'This field is required'
    }

    else if (bidInfo.amount === '') {
        result = 'This field is required'
    }

    else if (typeof bidInfo.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (bidInfo.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (bidInfo.amount > ChenghaoLi.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Bid activity Doi Suthep successfully!'
    }

    expect(result).toMatchSnapshot()
})

test("successfully", () => {
    const bidInfo = {
        acticityName: 'Doi Suthep',
        student: 'ChenghaoLi',
        amount: 50
    }

    if (bidInfo.acticityName === '') {
        result = 'This field is required'
    }

    else if (bidInfo.amount === '') {
        result = 'This field is required'
    }

    else if (typeof bidInfo.amount !== 'number') {
        result = 'Amount must be a digit'
    }

    else if (bidInfo.amount === 0) {
        result = 'Amount must be greater than 0'
    }

    else if (bidInfo.amount > ChenghaoLi.coins) {
        result = 'Your coins are not enough!'
    }

    else {
        result = 'Bid activity Doi Suthep successfully!'
    }

    expect(result).toMatchSnapshot()
})