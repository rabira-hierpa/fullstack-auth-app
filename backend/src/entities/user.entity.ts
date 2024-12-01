import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';
import { AbstractEntity } from 'src/shared/dtos/abstract.dto';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends AbstractEntity {
  @ApiProperty()
  @Column()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  @Expose()
  get fullName(): string {
    return (
      [this.firstName, this.lastName].filter((name) => name).join(' ') ||
      this.firstName
    );
  }
}
