import { IsString, MaxLength, validateSync, IsArray, IsNumber, ValidationError, IsObject, IsCurrency } from 'class-validator';
import { get } from 'lodash';

import { combineValidationError } from '../../core/entity';

export interface IProduct {
  code: string;
  name: string;
  desc: string;
  specifications: object;
  tags: string[];
  price: string;
  quantity: number;
}

export class Product implements IProduct {

  @IsString()
  @MaxLength(60)
  public code: string;

  @IsString()
  @MaxLength(200)
  public name: string;

  @IsString()
  public desc: string;

  @IsObject()
  public specifications: object;

  @IsArray()
  public tags: string[];

  @IsCurrency()
  public price: string;

  @IsNumber()
  public quantity: number;

  public validate(): ValidationError[] { return validateSync(this); }
  public validateErrMsg(): string { return combineValidationError(this); }

  constructor(obj: object) {
    this.code = get(obj, 'code');
    this.name = get(obj, 'name');
    this.desc = get(obj, 'desc');
    this.specifications = get(obj, 'specifications');
    this.tags = get(obj, 'tags');
    this.price = get(obj, 'price');
    this.quantity = get(obj, 'quantity');
  }

}