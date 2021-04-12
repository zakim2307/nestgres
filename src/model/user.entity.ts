import { Entity, Column, PrimaryGeneratedColumn,  UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300 })
    name: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;
  
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
  
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
  
    @Column({ type: 'varchar', length: 300 })
    lastChangedBy: string;

}