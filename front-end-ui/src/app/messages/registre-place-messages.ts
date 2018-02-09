import { AdditionsAndPricesMessages } from './additions-and-prices-messages';
import { BootonsMessages } from './bootons-messages';
import { ContactDataMessages } from './contact-data-messages';
import { FiltersMessages } from './filters-messages';
import { FinalMessages } from './final-messages';
import { LocationInfoMessages } from './location-info-messages';
import { PhotosMessages } from './photos-messages';
import { WorkingHoursMessages } from './working-hours-messages';

export class RegistrePlaceMessages {
  stape: string;
  bootonMessages: BootonsMessages;
  locationInfoMessages: LocationInfoMessages;
  workingHoursMessages: WorkingHoursMessages;
  contactDataMessages: ContactDataMessages;
  photosMessages: PhotosMessages;
  filtersMessages: FiltersMessages;
  additionsAndPricesMessages: AdditionsAndPricesMessages;
  finalMessages: FinalMessages;
}
