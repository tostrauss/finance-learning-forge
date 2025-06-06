import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Course } from './Course';

@Table({
  tableName: 'user_progress',
  timestamps: true,
})
export class UserProgress extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(50),
  })
  courseId?: string;

  @Column({
    type: DataType.STRING(50),
  })
  moduleId?: string;

  @Column({
    type: DataType.DATE,
  })
  completedAt?: Date;

  @Column({
    type: DataType.DECIMAL(5, 2),
  })
  score?: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Course)
  course!: Course;
}