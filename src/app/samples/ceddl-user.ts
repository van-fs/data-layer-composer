import { ComposerProject } from '../models/project';

export const userProject: ComposerProject = {
  variable: 'digitalData',
  datalayer: {
    user: {
      segment: {},
      profile: [{
        profileInfo: {
          profileID: 'pr-12333211',
          userName: 'JohnyAppleseed',
        },
        address: {
          line1: '123 Easy St.',
          line2: '',
          city: 'Athens',
          stateProvince: 'GA',
          postalCode: '30606',
          country: 'USA',
        },
        social: {},
        attributes: {},
      }],
    }
  },
  rules: [
    {
      "id": "fs-uservars-ceddl-user-all",
      "description": "send all CEDDL user properties to FS.setUserVars",
      "source": "digitalData.user.profile[0]",
      "operators": [
        {
          "name": "flatten"
        }
      ],
      "destination": "FS.setUserVars"
    },
    {
      "id": "fs-identify-ceddl-user-all",
      "description": "send all CEDDL user properties to FS.identify using the profileID as the FullStory uid",
      "source": "digitalData.user.profile[0]",
      "operators": [
        {
          "name": "flatten"
        },
        {
          "name": "insert",
          "select": "profileID"
        }
      ],
      "destination": "FS.identify"
    },
    {
      "id": "fs-identify-ceddl-user-allowed",
      "description": "send only known CEDDL user properties to FS.identify using the profileID as the FullStory uid",
      "source": "digitalData.user.profile[0]",
      "operators": [
        {
          "name": "flatten"
        },
        {
          "name": "query",
          "select": "$[(profileID,userName,line1,line2,city,stateProvince,postalCode,country)]"
        },
        {
          "name": "insert",
          "select": "profileID"
        }
      ],
      "destination": "FS.identify"
    }
  ]
};
