export type TriggerType = "webhook" | "scheduled";
export type ChannelType = "email" | "sms" | "slack";

export interface Alert {
  id: string;
  name: string;
  trigger: TriggerType;
  channels: ChannelType[];
  message: string;
  recipients: {
    email?: string[];
    sms?: string[];
    slack?: string[];
  };
  schedule?:string;
  createdAt: Date;
}
