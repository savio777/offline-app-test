import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schemaTest = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'Pessoa',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'years', type: 'number'},
        {name: 'adult', type: 'boolean', isOptional: false},
      ],
    }),
  ],
});
