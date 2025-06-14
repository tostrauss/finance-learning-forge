// flf-backend/src/models/Quiz.ts
import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany, 
  BelongsTo, 
  ForeignKey,
  Default
} from 'sequelize-typescript';
import { Module } from './Course';
import { User } from './User';

@Table({
  tableName: 'quizzes',
  timestamps: true,
})
export class Quiz extends Model {
  @Column({
    type: DataType.STRING(50),
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  moduleId?: string;

  @Default(70)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  passingScore!: number;

  @HasMany(() => QuizQuestion)
  questions!: QuizQuestion[];

  @BelongsTo(() => Module)
  module?: Module;
}

@Table({
  tableName: 'quiz_questions',
  timestamps: true,
})
export class QuizQuestion extends Model {
  @Column({
    type: DataType.STRING(100),
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  quizId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  question!: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
  })
  options!: string[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  correctAnswer!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  explanation?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionOrder!: number;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;
}

@Table({
  tableName: 'quiz_results',
  timestamps: true,
})
export class QuizResult extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  quizId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  score!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalQuestions!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  answers!: Array<{
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }>;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  timeSpentSeconds!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  completedAt!: Date;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @BelongsTo(() => User)
  user!: User;
}