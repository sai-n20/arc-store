import { TYPES } from './types';
import { Container } from 'inversify';

// Interface imports begin
import IRepository from '../core/repository/definition';
// Interface imports end

// Entity imports begin
import MongoRepo from '../core/repository/mongo';
// Entity imports end

const container = new Container();

container.bind<IRepository>(TYPES.IRepository).to(MongoRepo).inSingletonScope();

export default container;