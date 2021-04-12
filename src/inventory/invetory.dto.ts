import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length, } from 'class-validator';
import { Inventory } from '../model/inventory.entity';
import { User } from '../user.decorator';

export class InventoryDTO implements Readonly<InventoryDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;


  @ApiProperty({ required: true })
  @IsString()
  @Length(3, 50, {message: 'Name Must be 3 to 40 characters long'})
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  public static from(dto: Partial<InventoryDTO>) {
    const it = new InventoryDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Inventory) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description
    });
  }

  public toEntity(user: User = null) {
    const it = new Inventory();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createDateTime = new Date();
    it.createdBy = user ? user.id : null;
    it.lastChangedBy = user ? user.id : null;
    return it;
  }
}