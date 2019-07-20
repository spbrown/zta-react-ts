export default interface RiskAssessment {
    created: Date,
    id: number,
    key: string,
    location: string,
    ref: string,
    submitted: Date,
    task: string,
    question1?: boolean,
    question2?: boolean,
    question3?: boolean,
    question4?: boolean,
    question5?: boolean,
  }