import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer, RestApplication } from './rest/index.js';
import { Component } from './shared/types/component.enum.js';
import { createUserContainer } from './shared/modules/user/user.container.js';

async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer(), createUserContainer());


  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
