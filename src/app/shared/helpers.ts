import { SignBoardBatch } from '../store/sign-board-batch/reducers/sign-board-batch';

export function makeId(): string {
  let text = '';
  const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 11; i++) {
    text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
  }
  return text;
}

export function prepareSignBoardData(indexNumber, signBoardBatch: SignBoardBatch | any): any {
  let signBoard = {
    id: makeId(),
    bar_code: (signBoardBatch.batch_reference_number + '_' + indexNumber).replace("/", "_"),
    batch_reference_number: signBoardBatch.batch_reference_number,
    campaign_reference_number: signBoardBatch.campaign_reference_number,
    payment_reference_number: '',
    board_height: signBoardBatch.board_height,
    board_width: signBoardBatch.board_width,
    sign_board_image: '',
    sign_board_status: 'PENDING',
    outlet: signBoardBatch.outlet,
    street_name: '',
    longitude: '',
    latitude: '',
    government_status: '',
    date_to_be_planted: signBoardBatch.start_date,
    actual_planting_date: '',
    submission_date: '',
    survey_date: '',
    verification_date: ''
  };


  return signBoard;
}



var data = {
  "trackedEntityType": "nEenWmSyUEp",
  "orgUnit": "DiszpKrYNg8",
  "attributes": [
    {
      "attribute": "w75KJ2mc4zz",
      "value": "Joe"
    },
    {
      "attribute": "zDhUuAYrxNC",
      "value": "Rufus"
    },
    {
      "attribute": "cejWyOfXge6",
      "value": "Male"
    }
  ],
  "enrollments": [
    {
      "orgUnit": "DiszpKrYNg8",
      "program": "ur1Edk5Oe2n",
      "enrollmentDate": "2017-09-15",
      "incidentDate": "2017-09-15",
      "events": [
        {
          "program": "ur1Edk5Oe2n",
          "orgUnit": "DiszpKrYNg8",
          "eventDate": "2017-10-17",
          "status": "COMPLETED",
          "storedBy": "admin",
          "programStage": "EPEcjy3FWmI",
          "coordinate": {
            "latitude": "59.8",
            "longitude": "10.9"
          },
          "dataValues": [
            {
              "dataElement": "qrur9Dvnyt5",
              "value": "22"
            },
            {
              "dataElement": "oZg33kd9taw",
              "value": "Male"
            }
          ]
        },
        {
          "program": "ur1Edk5Oe2n",
          "orgUnit": "DiszpKrYNg8",
          "eventDate": "2017-10-17",
          "status": "COMPLETED",
          "storedBy": "admin",
          "programStage": "EPEcjy3FWmI",
          "coordinate": {
            "latitude": "59.8",
            "longitude": "10.9"
          },
          "dataValues": [
            {
              "dataElement": "qrur9Dvnyt5",
              "value": "26"
            },
            {
              "dataElement": "oZg33kd9taw",
              "value": "Female"
            }
          ]
        }
      ]
    }
  ]
}


export function get5Years(sign?: string, lastItem?: { id: string, value: number, name: string }, firstItem?: { id: string, value: number, name: string }) {
  let currentYear = new Date().getFullYear();
  let years: { id: string, value: number, name: string }[] = [];
  if (sign == "-") {
    let dropCount = 0;
    while (dropCount < 5) {
      if ((currentYear - dropCount) >= 1970) {
        years = [...years, {
          id: (lastItem.value - dropCount) + "",
          value: (lastItem.value - dropCount),
          name: (lastItem.value - dropCount) + ""
        }];
      }
      dropCount++;

    }

  }

  if (sign == "+") {
    let upCount = 0;
    while (upCount < 5) {
      if ((firstItem.value + upCount) <= currentYear) {
        years = [...years, {
          id: (firstItem.value + upCount) + "",
          value: (firstItem.value + upCount),
          name: (firstItem.value + upCount) + ""
        }];
      }
      upCount++;
    }
  }

  if (sign == null && lastItem == null && firstItem == null) {
    const currentYear = new Date().getFullYear();
    let count = 0;
    while (count < 5) {
      if ((currentYear - count) >= 1970 && (currentYear - count) <= currentYear) {
        years = [...years, {
          id: (currentYear - count) + "",
          value: (currentYear - count),
          name: (currentYear - count) + ""
        }];
      }
      count++;

    }
  }

  return years.sort((a, b) => b.value - a.value);;
}


export function getMonths(){
  return [
    {
      id: "January",
      value:"01",
      name:"January"
    },
    {
      id: "February",
      value:"02",
      name:"February"
    },
    {
      id: "March",
      value:"03",
      name:"March"
    },
    {
      id: "April",
      value:"04",
      name:"April"
    },
    {
      id: "May",
      value:"05",
      name:"May"
    },
    {
      id: "June",
      value:"06",
      name:"June"
    },
    {
      id: "July",
      value:"07",
      name:"July"
    },
    {
      id: "August",
      value:"08",
      name:"August"
    },
    {
      id: "September",
      value:"09",
      name:"September"
    },{
      id: "October",
      value:"10",
      name:"October"
    },
    {
      id: "November",
      value:"11",
      name:"November"
    },
    {
      id: "December",
      value:"12",
      name:"December"
    }
  ]
}
