import { NativeEventEmitter, NativeModules } from 'react-native';
import { RNTwilioPhone } from './RNTwilioPhone';

export enum PermissionName {
  Record = 'RECORD', // iOS only
  RecordAudio = 'RECORD_AUDIO', // Android only
  CallPhone = 'CALL_PHONE',
  OVERLAY_WINDOW = 'SYSTEM_OVERLAY_WINDOW', // Android only
}

export enum PermissionStatus {
  Granted = 'GRANTED',
  Denied = 'DENIED',
  Undetermined = 'UNDETERMINED', // iOS only
  Unknown = 'UNKNOWN',
}

export type MessagePayload = Record<string, any>;
export type ConnectParams = Record<string, string>;
export type Permissions = Record<PermissionName, PermissionStatus>;
export type CallStats = {
  localAudioTrackStats: Array<{
    audioLevel: number;
    jitter: number;
    roundTripTime: number;
  }>;
  remoteAudioTrackStats: Array<{
    audioLevel: number;
    jitter: number;
    mos: number;
  }>;
};

type TwilioPhoneType = {
  register(accessToken: string, deviceToken: string): void;
  handleMessage(payload: MessagePayload): void;
  acceptCallInvite(callSid: string): void;
  rejectCallInvite(callSid: string): void;
  disconnectCall(callSid: string): void;
  endCall(callSid: string): void;
  getCallStats(callSid: string): Promise<CallStats>;
  toggleMuteCall(callSid: string, mute: boolean): void;
  toggleHoldCall(callSid: string, hold: boolean): void;
  toggleSpeaker(speakerOn: boolean): void;
  sendDigits(callSid: string, digits: string): void;
  startCall(accessToken: string, params: ConnectParams): void;
  unregister(accessToken: string, deviceToken: string): void;
  activateAudio(): void; // iOS only
  deactivateAudio(): void; // iOS only
  checkPermissions(callback: (permissions: Permissions) => void): void;
  showCallNotification(payload: Record<string, any>,): void;
  requestWindowsDrawPermission():void;
};

const TwilioPhone = NativeModules.TwilioPhone as TwilioPhoneType;

const twilioPhoneEmitter = new NativeEventEmitter(NativeModules.TwilioPhone);

export { RNTwilioPhone, TwilioPhone, twilioPhoneEmitter };

export enum EventType {
  CallInvite = 'CallInvite',
  CancelledCallInvite = 'CancelledCallInvite',
  CallRinging = 'CallRinging',
  CallConnectFailure = 'CallConnectFailure',
  CallConnected = 'CallConnected',
  CallReconnecting = 'CallReconnecting',
  CallReconnected = 'CallReconnected',
  CallDisconnected = 'CallDisconnected',
  CallDisconnectedError = 'CallDisconnectedError',
  RegistrationSuccess = 'RegistrationSuccess',
  RegistrationFailure = 'RegistrationFailure',
  UnregistrationSuccess = 'UnregistrationSuccess',
  UnregistrationFailure = 'UnregistrationFailure',
}
