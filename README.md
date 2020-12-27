# usArmyQuizAppBackend

Backend server for the application

## Getting Started

1. Clone the repo.
`git clone https://github.com/cheng306/usArmyQuizAppBackend.git`

2. Open terminal, go into directory.
`cd usArmyQuizAppBackend`

3. Run `yarn` to install modules.

4. Run `ssh -N -L 1433:churchdb.cg0kmmjkhs8h.us-west-2.rds.amazonaws.com:1433 ec2-user@ec2-54-190-53-29.us-west-2.compute.amazonaws.com -i ~/.ssh/churchAWS.pem` in the terminal, change path if needed.

5. Run  `yarn start`, then the backend server should be running at `http://localhost:3000`.

## Submit workflow

1. Check out from dev
2. Create new branch when working on new feature
3. Merge dev to main when ready to deploy

## AWS

Changes in main branch is automatcally reflected on AWS beanstalk: Backend-env.eba-vppruamm.us-west-2.elasticbeanstalk.com 


