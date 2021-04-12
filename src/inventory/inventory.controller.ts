import { Body, Controller, Get, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDTO } from './invetory.dto';
import { User } from '../user.decorator';
import * as dotenv from 'dotenv';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('inventory')
@UsePipes(new ValidationPipe())
export class InventoryController {
    constructor(private serv: InventoryService) {}

    @Get()
    @ApiOkResponse({ type: InventoryDTO, isArray: true})
    public async getAll(): Promise<InventoryDTO[]>{
        return await this.serv.getAll();
    }

    @Post('/post')
    @ApiCreatedResponse({ type: InventoryDTO})
    public async post(@User() user:User, @Body() dto: InventoryDTO): Promise<InventoryDTO> {
        const inventory = InventoryDTO.from(dto);
        return await this.serv.create(inventory, user);
    }

    @Get('get/:id')
    @ApiOkResponse({ type: InventoryDTO})
    public async getOne(@Res() res,@Param('id', new ParseUUIDPipe()) id: string){
        const inventory = await this.serv.getOne(id);
        if(!inventory) {
            throw new NotFoundException('Cannot find Item')
        }
        return res.status(HttpStatus.OK).json(inventory);
    }

}
