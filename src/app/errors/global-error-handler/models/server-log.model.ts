export interface ServerLogModel {
  message: string;
  url: string;
  userName: string | undefined;
  stack: string;
}
