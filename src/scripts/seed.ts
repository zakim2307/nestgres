import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { User } from '../user.decorator';
import { InventoryController } from '../inventory/inventory.controller';
import { InventoryService } from '../inventory/inventory.service';
import { InventoryDTO } from 'src/inventory/invetory.dto';
import { Inventory } from 'src/model/inventory.entity';

async function run() {

  const seedUser: User = { id: 'seed-user' };

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const inventoryService = new InventoryService(connection.getRepository(Inventory));

  const work = _.range(1, 10)
    .map(n => InventoryDTO.from({
      name: `seed${seedId}-${n}`,
      description: 'created from seed'
    }))
    .map(dto => inventoryService.create(dto, seedUser)
      .then(r => (console.log('done ->', r.name), r)))

  return await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));