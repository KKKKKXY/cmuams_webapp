import Enzyme from 'enzyme';
import { cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup)
const AllUser = [
    {
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
        "salt": "525994514025",
        "hashed_password": "ba74adc0914f5a626c94e067ff647805aaabdf0c",
        "createdAt": "2020-10-13T10:29:19.678Z",
        "updatedAt": "2020-10-14T16:31:15.552Z",
        "__v": 3
    },
    {
        "role": "admin",
        "enrolled": [],
        "coins": 100,
        "_id": "5f8581a1992f699a55fc5fe7",
        "name": "KehanZhou",
        "email": "kehanzhou97@gmail.com",
        "salt": "49936490550",
        "hashed_password": "179d18b1d25a07ce71daea2505c9c2cf8b139693",
        "createdAt": "2020-10-13T10:29:53.294Z",
        "updatedAt": "2020-10-13T10:29:53.294Z",
        "__v": 0
    },
    {
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
        "coins": 90,
        "_id": "5f8581d45cd7a9d7fd5f4dba",
        "name": "XingyuanKang",
        "email": "xingyuan_kang@cmu.ac.th",
        "salt": "751027003872",
        "hashed_password": "7b7ff8ddc36da3bbfbe5680e265c83163a44120a",
        "createdAt": "2020-10-13T10:30:44.511Z",
        "updatedAt": "2020-10-14T16:31:15.840Z",
        "__v": 2
    },
    {
        "role": "student",
        "enrolled": [],
        "coins": 100,
        "_id": "5f85821e5cd7a9d7fd5f4dbb",
        "name": "YanwenHe",
        "email": "yanwen_he@cmu.ac.th",
        "salt": "731058097473",
        "hashed_password": "487bfbf4ef8703b2f1d5d2a0823a18679581904f",
        "createdAt": "2020-10-13T10:31:58.367Z",
        "updatedAt": "2020-10-13T10:31:58.367Z",
        "__v": 0
    }]

let result

test("successfully", () => {
    const input = {
        sendEmail :"xingyuan_kang@cmu.ac.th",
        recipientEmail :"yanwen_he@cmu.ac.th",
        amount :10
    }
    let recipient = AllUser.filter(user => user.email === input.recipientEmail)
    let sender = AllUser.filter(user => user.email === input.sendEmail)

    if (recipient.length === 0) {
        result = 'The recipient email can not be found.'
    }

    else if (input.amount > sender[0].coins) {
        result = 'Your coins are not enough!'
    }

    else if (input.amount === 0) {
        result = 'Invalid amount.'
    }

    else {
        result = 'Transfer successfully.'
    }

    expect(result).toMatchSnapshot()
})

test("the recipient email can not be found", () => {
    const input = {
        sendEmail :"xingyuan_kang@cmu.ac.th",
        recipientEmail :"yanwen@cmu.ac.th",
        amount :10
    }
    let recipient = AllUser.filter(user => user.email === input.recipientEmail)
    let sender = AllUser.filter(user => user.email === input.sendEmail)

    if (recipient.length === 0) {
        result = 'The recipient email can not be found.'
    }

    else if (input.amount > sender[0].coins) {
        result = 'Your coins are not enough!'
    }

    else if (input.amount === 0) {
        result = 'Invalid amount.'
    }

    else {
        result = 'Transfer successfully.'
    }

    expect(result).toMatchSnapshot()
})

test("coins are not enough", () => {
    const input = {
        sendEmail :"xingyuan_kang@cmu.ac.th",
        recipientEmail :"yanwen@cmu.ac.th",
        amount :10000
    }
    let recipient = AllUser.filter(user => user.email === input.recipientEmail)
    let sender = AllUser.filter(user => user.email === input.sendEmail)

    if (recipient.length === 0) {
        result = 'The recipient email can not be found.'
    }

    else if (input.amount > sender[0].coins) {
        result = 'Your coins are not enough!'
    }

    else if (input.amount === 0) {
        result = 'Invalid amount.'
    }

    else {
        result = 'Transfer successfully.'
    }

    expect(result).toMatchSnapshot()
})

test("amount is equal to 0", () => {
    const input = {
        sendEmail :"xingyuan_kang@cmu.ac.th",
        recipientEmail :"yanwen@cmu.ac.th",
        amount :0
    }
    let recipient = AllUser.filter(user => user.email === input.recipientEmail)
    let sender = AllUser.filter(user => user.email === input.sendEmail)

    if (recipient.length === 0) {
        result = 'The recipient email can not be found.'
    }

    else if (input.amount > sender[0].coins) {
        result = 'Your coins are not enough!'
    }

    else if (input.amount === 0) {
        result = 'Invalid amount.'
    }

    else {
        result = 'Transfer successfully.'
    }

    expect(result).toMatchSnapshot()
})