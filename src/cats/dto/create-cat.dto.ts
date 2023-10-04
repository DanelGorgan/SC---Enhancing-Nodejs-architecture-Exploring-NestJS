import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCatDto {
  //   @ApiProperty({
  //     description: 'Name of the cat',
  //     example: 'Sisi',
  //   })
  /**
   * 'Name of the cat'
   * @example 'Sisi'
   */
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  @IsString()
  name: string;
  //   @ApiProperty()
  @IsString()
  color: string;
}

// transforming the request -> validate it
