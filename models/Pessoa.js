import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Pessoa extends Model {
  static table = 'Pessoa';

  @field('name') name;
  @field('years') years;
  @field('adult') adult;
  @readonly @date('created_at') createdAt;
}
