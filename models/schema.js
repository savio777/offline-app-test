import {appSchema, tableSchema} from '@nozbe/watermelondb';

const schemaTest = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'Pessoa',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'years', type: 'number'},
        {name: 'adult', type: 'boolean', isOptional: false},
        {name: 'created_at', type: 'number'},
      ],
    }),
  ],
});

export default schemaTest;
