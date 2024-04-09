export namespace IMailService {
  export interface ResendProps {
    apiKey: string
  }
  export interface IPropsSend {
    from: string
    to: string
    subject: string
    template: 'NewDeposit' | 'NewInvestment'
    body?: any
  }

  export interface Implements {
    send(props: IPropsSend): Promise<boolean>
  }
}
