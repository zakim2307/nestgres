import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/user.entity';
import { Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>) {}

    private readonly users = [
        {
            userId: 1,
            username: 'zaki',
            password: "zaki';';"
        },
        {
            userId: 2,
            username: 'Malik',
            password: "malik';';"    
        }
    ];
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findUser() {
        return await this.repo.find();
    }

    async addUser() {
        
    }
}