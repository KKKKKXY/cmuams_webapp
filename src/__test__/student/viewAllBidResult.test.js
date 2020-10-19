import Enzyme from 'enzyme';
import { render, cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'
import Moment from 'moment';

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

const AllActicity = [
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

function Result(_id, rank, to, amount, last, end) {
    this._id = _id;
    this.rank = rank;
    this.to = to;
    this.amount = amount;
    this.last = last;
    this.end = end;
}

let result

test("user does not exist", () => {
    let students = []
    let _id = ''
    let rank = ''
    let to = ''
    let amount = ''
    let last = ''
    let end = ''
    let userId = '5f8888888dgs9a9v9dn6s6s7'
    let user = AllUser.filter(user => user._id === userId)
    let bidResult = []

    if (user == '') {
        result = 'User not found'
    }
    else {
        let username = user.name
        for (var i = 0; i < AllActicity.length; i++) {
            // toast.info('You don\'t have activity to bid');
            students = AllActicity[i].students

            if (students.length > 0) {
                students.sort((a, b) => {
                    //sort by amount
                    if (a.amount < b.amount)
                        return 1;
                    else if (a.amount > b.amount)
                        return -1;

                    //sort by date
                    if (a.transferDate < b.transferDate)
                        return -1;
                    else if (a.transferDate > b.transferDate)
                        return 1;

                    return 0;
                })

                const bidTransfer = students.filter(student => student.student == username)
                to = AllActicity[i].activityName

                if (bidTransfer == '') {
                    _id = 0
                }
                else {
                    const bidDate = AllActicity[i].bidDate
                    const date = (new Date(bidDate)).setMinutes((new Date(bidDate)).getMinutes() + 60)

                    _id = bidTransfer[0]._id
                    rank = students.findIndex(currentsortList => { return currentsortList.student == username; }) + 1
                    amount = parseInt(bidTransfer[0].amount)

                    if (AllActicity[i].seats <= students.length) {
                        last = students[AllActicity[i].seats - 1].amount
                    }
                    else {
                        last = students[students.length - 1].amount
                    }
                    end = Moment(date).format('MMMM Do YYYY, HH:mm:ss')
                    bidResult.push(new Result(_id, rank, to, amount, last, end))
                }
            }
            else {
                console.log('length <= 0')
            }
        }
        result = bidResult
    }

    expect(result).toMatchSnapshot()
})

test("user is exist", () => {
    let students = []
    let rank = ''
    let to = ''
    let amount = ''
    let last = ''
    let end = ''
    let userId = '5f85817f5cd7a9d7fd5f4db9'
    let user = AllUser.filter(user => user._id === userId)
    let bidResult = []

    if (user == '') {
        result = 'User not found'
    }
    else {
        let username = user[0].name

        for (var i = 0; i < AllActicity.length; i++) {
            students = AllActicity[i].students

            if (students.length > 0) {
                students.sort((a, b) => {
                    //sort by amount
                    if (a.amount < b.amount)
                        return 1;
                    else if (a.amount > b.amount)
                        return -1;

                    //sort by date
                    if (a.transferDate < b.transferDate)
                        return -1;
                    else if (a.transferDate > b.transferDate)
                        return 1;

                    return 0;
                })

                const bidTransfer = students.filter(student => student.student === username)
                to = AllActicity[i].activityName

                if (bidTransfer == '') {
                    _id = 0
                }
                else {
                    const bidDate = AllActicity[i].bidDate
                    const date = (new Date(bidDate)).setMinutes((new Date(bidDate)).getMinutes() + 60)

                    rank = students.findIndex(currentsortList => { return currentsortList.student == username; }) + 1
                    amount = parseInt(bidTransfer[0].amount)

                    if (AllActicity[i].seats <= students.length) {
                        last = students[AllActicity[i].seats - 1].amount
                    }
                    else {
                        last = students[students.length - 1].amount
                    }
                    end = Moment(date).format('MMMM Do YYYY, HH:mm:ss')

                    bidResult.push(new Result(rank, to, amount, last, end))
                }
            }
            else {
                console.log('length <= 0')
            }
        }
        result = bidResult
    }

    expect(result).toMatchSnapshot()
})
