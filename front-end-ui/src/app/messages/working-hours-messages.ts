import { DayMessageMessage } from './day-message';

export class WorkingHoursMessages {
  name: string;
  days: DayMessageMessage[];
  fromH: string;
  toH: string;
  open: string;
  close: string;
  requedError: string;
  invalidFormatError: string;
  invalidRangeError: string;
  error: string;
}
