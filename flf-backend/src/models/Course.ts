import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model {
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  courseCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  credits!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  academicLevel!: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  prerequisites!: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  concentrations!: string[];

  @HasMany(() => Module)
  modules!: Module[];
}

@Table({
  tableName: 'modules',
  timestamps: true,
})
export class Module extends Model {
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  courseId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.TEXT)
  content?: string;

  @Column(DataType.INTEGER)
  duration?: number;

  @Column(DataType.INTEGER)
  moduleOrder!: number;

  @BelongsTo(() => Course)
  course!: Course;
}