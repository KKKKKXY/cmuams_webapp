import Enzyme from 'enzyme';
import { render, cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup)

const AllActivity = [
    {
        "students": [
            {
                "_id": "5f870be538e4c6a575b90f1e",
                "student": "ChenghaoLi",
                "amount": 50,
                "transferDate": "2020-10-14T14:32:00.000Z"
            },
            {
                "_id": "5f870ba838e4c6a575b90f1d",
                "student": "XingyuanKang",
                "amount": 30,
                "transferDate": "2020-10-14T14:32:49.000Z"
            }
        ],
        "_id": "5f845cb56786487dc14d968a",
        "activityName": "Doi Suthep",
        "description": "The activity improve students teamwork ability.",
        "activityDate": "2020-10-31 06:00:00",
        "bidDate": "2020-10-14 21:30:00",
        "location": "CMU front gate",
        "responsiblePerson": "SMO",
        "contact": "chartchai_d@cmu.ac.th",
        "seats": 2,
        "creator": "KehanZhou",
        "createdAt": "2020-10-12 20:40:05",
        "updatedAt": "2020-10-14 23:31:28",
        "__v": 56
    },
    {
        "students": [],
        "_id": "5f845d0e6786487dc14d968b",
        "activityName": "Talking Room",
        "description": "The activity improve students communication ability. ",
        "activityDate": "2020-10-30 08:00:00",
        "bidDate": "2020-10-15 08:30:00",
        "location": "CAMT 113",
        "responsiblePerson": "Chartchai Doungsa-ard",
        "contact": "chartchai@cmu.ac.th",
        "seats": 3,
        "creator": "KehanZhou",
        "createdAt": "2020-10-12 20:41:34",
        "updatedAt": "2020-10-14 03:47:51",
        "__v": 37
    }
]

let result
let activity

test("the activity is exist", () => {
    activity = AllActivity.filter(act => act._id === '5f845cb56786487dc14d968a')

    if (activity == '') {
        result = 'Activity not found'
    }
    else {
        result = activity[0].students
    }

    expect(result).toMatchSnapshot()
})

test("the activity does not exist", () => {
    activity = AllActivity.filter(act => act._id === '5d12220e8f2c6b798e1b4747')

    if (activity == '') {
        result = 'Activity not found'
    }
    else {
        result = activity[0].students
    }

    // expect(result).toBe('Activity not found')
    expect(result).toMatchSnapshot()
})