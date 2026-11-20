export interface AirDispatchReceiptRow {
  label: string;
  field: string;
  fallback?: string;
}

export interface AirDispatchConfig {
  form: string | HTMLElement;
  button: string | HTMLElement;
  send: (data: Record<string, string>, form: HTMLFormElement) => Promise<unknown>;
  apronAfter?: string | HTMLElement | null;
  align?: 'button' | 'full';
  validate?: boolean;
  accent?: string | null;
  fields?: Record<string, string>;
  labels?: {
    idle?: string | null;
    spool?: string;
    flying?: string;
    done?: string;
    fail?: string;
  };
  caption?: {
    idle?: string;
    spool?: string;
    flying?: string;
    done?: string;
    fail?: string;
  };
  timing?: {
    spool?: number;
    flight?: number;
  };
  receipt?: {
    company?: string;
    destination?: string;
    number?: number;
    side?: 'right' | 'left';
    top?: number | null;
    offset?: number | null;
    peek?: number;
    autoDismiss?: number;
    thanks?: string;
    stamp?: string;
    stampFail?: string;
    rows?: AirDispatchReceiptRow[];
  };
}

export interface AirDispatchInstance {
  reset: () => void;
  destroy: () => void;
}

export interface AirDispatch {
  init: (config: AirDispatchConfig) => AirDispatchInstance;
  version: string;
}

declare const AirDispatch: AirDispatch;
export default AirDispatch;
