import Enzyme from 'enzyme';
import { render, cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup)
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

function Options(id, activityName, activityDate, bidDate) {
  this.id = id;
  this.activityName = activityName;
  this.activityDate = activityDate;
  this.bidDate = bidDate;
}

test("there are options", () => {
  let nowDate = '2020-10-15 09:00:00'
  let filterAct = AllActicity.filter(act =>
    (new Date(act.bidDate) <= new Date(nowDate)) && (new Date(new Date(new Date(act.bidDate)).setHours(new Date(new Date(act.bidDate)).getHours() + 1))) >= new Date(nowDate))

  let options = []
  for (var i = 0; i < filterAct.length; i++) {
    options.push(new Options((i + 1).toString(), filterAct[i].activityName, filterAct[i].activityDate, filterAct[i].bidDate))
  }

  expect(options).toMatchSnapshot()
})

test("there are no options", () => {
  let nowDate = '2020-10-16 10:32:00'
  let filterAct = AllActicity.filter(act =>
    (new Date(act.bidDate) <= new Date(nowDate)) && (new Date(new Date(new Date(act.bidDate)).setHours(new Date(new Date(act.bidDate)).getHours() + 1))) >= new Date(nowDate))

  let options = []
  for (var i = 0; i < filterAct.length; i++) {
    options.push(new Options((i + 1).toString(), filterAct[i].activityName, filterAct[i].activityDate, filterAct[i].bidDate))
  }

  expect(options).toMatchSnapshot()
})
