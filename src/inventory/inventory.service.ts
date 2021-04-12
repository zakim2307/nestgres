import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../model/inventory.entity';
import { Repository } from 'typeorm';
import { InventoryDTO } from './invetory.dto';
import { User } from '../user.decorator';

@Injectable()
export class InventoryService {
    constructor(@InjectRepository(Inventory) private readonly repo: Repository<Inventory>) {}

    public async getAll() {
        return await this.repo.find()
            .then(inventories => inventories.map(e => InventoryDTO.fromEntity(e)));
    }

    public async create(dto: InventoryDTO, user: User): Promise<InventoryDTO> {
        return this.repo.save(dto.toEntity(user))
            .then(e => InventoryDTO.fromEntity(e));
    }

    public async getOne(id): Promise<InventoryDTO[]> {
        return await this.repo.findByIds(id)
            .then(inventories => inventories.map(e => InventoryDTO.fromEntity(e)));
    }
}
