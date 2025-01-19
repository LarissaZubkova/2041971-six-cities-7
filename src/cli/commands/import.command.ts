import { getErrorMessage } from '../../shared/helpers/common.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { OfferService } from '../../shared/modules/offer/offer-service.interface.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { DefaultOfferService } from '../../shared/modules/offer/offer.service.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel, UserService } from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/offer.type.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constants.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      previewImage: offer.previewImage,
      photos: offer.photos,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      housingType: offer.housingType,
      rooms: offer.rooms,
      guests: offer.guests,
      rentalCost: offer.rentalCost,
      amenities: offer.amenities,
      author: user.id,
      commentsCount: offer.commentsCount,
      coordinates: offer.coordinates,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
